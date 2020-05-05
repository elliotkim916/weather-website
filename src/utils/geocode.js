/* eslint-disable no-console */
'use strict';

const request = require('request');
 
const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWxsaW90a2ltOTE2IiwiYSI6ImNqZ284c2FyODAxZ3EzM3BubjRhOHBsa2oifQ._i5QdBQ8IoAHVgw3OgAq6g&limit=1';

  request({ url, json: true}, (error, { body: { features } }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (features.length === 0) {
      callback('Unable to find coordinates!', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      });
    }
  });
};

module.exports = geocode;