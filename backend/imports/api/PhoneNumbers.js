import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const PhoneNumbers = new Mongo.Collection( 'phoneNumbers' )

Meteor.methods({
  addPhoneNumber( data ){
    console.log("in addPhoneNumber");
    PhoneNumbers.insert({
      name: data.name,
      number: data.number
    }, err => {
      if (err){
        return err
      } else {
        console.log("successfully added in addPhoneNumber");
        return null
      }
    })
  }
})

Meteor.publish( 'phonenumbers', () => {
  return PhoneNumbers.find({})
})
