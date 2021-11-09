import axios from 'axios';

/**
 * Uses Google's Geocoding API to translate coordinates to location names.
 * @param {*} lat the latitude
 * @param {*} lng the longitude
 */
export function getLocationName(lat, lng) {
  // configure axios request
  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&result_type=point_of_interest|premise&key=' + Meteor.settings.google_api_key,
    headers: {}
  };

  // make the request
  return axios(config)
  .then((v) => getPlaceDetails(v.data.results[0].place_id))
  .catch((error) => console.log(error)); 
}

/**
 * Uses Google's Places API to translate ids to location names.
 * @param {*} place_id the place ID
 */
function getPlaceDetails(place_id) {
  // configure axios request
  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=name%2Cformatted_address%2Cgeometry%2Caddress_component' + '&key=' + Meteor.settings.google_api_key,
    headers: {}
  };

  // make the request
  return axios(config); 
}