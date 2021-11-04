import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Others = new Mongo.Collection( 'others' )

// Meteor methods:
Meteor.methods({
  addOther( data ){
    Others.insert({
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
        BeachLocation: data.beachLocation, // Look at spreadsheet
        LocationNotes: data.locationNotes, // Free text?
        Latitude: data.latitude, // Floating number
        Longitude: data.longitude, // Floating number
        NumHundredFt: data.numHundredFt,
        AnimalBehavior: data.animalBehavior, // Free text?
        BandYN: data.BandYN,
        BandColor: data.bandColor, // String
        BleachMarkYN: data.bleachMarkYN, // Yes or No
        BleachMarkNum: data.BleachMarkNum, // String
        TagNumber: data.tagNumber,
        TagSide: data.tagSide, // L, R, U
        TagColor: data.tagColor, // R or N
        Scars: data.scars, // Yes or No
        Images: data.images, // array of links to images in cloud (?)
        Island: data.island, // Oahu, Maui, Hawaii, Kauai, Molokai
        MainIdentification: data.identification, // Tag, band, bleach markings, scars
        OtherNotes: data.otherNotes, // String

        // Other specific
        Animal: data.animal, // user given
    }, err => {
      if (err){
        return err
      } else {
        return null
      }
    })
  },

  deleteOther( theID ){
    Others.remove({
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
  Meteor.publish( 'OthersCollection', () => {
    return Others.find({})
  })
}