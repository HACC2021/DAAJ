import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from 'meteor/fetch';

/**
 * Uses Google's Places API to get location details from coordinates.
 * @param {*} lat the latitude
 * @param {*} lng the longitude
 */
async function getLocationDetails(lat, lng) {
  const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + 21.2690 + '%2C' + -157.6938 + '&radius=100&key=' + Meteor.settings.google_api_key, {
    headers: new Headers({
      'content-type': 'application/json'
    }),
    method: 'GET',
  });
  return response.json();
}

Meteor.methods({
  'getLocation'({lat, lng}) {
    return getLocationDetails(lat, lng);
  }
});