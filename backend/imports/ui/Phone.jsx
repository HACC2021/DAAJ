import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PhoneNumbers } from '../api/phonenumber/PhoneNumber';

export const Phone = () => {
  const phonenumbers = useTracker(() => {
    return PhoneNumbers.find().fetch();
  });

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{phonenumbers.map(
        phonenumbers => <li key={phonenumbers._id}>
            {phonenumbers.name} | {phonenumbers.number}
        </li>
      )}</ul>
    </div>
  );
};
