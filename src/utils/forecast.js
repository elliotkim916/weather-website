/* eslint-disable no-console */
'use strict';

const request = require('request');

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=845a375111434428fa67475af7b7e1f8&query=${lat},${lon}&units=f`;

  request({ url, json: true }, (err, { body : { error, current: { weather_descriptions, temperature, feelslike, humidity } } }) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
    } else if (error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, `Today the weather is ${weather_descriptions[0]}. It is currently ${temperature} degrees out and it should feel like ${feelslike} degrees.  Also, the humidity is currently ${humidity}%.`);
    }
  });
};

module.exports = forecast;