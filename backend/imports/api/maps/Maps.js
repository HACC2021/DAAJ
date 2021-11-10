import axios from 'axios';

/**
 * Translate coordinates to location names.
 * @param {*} lat the latitude
 * @param {*} lng the longitude
 */
export function getLocationName(lat, lng) {
  // configure axios request
  var config = {
    method: 'get',
    url: 'https://geodata.hawaii.gov/arcgis/rest/services/CoastalMarine/MapServer/25/query?where=%20(latitude%3E' + (lat - 0.001) + '%20AND%20latitude%3C' + (lat + 0.001) + '%20AND%20longitude%3C' + (lng + 0.001) + '%20AND%20longitude%3E' + (lng - 0.001) + ')%20&outFields=map_id,name,latitude,longitude,alt_name&outSR=&f=json',
    headers: {}
  };

  // make the request
  return axios(config);
}