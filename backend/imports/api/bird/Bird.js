import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Birds = new Mongo.Collection( 'birds' )

// Meteor methods:
Meteor.methods({
  addBird( data ){
    Birds.insert({
        // Common to all animals
        DateObserved: data.date, // Date object w date and time
        ObserverName: data.observerName, // String
        ObserverPhone: data.observerPhone, // Number
        Sector: data.sector, // North, East, West, South, Molokai
        BeachLocation: data.beachLocation, // Look at spreadsheet
        LocationNotes: data.locationNotes, // Free text?
        Latitude: data.latitude, // Floating number
        Longitude: data.longitude, // Floating number
        NumHundredFt: data.numHundredFt,
        AnimalBehavior: data.animalBehavior, // Free text?
        TagNumber: data.tagNumber, // String
        TagColor: data.tagColor, // String
        BandColor: data.bandColor, // String
        BleachMark: data.bleachMark, // Yes or No
        Scars: data.scars, // Yes or No
        Images: data.images, // array of links to images in cloud (?)
        Island: data.island, // Oahu, Maui, Hawaii, Kauai, Molokai
        MainIdentification: data.identification, // Tag, band, bleach markings, scars
        OtherNotes: data.otherNotes, // String

        // Bird specific
        BirdType: data.birdType, // Check spreadsheet
        Sightings: data.sightings, // used for related sightings, default at one
        Related: data.related, // Another id for relating related sightings together
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
