import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from 'meteor/fetch';

/**
 * Uses Google's Geocoding API to translate location names to coordinates.
 * @param {*} query the location name
 */
async function geocode(query) {
  // replace spaces with + for request
  formatted = query.toString().replace(/ /g,"+");

  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + formatted + '&key=' + Meteor.settings.google_api_key, {
    headers: new Headers({
      'content-type': 'application/json'
    }),
    method: 'GET',
  });
  return response.json();
}

Meteor.methods({
  'callGeocode'(query) {
    return geocode(query);
  }
});