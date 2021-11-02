import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from "simpl-schema";
import { check } from "meteor/check";
import { Tracker } from "meteor/tracker";

export const PhoneNumbers = new Mongo.Collection( 'phoneNumbers' )

// SimpleSchema.defineValidationErrorTransform((error) => {
//   const ddpError = new Meteor.Error(error.message);
//   ddpError.error = "validation-error";
//   ddpError.details = error.details;
//   return ddpError;
// });

// // Define a Schema for PhoneNumbers:
// const PhoneNumbersSchema = new SimpleSchema({
//    name: String,
//    number: Number
//   }, { check }, {
//     clean: {
//       autoConvert: true,
//       extendAutoValueContext: {},
//       filter: false,
//       getAutoValues: true,
//       removeEmptyStrings: false,
//       removeNullsFromArrays: false,
//       trimStrings: true,
//     },
//     humanizeAutoLabels: false,
//     requiredByDefault: true, //false
//   })

// const PhoneNumbersArgSchema = PhoneNumbersSchema;

// Meteor methods:
Meteor.methods({
  addPhoneNumber( data ){
    console.log("In Meteor method addPhoneNumber");
    // PhoneNumbersArgSchema.validate(PhoneNumbersSchema.clean(data)); // Example of how to validate
    PhoneNumbers.insert({
      name: data.name,
      number: data.number
    }, err => {
      if (err){
        console.log("an error with validation");
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
  },

  updatePhoneNumber( data ){ // name, number, id
    console.log("In Meteor method updatePhoneNumber");
    console.log(data);
    PhoneNumbers.update({
      _id : data.id,
    }, {name: data.name , number: data.number }, err => {
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