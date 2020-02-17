// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');
const path = require('path');
const apiKey = '30345c8bb3254064fa5aa95b2598b854';
const baseUrl = 'api.openweathermap.org/data/2.5/weather?zip=';

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/weather', function(req, res) {
    let zip = req.query.zip;
    let feelings = req.query.feelings;

    projectData.push(zip);
    projectData.push(feelings);

    console.log(projectData);
    res.send('Is it hot');
})



app.get('/', (req, res) => {req.push(projectData), console.log(testing)});

const port = 8000;
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`)});
