import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import {getDateTime} from '../functions.js';


export const Seals = new Mongo.Collection('seals')

// Meteor methods:
Meteor.methods({
  addSeal(data) {
    let dateTime = getDateTime(data.dateObjectObserved);
    Seals.insert({
        DateObjectObserved: data.dateObjectObserved,
        Animal: "Seal",
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
        LocationNotes: "", // won't have anything cuz already haveBeachPosition
        SealPresent: "Y",
        Size: data.size, // String (?)
        Sex: data.sex, // Male/Female
        BeachPosition: data.beachPosition,
        MainIdentification: data.mainIdentification, // Tag, natural, applied bleach, scars
        BleachNumber: data.bleachNumber, // aka ID Temp
        TagNumber: data.tagNumber,
        TagSide: data.tagSide, // L, R, U
        TagColor: data.tagColor, // R or N
        IDPerm: "", // Not implemented by us
        Molt: "", // Not implemented by us
        AdditionalNotesOnID: "", // Not implemented by us
        IDVerifiedBy: "", // Not implemented by us
        SealLogging: "", // Not implemented by us
        MomPup: data.momPup,
        SRASetBy: "", // Not implemented by us
        NumVolunteers: "", // Not implemented by us
        SealDepart: "", // Not implemented by us
        SealDepartDate: "", // Not implemented by us
        SealDepartTime: "", // Not implemented by us
        NumCalls: "", // May be sightings
        OtherNotes: data.otherNotes, // String

        xLatitude: data.xlatitude, // Floating number
        xLongitude: data.xlongitude, // Floating number
        xNumHundredFt: data.xnumHundredFt,
        xAnimalBehavior: data.xanimalBehavior, // Free text?
        xTagYN: data.xTagYN,
        xBandYN: data.xBandYN,
        xBandColor: data.xbandColor, // String
        xBleachMarkYN: data.xbleachMarkYN, // Yes or No
        xScarsYN: data.xscarsYN, // Yes or No
        xScarsLocation: data.xscarsLocation, // String
        xImages: data.ximages, // array of links to images in cloud (?)
        xIsland: data.xisland, // Oahu, Maui, Hawaii, Kauai, Molokai
        xSightings: 1, // used for related sightings, default at one
        xRelated: "", // Another id for relating related sightings together
        xConfirmRelated: "", // Default at empty and then after insertion, related algorithm changes this to 0 if needed and then after volunteer confirms, this changes to 1
        xChecked: 0,
    }, function (err, newID) {
      if (err){
        console.log(err);
        return err
      } else {
        console.log("Successfully added a seal");
        // findRelatedSeal(newID);
        return null;
      }
    })
  },

  deleteSeal(theID) {
    Seals.remove({
      _id: theID,
    }, err => {
      if (err) {
        return err
      } else {
        return null
      }
    })
  },

  updateMatchingSeals( relatedId ) {
    console.log("In meteor method updateMatchingSeals");
    console.log("relatedId is: " + relatedId);
    // For all seals that have xRelated with this ID, change its confirmRelated to 1
    Seals.update(
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

  reverseMatchingSeals( relatedId ) {
    console.log("In meteor method reverseMatchingSeals");
    console.log("relatedId is: " + relatedId);
    // For all seals that have xRelated with this ID, change its confirmRelated to "", xRelated to "", xSightings to 1
    Seals.update(
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
  },

  checkSealReport( sealId ) {
    console.log("In meteor method checkSealReport");
    console.log("Id is: " + sealId);
    Seals.update(
      { '_id': { $eq: sealId } },
      { $set: { xChecked: 1 } }, function (err) {
        if (err){
          console.log(err);
          return err
        } else {
          console.log("Checked seal, now checking for related! w/id: " + sealId);
          findRelatedSeal(sealId);
          return null;
        }
      }
    )
  }
})

// Publications = will need admin and regular user later?
if (Meteor.isServer) {
  Meteor.publish('SealsCollection', () => {
    return Seals.find({})
  })
}

/*
 * Given an ID, this algorithm will try to find the closest matching seal already in the collection.
 * Changes any necessary fields for both the new seal and the matching seal if it finds a match
 */
function findRelatedSeal(newSealID) {
  console.log("In findRelatedSeal");
  // Get all of the existing seals and only the fields needed in this algorithm
  let oldSeals = Seals.find({
    //birth: { $gt: new Date('1940-01-01'), $lt: new Date('1960-01-01') },
    xSightings: { $gte: 1 },
    _id: { $ne: newSealID },
    xChecked: 1,
  }, {
    fields: {
      // Date/time
      'DateObjectObserved': 1,
      // Identifying chars
      'Sex': 1,
      'MainIdentification': 1,
      'TagColor': 1,
      'xTagYN': 1,
      'xBandYN': 1,
      'xBleachMarkYN': 1,
      'xScarsYN': 1,
      // Location
      'Sector': 1,
      'LocationName': 1,
      'xLatitude': 1,
      'xLongitude': 1,
      'xRelated': 1,
      'xSightings': 1,
    }
  }).fetch();

  console.log("oldSeals: " + JSON.stringify(oldSeals)); // All of the seals in the collection beside the newly added one
  let newSeal = Seals.find({ '_id': newSealID }, { fields: { 'DateObjectObserved': 1, 'Sex': 1, 'MainIdentification': 1, 'TagColor': 1, 'xTagYN': 1, 'xBandYN': 1, 'xBleachMarkYN': 1, 'xScarsYN': 1, 'Sector': 1, 'LocationName': 1, 'xLatitude' : 1, 'xLongitude': 1, 'xSightings': 1 } }).fetch()[0];

  // Weights to adjust
  const TIMING_WEIGHT = 0.25;
  const CHARACTERISTICS_WEIGHT = 0.25;
  const LOCATION_WEIGHT = 0.50;
  const FIRST_TIMING_CUTOFF = 30; // # of mins to have full weight
  const SECOND_TIMING_CUTOFF = 60; // # of mins to have 0.75 weight
  const THIRD_TIMING_CUTOFF = 60; // # of mins to have 0.50 weight
  // GPS Coordinates: 0.001 degrees = 111 meters = 0.0689722 miles
  const FIRST_GPS_CUTOFF = 0.001; // Total difference in GPS coordinates to have full weight 
  const SECOND_GPS_CUTOFF = 0.005; // Total difference in GPS coordinates to have half weight 
  const THIRD_GPS_CUTOFF = 0.01; // Total difference in GPS coordinates to have quarter weight 
  const CUTOFF_SCORE = 0.75;

  let bestMatchScore = 0;
  let bestMatchID = null;
  let oldxRelated = "";
  let totalSightings = 0;

  // Find the best matching seal:
  oldSeals.forEach(oldSeal => {
    console.log(oldSeal._id + ":");
    // Check timing
    let timeScore = 0;
    let minutes = Math.ceil(Math.abs(newSeal.DateObjectObserved - oldSeal.DateObjectObserved) / 60000);
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
    if (newSeal.Sex === oldSeal.Sex) identifyingCharsScore++;
    if (newSeal.MainIdentification === oldSeal.MainIdentification) identifyingCharsScore++;
    if (newSeal.TagColor === oldSeal.TagColor) identifyingCharsScore++;
    if (newSeal.xTagYN === oldSeal.xTagYN) identifyingCharsScore++;
    if (newSeal.xBandYN === oldSeal.xBandYN) identifyingCharsScore++;
    if (newSeal.xBleachMarkYN === oldSeal.xBleachMarkYN) identifyingCharsScore++;
    if (newSeal.xScarsYN === oldSeal.xScarsYN) identifyingCharsScore++;
    identifyingCharsScore = identifyingCharsScore / 7;
    console.log("identifyingCharsScore:" + identifyingCharsScore);

    // Check location: 
    let locationScore = 0;
    // Sector
    if (newSeal.Sector === oldSeal.Sector) locationScore++;
    // if (newSeal.LocationName === oldSeal.LocationName) locationScore++;

    // GPS coordinates
    let newSealCoords = Math.abs(newSeal.xLatitude + newSeal.xLongitude);
    let oldSealCoords = Math.abs(oldSeal.xLatitude + oldSeal.xLongitude);
    // console.log("newSealCoords" + newSealCoords);
    // console.log("oldSealCoords" + oldSealCoords);
    let difference = Math.abs(newSealCoords - oldSealCoords);
    // console.log("difference: " + difference);
    // 0.001 degrees = 111 meters = 0.0689722 miles
    if (difference <= FIRST_GPS_CUTOFF) {
      locationScore++;
    } else if (difference <= SECOND_GPS_CUTOFF) {
      locationScore = locationScore + 0.5;
    } else if (difference <= THIRD_GPS_CUTOFF) {
      locationScore = locationScore + 0.25;
    } else {
      locationScore =+ 0;
    }

    locationScore = locationScore / 2;
    console.log("locationScore: " + locationScore);

    // Calculate degree of matching score
    let matchingScore = (timeScore * TIMING_WEIGHT) + (identifyingCharsScore * CHARACTERISTICS_WEIGHT) + (locationScore * LOCATION_WEIGHT);
    console.log("matchingScore: " + matchingScore + "\n");

    if (matchingScore >= bestMatchScore) {
      bestMatchScore = matchingScore;
      bestMatchID = oldSeal._id;
      oldxRelated = oldSeal.xRelated
      totalSightings = oldSeal.xSightings + newSeal.xSightings;
    }
  })

  // See if the best match has a high enough score
  if (bestMatchScore > CUTOFF_SCORE) {
    console.log("Found a best matching seal! w/the id of: " + bestMatchID);
    console.log("bestMatchScore: " + bestMatchScore + " bestMatchID: " + bestMatchID + " oldxRelated: " + oldxRelated + " totalSightings: " + totalSightings);
    // Prepare fields
    let relatedID = oldxRelated;
    if (relatedID === "") {
      console.log("Need to generate an id for xRelated");
      relatedID = bestMatchID; // just use the old seal's id so that you can trace to when the first sighting of this animal was
    }
    // Update certain fields of the new seal and matching seal to indicate match:
    // Update newest seal
    Seals.update({ '_id': newSealID }, {
      $set: {
        xRelated: relatedID,
        xSightings: totalSightings,
        xConfirmRelated: 0,
      }
    })

    // Update older seal
    Seals.update({ '_id': bestMatchID }, {
      $set: {
        xRelated: relatedID,
        xSightings: 0,
        xConfirmRelated: 0,
      }
    })
  } else {
    console.log("No match!");
  }
}