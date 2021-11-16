import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import {getDateTime} from '../functions.js';


export const Turtles = new Mongo.Collection( 'turtles' )

// Meteor methods:
Meteor.methods({
  addTurtle( data ){
    let dateTime = getDateTime(data.dateObjectObserved);
    Turtles.insert({
        DateObjectObserved: data.dateObjectObserved,
        Animal: "Turtle",
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
        Island: data.island, // Oahu, Maui, Hawaii, Kauai, Molokai
        Sector: data.sector, // North, East, West, South, Molokai
        LocationName: "Call Dylan's function", // Look at spreadsheet
        LocationNotes: data.locationNotes,
        TurtleType: data.turtleType, // Check spreadsheet
        Size: data.size, // String like 2ft
        Status: data.status, // deceased, alive, unknown
        PrimaryIssue: "", // Not implemented by us
        Response: "", // Not implemented by us
        TimeResponderLeft: "", // Not implemented by us
        ResponderArrivalTime: "", // Not implemented by us
        OutreachProvided: "", // Not implemented by us
        FAST: "", // Not implemented by us
        NumCallsReceived: "", // Might just be Sightings
        OtherNotes: data.otherNotes, // String

        xLatitude: data.xlatitude, // Floating number
        xLongitude: data.xlongitude, // Floating number
        xNumHundredFt: data.xnumHundredFt,
        xAnimalBehavior: data.xanimalBehavior, // Free text?
        xTagYN: data.xTagYN,
        xTagNumber: data.xtagNumber,
        xTagSide: data.xtagSide, // L, R, U
        xTagColor: data.xtagColor, // R or N
        xBandYN: data.xBandYN,
        xBandColor: data.xbandColor, // String
        xBleachMarkYN: data.xbleachMarkYN, // Yes or No
        xBleachMarkNum: data.xBleachMarkNum, // String
        xScarsYN: data.xscarsYN, // Yes or No
        xScarsLocation: data.xscarsLocation, // String
        xAmpFlipper: data.xampFlipper, // Yes or No; export into other notes
        xWhichFlipper: data.xwhichFlipper, //string that'll be exported into other notes
        xImages: data.ximages, // array of links to images in cloud (?)
        MainIdentification: data.xmainIdentification, // Tag, band, bleach markings, scars
        xSightings: 1, // used for related sightings, default at one
        xRelated: "", // Another id for relating related sightings together
        xConfirmRelated: "", // Default at empty and then after insertion, related algorithm changes this to 0 if needed and then after volunteer confirms, this changes to 1
        xChecked: 0,

    }, function (err, newID) {
      if (err){
        return err
      } else {
        console.log("Successfully added a turtle");
        // findRelatedTurtle(newID);
        return null
      }
    })
  },

  deleteTurtle( theID ){
    Turtles.remove({
      _id : theID,
    }, err => {
      if (err){
        return err
      } else {
        return null
      }
    })
  },

  updateMatchingTurtles( relatedId ) {
    console.log("In meteor method updateMatchingTurtles");
    console.log("relatedId is: " + relatedId);
    // For all turtles that have xRelated with this ID, change its confirmRelated to 1
    Turtles.update(
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

  reverseMatchingTurtles( relatedId ) {
    console.log("In meteor method reverseMatchingTurtles");
    console.log("relatedId is: " + relatedId);
    // For all turtles that have xRelated with this ID, change its confirmRelated to "", xRelated to "", xSightings to 1
    Turtles.update(
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

  checkTurtleReport( turtleId ) {
    console.log("In meteor method checkTurtleReport");
    console.log("Id is: " + turtleId);
    Turtles.update(
      { '_id': { $eq: turtleId } },
      { $set: { xChecked: 1 } }, function (err) {
        if (err){
          console.log(err);
          return err
        } else {
          console.log("Checked turtle, now checking for related! w/id: " + turtleId);
          findRelatedTurtle(turtleId);
          return null;
        }
      }
    )
  }
})

// Publications = will need admin and regular user later?
if (Meteor.isServer) {
  Meteor.publish( 'TurtlesCollection', () => {
    return Turtles.find({})
  })
}

/*
 * Given an ID, this algorithm will try to find the closest matching turtle already in the collection.
 * Changes any necessary fields for both the new turtle and the matching turtle if it finds a match
 */
function findRelatedTurtle(newTurtleID) {
  console.log("In findRelatedTurtle");
  // Get all of the existing turtles and only the fields needed in this algorithm
  let oldTurtles = Turtles.find({
    //birth: { $gt: new Date('1940-01-01'), $lt: new Date('1960-01-01') },
    xSightings: { $gte: 1 },
    _id: { $ne: newTurtleID },
    xChecked: 1,
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
      'xAmpFlipper': 1,
      // Location
      'Sector': 1,
      'LocationName': 1,
      'LocationNotes': 1,
      'xLatitude': 1,
      'xLongitude': 1,
      // Species
      'TurtleType': 1,
      'xRelated': 1,
      'xSightings': 1,
    }
  }).fetch();

  console.log("oldTurtles: " + JSON.stringify(oldTurtles)); // All of the turtles in the collection beside the newly added one
  let newTurtle = Turtles.find({ '_id': newTurtleID }, { fields: { 'DateObjectObserved': 1, 'Sex': 1, 'MainIdentification': 1, 'TagColor': 1, 'xTagYN': 1, 'xBandYN': 1, 'xBleachMarkYN': 1, 'xScarsYN': 1, 'xAmpFlipper': 1, 'Sector': 1, 'LocationName': 1, 'LocationNotes': 1, 'xLatitude' : 1, 'xLongitude': 1, 'TurtleType': 1, 'xSightings': 1 } }).fetch()[0];

  // Weights to adjust
  const TIMING_WEIGHT = 0.25;
  const CHARACTERISTICS_WEIGHT = 0.15;
  const LOCATION_WEIGHT = 0.50;
  const SPECIES_WEIGHT = 0.10;
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

  // Find the best matching turtle:
  oldTurtles.forEach(oldTurtle => {
    console.log(oldTurtle._id + ":");
    // Check timing
    let timeScore = 0;
    let minutes = Math.ceil(Math.abs(newTurtle.DateObjectObserved - oldTurtle.DateObjectObserved) / 60000);
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
    if (newTurtle.MainIdentification === oldTurtle.MainIdentification) identifyingCharsScore++;
    if (newTurtle.TagColor === oldTurtle.TagColor) identifyingCharsScore++;
    if (newTurtle.xTagYN === oldTurtle.xTagYN) identifyingCharsScore++;
    if (newTurtle.xBandYN === oldTurtle.xBandYN) identifyingCharsScore++;
    if (newTurtle.xBleachMarkYN === oldTurtle.xBleachMarkYN) identifyingCharsScore++;
    if (newTurtle.xScarsYN === oldTurtle.xScarsYN) identifyingCharsScore++;
    if (newTurtle.xAmpFlipper === oldTurtle.xAmpFlipper) identifyingCharsScore++;
    identifyingCharsScore = identifyingCharsScore / 7;
    console.log("identifyingCharsScore:" + identifyingCharsScore);

    // Check location: 
    let locationScore = 0;
    // Sector
    if (newTurtle.Sector === oldTurtle.Sector) locationScore++;
    // if (newTurtle.LocationName === oldTurtle.LocationName) locationScore++;

    // GPS coordinates
    let newTurtleCoords = Math.abs(newTurtle.xLatitude + newTurtle.xLongitude);
    let oldTurtleCoords = Math.abs (oldTurtle.xLatitude + oldTurtle.xLongitude);
    // console.log("newTurtleCoords" + newTurtleCoords);
    // console.log( oldTurtleCoords" + oldTurtleCoords);
    let difference = Math.abs(newTurtleCoords - oldTurtleCoords);
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

    // Check species
    let speciesScore = 0;
    if (newTurtle.TurtleType === oldTurtle.TurtleType) speciesScore++;
    console.log("speciesScore: " + speciesScore);

    // Calculate degree of matching score
    let matchingScore = (timeScore * TIMING_WEIGHT) + (identifyingCharsScore * CHARACTERISTICS_WEIGHT) + (locationScore * LOCATION_WEIGHT) + (speciesScore * SPECIES_WEIGHT);
    console.log("matchingScore: " + matchingScore + "\n");

    if (matchingScore >= bestMatchScore) {
      bestMatchScore = matchingScore;
      bestMatchID = oldTurtle._id;
      oldxRelated = oldTurtle.xRelated
      totalSightings = oldTurtle.xSightings + newTurtle.xSightings;
    }
  })

  // See if the best match has a high enough score
  if (bestMatchScore > CUTOFF_SCORE) {
    console.log("Found a best matching turtle! w/the id of: " + bestMatchID);
    console.log("bestMatchScore: " + bestMatchScore + " bestMatchID: " + bestMatchID + " oldxRelated: " + oldxRelated + " totalSightings: " + totalSightings);
    // Prepare fields
    let relatedID = oldxRelated;
    if (relatedID === "") {
      console.log("Need to generate an id for xRelated");
      relatedID = bestMatchID; // just use the old turtle's id so that you can trace to when the first sighting of this animal was
    }
    // Update certain fields of the new turtle and matching turtle to indicate match:
    // Update newest turtle
    Turtles.update({ '_id': newTurtleID }, {
      $set: {
        xRelated: relatedID,
        xSightings: totalSightings,
        xConfirmRelated: 0,
      }
    })

    // Update older turtle
    Turtles.update({ '_id': bestMatchID }, {
      $set: {
        xRelated: relatedID,
        xSightings: 0,
        xConfirmRelated: 0,
      }
    })
  }
}