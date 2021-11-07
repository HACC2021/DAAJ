import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Turtles = new Mongo.Collection( 'turtles' )

// Meteor methods:
Meteor.methods({
  addTurtle( data ){
    Turtles.insert({
        DateObjectObserved: data.dateObjectObserved,
        Animal: "Turtle",
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

    }, err => {
      if (err){
        return err
      } else {
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

})

// Publications = will need admin and regular user later?
if (Meteor.isServer) {
  Meteor.publish( 'TurtlesCollection', () => {
    return Turtles.find({})
  })
}