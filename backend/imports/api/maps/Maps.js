import axios from 'axios';

// configure axios request
var config = {
  method: 'get',
  url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=21.294022,-157.863525&key=API_KEY',
  headers: { }
};

// make the request
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
