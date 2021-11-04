import React from 'react';
import { Hello } from '../components/Hello.jsx';
import { Info } from '../components/Info.jsx';
import { Phone } from '../components/Phone.jsx';


export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Info/>
    <Phone/>
  </div>
);
