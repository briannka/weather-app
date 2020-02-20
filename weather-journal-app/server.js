// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');
const path = require('path');
const apiKey = '30345c8bb3254064fa5aa95b2598b854';
const baseUrl = 'api.openweathermap.org/data/2.5/weather?zip=';
const fetch = require('node-fetch');

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




app.get('/weather/:zip/:feelings', function(req, res) {
    let zip = req.params.zip;
    let feelings = req.params.feelings;
    projectData.push({zip: zip, feelings: feelings});
    callWeatherApi(zip).then(function(temp){
        console.log('temperature', temp.main.temp);
        res.send({
            zip: zip,
            temperature: temp.main.temp,
            feelings: feelings
        }); 
    }).catch(function(reason) {
        console.log('error', reason);
    });
})

// }

function getWeatherURL(zip) {
    return `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`;
}

const callWeatherApi = async (zip) => {
    const url = getWeatherURL(zip);
    const response = await fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error:', error);
    }
}


// Setup Server

const port = 8000;
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`)});
