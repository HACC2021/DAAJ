import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Others = new Mongo.Collection( 'others' )

// Meteor methods:
Meteor.methods({
  addOther( data ){
    Others.insert({
        DateObjectObserved: data.dateObjectObserved,
        Animal: data.animal, // user given
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
        Size: "N/A",
        LocationName: data.beachLocation, // Look at spreadsheet
        LocationNotes: data.locationNotes, // Free text?
        Latitude: data.latitude, // Floating number
        Longitude: data.longitude, // Floating number
        NumHundredFt: data.numHundredFt,
        xAnimalBehavior: data.animalBehavior, // Free text?
        TagYN: data.TagYN,
        BandYN: data.BandYN,
        BandColor: data.bandColor, // String
        BleachMarkYN: data.bleachMarkYN, // Yes or No
        BleachMarkNum: data.BleachMarkNum, // String
        TagNumber: data.tagNumber,
        TagSide: data.tagSide, // L, R, U
        TagColor: data.tagColor, // R or N
        ScarsYN: data.scars, // Yes or No
        ScarsLocation: data.scarsLocation, // String
        Images: data.images, // array of links to images in cloud (?)
        Island: data.island, // Oahu, Maui, Hawaii, Kauai, Molokai
        MainIdentification: data.identification, // Tag, band, bleach markings, scars
        OtherNotes: data.otherNotes, // String
        xSightings: 1,
        xLatitude: data.xlatitude, // Floating number
        xLongitude: data.xlongitude, // Floating number
        xChecked: 0,
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