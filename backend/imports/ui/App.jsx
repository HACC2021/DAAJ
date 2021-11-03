import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Phone } from './Phone.jsx';


export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Info/>
    <Phone/>
  </div>
);
