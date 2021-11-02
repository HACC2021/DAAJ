import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Turtles = new Mongo.Collection( 'turtles' )

// Meteor methods:
Meteor.methods({
  addTurtle( data ){
    Turtles.insert({
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

        // Turtle specific
        TurtleType: data.TurtleType, // Check spreadsheet
        Sightings: data.sightings, // used for related sightings, default at one
        Related: data.related, // Another id for relating related sightings together
        Island: data.island, // Oahu, Maui, Hawaii, Kauai, Molokai
        Size: data.size, // String (?)

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
Meteor.publish( 'TurtlesCollection', () => {
  return Turtles.find({})
})