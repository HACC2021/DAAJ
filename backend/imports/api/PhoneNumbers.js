import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const PhoneNumbers = new Mongo.Collection( 'phoneNumbers' )

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
  }
})

Meteor.publish( 'getAllNumbers', () => {
  return PhoneNumbers.find({})
})
