import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Birds = new Mongo.Collection( 'birds' )

// Meteor methods:
Meteor.methods({
  addBird( data ){
    Birds.insert({
        DateObjectObserved: data.dateObjectObserved,
        Animal: "Bird",
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
