import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Birds = new Mongo.Collection( 'birds' )

// Meteor methods:
Meteor.methods({
  addBird( data ){
    Birds.insert({
        // Common to all animals
        DateObserved: data.date, // Date object w date and time
        TimeObserved: data.timeObserved,
        TicketNumber: "", // Not implemented by us
        HotlineOpInitials: "", // Not implemented by us
        TicketType: "", // Not implemented by us
        ObserverName: data.observerName, // String
        ObserverPhone: data.observerPhone, // Number
        ObserverInitials: data.observerInitials,
        ObserverType: data.observerType, // P, V, or A
        Sector: data.sector, // North, East, West, South, Molokai
        Location: data.location, // Look at spreadsheet
        LocationNotes: data.locationNotes, // Free text?
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
        xScars: data.xscars, // Yes or No
        xAmpFlipper: data.xampFlipper, // Yes or No; export into other notes
        xWhichFlipper: data.xwhichFlipper, //string that'll be exported into other notes
        xImages: data.ximages, // array of links to images in cloud (?)
        xMainIdentification: data.xmainIdentification, // Tag, band, bleach markings, scars
        xSightings: 1, // used for related sightings, default at one
        xRelated: "", // Another id for relating related sightings together
        xImages: data.ximages, // array of links to images in cloud (?)
        xIsland: data.xIsland, // Oahu, Maui, Hawaii, Kauai, Molokai
        xMainIdentification: data.xMainIdentification, // Tag, band, bleach markings, scars

        // Bird specific
        Sightings: data.sightings, // used for related sightings, default at one
        xRelated: data.xrelated, // Another id for relating related sightings together
        xConfirmRelated: "", // Default at empty and then after insertion, related algorithm changes this to 0 if needed and then after volunteer confirms, this changes to 1

    }, err => {
      if (err){
        return err
      } else {
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

})

// Publications = will need admin and regular user later?
if (Meteor.isServer) {
  Meteor.publish( 'BirdsCollection', () => {
    return Birds.find({})
  })
}
