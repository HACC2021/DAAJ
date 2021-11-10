import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import {getDateTime} from '../functions.js';


export const Birds = new Mongo.Collection( 'birds' )

// Meteor methods:
Meteor.methods({
  addBird( data ){
    let dateTime = getDateTime(data.dateObjectObserved);
    Birds.insert({
        DateObjectObserved: data.dateObjectObserved,
        Animal: "Bird",
        // Common to all animals
        DateObserved: dateTime[0], // Date object w date and time
        TimeObserved: dateTime[1],
        TicketNumber: "", // Not implemented by us
        HotlineOpInitials: "", // Not implemented by us
        TicketType: "", // Not implemented by us
        ObserverName: data.observerName, // String
        ObserverPhone: data.observerPhone, // Number
        ObserverInitials: data.observerInitials,
        ObserverType: data.observerType, // P, V, or A
        Sector: data.sector, // North, East, West, South, Molokai
        LocationName: "Call Dylan's function", // Look at spreadsheet
        LocationNotes: "", // Free text?
        Size: "N/A",
        BirdType: data.birdType, // Check spreadsheet
        ResponderName: "", // Not implemented by us
        Delivered: "", // Not implemented by us
        WhereTo: "",  // Not implemented by us
        OutreachProvided: "", // Not implemented by us
        NumCallsReceived: "", // Might just be Sightings
        OtherNotes: data.otherNotes, // String

        xLatitude: data.xlatitude, // Floating number
        xLongitude: data.xlongitude, // Floating number
        xNumHundredFt: data.xnumHundredFt,
        xAnimalBehavior: data.xanimalBehavior, // Free text?
        xTagYN: data.xTagYN,
        xBandYN: data.xBandYN,
        xBandColor: data.xbandColor, // String
        xBleachMarkYN: data.xbleachMarkYN, // Yes or No
        xBleachMarkNum: data.xBleachMarkNum, // String
        xTagNumber: data.xtagNumber,
        xTagSide: data.xtagSide, // L, R, U
        xTagColor: data.xtagColor, // R or N
        xScarsYN: data.xscarsYN, // Yes or No
        xScarsLocation: data.xscarsLocation, // String
        xImages: data.ximages, // array of links to images in cloud (?)
        MainIdentification: data.xmainIdentification, // Tag, band, bleach markings, scars
        xSightings: 1, // used for related sightings, default at one
        xRelated: "", // Another id for relating related sightings together
        xIsland: data.xIsland, // Oahu, Maui, Hawaii, Kauai, Molokai

        // Bird specific
        xConfirmRelated: "", // Default at empty and then after insertion, related algorithm changes this to 0 if needed and then after volunteer confirms, this changes to 1
        xChecked: 0,

    }, function (err, newID) {
      if (err){
        return err
      } else {
        console.log("Successfully added a bird");
        findRelatedBird(newID);
        return null
      }
    })
  },

  deleteBird( theID ){
    Birds.remove({
      _id : theID,
    }, err => {
      if (err){
        return err
      } else {
        return null
      }
    })
  },

  updateMatchingBirds( relatedId ) {
    console.log("In meteor method updateMatchingBirds");
    console.log("relatedId is: " + relatedId);
    // For all birds that have xRelated with this ID, change its confirmRelated to 1
    Birds.update(
      { 'xRelated': { $eq: relatedId } }, 
      { $set: { xConfirmRelated: 1 } },
      { multi: true },
      err => {
      if (err) {
        return err
      } else {
        return null
      }
    })
  },

  reverseMatchingBirds( relatedId ) {
    console.log("In meteor method reverseMatchingBirds");
    console.log("relatedId is: " + relatedId);
    // For all birds that have xRelated with this ID, change its confirmRelated to "", xRelated to "", xSightings to 1
    Birds.update(
      { 'xRelated': { $eq: relatedId } },
      { $set: { xConfirmRelated: "", xRelated: "", xSightings: 1, } }, 
      { multi: true },
      err => {
      if (err) {
        return err
      } else {
        return null
      }
    })
  }


})

// Publications = will need admin and regular user later?
if (Meteor.isServer) {
  Meteor.publish( 'BirdsCollection', () => {
    return Birds.find({})
  })
}

/*
 * Given an ID, this algorithm will try to find the closest matching bird already in the collection.
 * Changes any necessary fields for both the new bird and the matching bird if it finds a match
 */
function findRelatedBird(newBirdID) {
  console.log("In findRelatedBird");
  // Get all of the existing birds and only the fields needed in this algorithm
  let oldBirds = Birds.find({
    //birth: { $gt: new Date('1940-01-01'), $lt: new Date('1960-01-01') },
    xSightings: { $gte: 1 },
    _id: { $ne: newBirdID }
  }, {
    fields: {
      // Date/time
      'DateObjectObserved': 1,
      // Identifying chars
      'MainIdentification': 1,
      'TagColor': 1,
      'xTagYN': 1,
      'xBandYN': 1,
      'xBleachMarkYN': 1,
      'xScarsYN': 1,
      // Location
      'Sector': 1,
      'LocationName': 1,
      'LocationNotes': 1,
      'xLatitude' : 1,
      'xLongitude': 1,
      // Species
      'BirdType': 1,
      'xRelated': 1,
      'xSightings': 1,
    }
  }).fetch();

  console.log("oldBirds: " + JSON.stringify(oldBirds)); // All of the birds in the collection beside the newly added one
  let newBird = Birds.find({ '_id': newBirdID }, { fields: { 'DateObjectObserved': 1, 'Sex': 1, 'MainIdentification': 1, 'TagColor': 1, 'xTagYN': 1, 'xBandYN': 1, 'xBleachMarkYN': 1, 'xScarsYN': 1, 'Sector': 1, 'LocationName': 1, 'LocationNotes': 1, 'xLatitude' : 1, 'xLongitude': 1, 'BirdType': 1, 'xSightings': 1 } }).fetch()[0];

  // Weights to adjust
  const TIMING_WEIGHT = 0.25;
  const CHARACTERISTICS_WEIGHT = 0.15;
  const LOCATION_WEIGHT = 0.50;
  const SPECIES_WEIGHT = 0.10;
  const FIRST_TIMING_CUTOFF = 30; // # of mins to have full weight
  const SECOND_TIMING_CUTOFF = 60; // # of mins to have 0.75 weight
  const THIRD_TIMING_CUTOFF = 60; // # of mins to have 0.50 weight
  const CUTOFF_SCORE = 0.75;

  let bestMatchScore = 0;
  let bestMatchID = null;
  let oldxRelated = "";
  let totalSightings = 0;

  // Find the best matching bird:
  oldBirds.forEach(oldBird => {
    console.log(oldBird._id + ":");
    // Check timing
    let timeScore = 0;
    let minutes = Math.ceil(Math.abs(newBird.DateObjectObserved - oldBird.DateObjectObserved) / 60000);
    if (minutes <= FIRST_TIMING_CUTOFF) {
      timeScore = 1;
    } else if (minutes <= SECOND_TIMING_CUTOFF) {
      timeScore = 0.75;
    } else if (minutes <= THIRD_TIMING_CUTOFF) {
      timeScore = 0.5;
    } else {
      timeScore = 0;
    }
    console.log('timeScore = ', timeScore);

    // Check identifying characteristics
    let identifyingCharsScore = 0;
    if (newBird.MainIdentification === oldBird.MainIdentification) identifyingCharsScore++;
    if (newBird.TagColor === oldBird.TagColor) identifyingCharsScore++;
    if (newBird.xTagYN === oldBird.xTagYN) identifyingCharsScore++;
    if (newBird.xBandYN === oldBird.xBandYN) identifyingCharsScore++;
    if (newBird.xBleachMarkYN === oldBird.xBleachMarkYN) identifyingCharsScore++;
    if (newBird.xScarsYN === oldBird.xScarsYN) identifyingCharsScore++;
    identifyingCharsScore = identifyingCharsScore / 6;
    console.log("identifyingCharsScore:" + identifyingCharsScore);

    // Check location: 
    let locationScore = 0;
    // Sector
    if (newBird.Sector === oldBird.Sector) locationScore++;
    // if (newBird.LocationName === oldBird.LocationName) locationScore++;

    // GPS coordinates
    let newBirdCoords = Math.abs(newBird.xLatitude + newBird.xLongitude);
    let oldBirdCoords = Math.abs(oldBird.xLatitude + oldBird.xLongitude);
    // console.log("newBirdCoords" + newBirdCoords);
    // console.log("oldBirdCoords" + oldBirdCoords);
    let difference = Math.abs(newBirdCoords - oldBirdCoords);
    // console.log("difference: " + difference);
    // 0.001 degrees = 111 meters = 0.0689722 miles
    if (difference <= 0.001) {
      locationScore++;
    } else if (difference <= 0.005) {
      locationScore = locationScore + 0.5;
    } else if (difference <= 0.01) {
      locationScore = locationScore + 0.25;
    }


    // Check species
    let speciesScore = 0;
    if (newBird.BirdType === oldBird.BirdType) speciesScore++;
    console.log("speciesScore: " + speciesScore);

    // Calculate degree of matching score
    let matchingScore = (timeScore * TIMING_WEIGHT) + (identifyingCharsScore * CHARACTERISTICS_WEIGHT) + (locationScore * LOCATION_WEIGHT) + (speciesScore * SPECIES_WEIGHT);
    console.log("matchingScore: " + matchingScore + "\n");

    if (matchingScore >= bestMatchScore) {
      bestMatchScore = matchingScore;
      bestMatchID = oldBird._id;
      oldxRelated = oldBird.xRelated
      totalSightings = oldBird.xSightings + newBird.xSightings;
    }
  })

  // See if the best match has a high enough score
  if (bestMatchScore > CUTOFF_SCORE) {
    console.log("Found a best matching bird! w/the id of: " + bestMatchID);
    console.log("bestMatchScore: " + bestMatchScore + " bestMatchID: " + bestMatchID + " oldxRelated: " + oldxRelated + " totalSightings: " + totalSightings);
    // Prepare fields
    let relatedID = oldxRelated;
    if (relatedID === "") {
      console.log("Need to generate an id for xRelated");
      relatedID = bestMatchID; // just use the old bird's id so that you can trace to when the first sighting of this animal was
    }
    // Update certain fields of the new bird and matching bird to indicate match:
    // Update newest bird
    Birds.update({ '_id': newBirdID }, {
      $set: {
        xRelated: relatedID,
        xSightings: totalSightings,
        xConfirmRelated: 0,
      }
    })

    // Update older bird
    Birds.update({ '_id': bestMatchID }, {
      $set: {
        xRelated: relatedID,
        xSightings: 0,
        xConfirmRelated: 0,
      }
    })
  }
}