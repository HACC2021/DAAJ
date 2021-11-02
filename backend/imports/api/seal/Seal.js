import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Seals = new Mongo.Collection( 'seals' )

// Meteor methods:
Meteor.methods({
  addSeal( data ){
    Seals.insert({
        // Common to all animals
        DateObserved: data.date, // Date object w date and time
        ObserverName: data.observerName, // String
        ObserverPhone: data.observerPhone, // Number
        Sector: data.sector, // North, East, West, South, Molokai
        BeachLocation: data.beachLocation, // Look at spreadhseet
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

        // Seal specific
        SealType: data.SealType, // Check spreadsheet
        Sightings: data.sightings, // used for related sightings, default at one
        Related: data.related, // Another id for relating related sightings together
        Size: data.size, // String (?)
        Sex: data.sex, // Male/Female
        BeachPosition: data.beachPosition,
    }, err => {
      if (err){
        return err
      } else {
        return null
      }
    })
  },

  deleteSeal( theID ){
    Seals.remove({
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
Meteor.publish( 'SealsCollection', () => {
  return Seals.find({})
})