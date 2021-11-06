import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Seals = new Mongo.Collection( 'seals' )

// Meteor methods:
Meteor.methods({
  addSeal( data ){
    Seals.insert({
        DateObjectObserved: data.dateObjectObserved,
        Animal: "Seal",
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
        LocationName: data.location, // Look at spreadsheet
        LocationNotes: data.locationNotes, // won't have anything cuz already haveBeachPosition
        SealPresent: data.sealPresent,
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
        SealDepart: data.sealDepart, // Yes or no
        SealDepartDate: data.departDate, 
        SealDepartTime: data.departTime,
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
        xScarsYN: data.xscars, // Yes or No
        xScarsLocation: data.xscarsLocation, // String
        xImages: data.ximages, // array of links to images in cloud (?)
        xIsland: data.xisland, // Oahu, Maui, Hawaii, Kauai, Molokai
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
if (Meteor.isServer) {
  Meteor.publish( 'SealsCollection', () => {
    return Seals.find({})
  })
}
