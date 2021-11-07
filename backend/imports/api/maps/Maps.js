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
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=API_KEY',
    headers: {}
  };

  // make the request
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}
