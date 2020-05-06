/* eslint-disable no-console */
'use strict';

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); 
const partialsPath = path.join(__dirname, '../templates/partials');

// console.log(__dirname);
// console.log(__filename);

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs'); 
hbs.registerPartials(partialsPath);
// set allows you to set a value for a given Express setting
// first arg is the key, the setting name
// second arg is the value we want to set for the setting
// in this case, the value is the name of the module we installed, which is hbs
// this single line is all we need to get handlebars set up

// Setup static directory to serve
// app.use - a way to customize your server
app.use(express.static(publicDirectoryPath));
// express.static - static takes the path to the folder we want to serve up

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Elliot Kim',
    createdBy: 'Created By Elliot San Kim'
  }); 
  // Express goes off and gets that view
  // then converts it to HTML, and makes sure the HTML gets back to the requester
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Elliot Kim',
    createdBy: 'Created By Elliot San Kim'
  });
});

app.get('/help', (req, res) => {
  // first arg is name of new template
  // second arg is obj with all our data required
  res.render('help', {
    title: 'Help',
    name: 'Elliot Kim',
    message: 'If you need help, use google!',
    createdBy: 'Created By Elliot San Kim'
  });
}); 

// url, and the function that is called once we visit the URL
// req - request, an object containing information about the incoming request to the server
// res - response, contains bunch of methods allowing us to customize what we're going to send back to the requester
app.get('/weather', (req, res) => {   
  // We will get a JSON response back
  // Express will detect we've provided an object and will automatically stringify the JSON for us and its going to get sent to the requester correctly
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error }); 
      }

      res.send({ 
        forecast: forecastData, 
        location, 
        address: req.query.address 
      });
    });
  });
});

// information from the query string, all available in the Express route handler
// which is the callback funciton below
// info on query string lives in on req (request)
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Help Error',
    errorMessage: 'Help article not found',
    createdBy: 'Created By Elliot San Kim'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404 Error',
    errorMessage: 'Page not found..',
    createdBy: 'Created By Elliot San Kim'
  });
});

// this starts up the server  
app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});