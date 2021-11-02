import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const PhoneNumbers = new Mongo.Collection( 'phoneNumbers' )

// Meteor methods:
Meteor.methods({
  addPhoneNumber( data ){
    PhoneNumbers.insert({
      name: data.name,
      number: data.number
    }, err => {
      if (err){
        return err
      } else {
        return null
      }
    })
  },

  deletePhoneNumber( theID ){
    PhoneNumbers.remove({
      _id : theID,
    }, err => {
      if (err){
        return err
      } else {
        return null
      }
    })
  }
})

// Publications = will need admin and regular user later?
Meteor.publish( 'PhoneNumbersCollection', () => {
  return PhoneNumbers.find({})
})