/* eslint-disable no-console */
'use strict';

const request = require('request');

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=845a375111434428fa67475af7b7e1f8&query=${lat},${lon}&units=f`;

  request({ url, json: true }, (err, { body : { error, current: { weather_descriptions, temperature, feelslike } } }) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
    } else if (error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees.`);
    }
  });
};

module.exports = forecast;