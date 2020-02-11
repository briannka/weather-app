// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const path = require('path');
const fileName = path.basename('/brianna.iliev/weather-app/weather-journal-app/commentOnlyJS/server.js');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', function(req, res){res.send('hello world')});
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder


app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`)});