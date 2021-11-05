import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from 'meteor/fetch';

// Make a POST request to url with data as a param.
async function postData (url, data) {
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'no-cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: new Headers({
            'Authorization': 'Bearer my-secret-key',
            'Content-Type': 'application/json'
        }),
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data),
    });
    return response.json();
}

const postDataCall = Meteor.wrapAsync(postData);
// for more information about parameters, visit https://developers.google.com/maps/documentation/geocoding/overview#reverse-example.
const results = postDataCall('https://maps.googleapis.com/maps/api/geocode/json?', { 
    // data here
});

console.log(results);