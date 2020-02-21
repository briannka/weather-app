// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const path = require("path");
const apiKey = "30345c8bb3254064fa5aa95b2598b854";
const baseUrl = "api.openweathermap.org/data/2.5/weather?zip=";
const fetch = require("node-fetch");
const cors = require("cors");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.post("/weather", function(req, res) {
  let zip = req.body.zip;
  let feelings = req.body.feelings;
  projectData.zip = zip;
  projectData.feelings = feelings;
  callWeatherApi(zip)
    .then(function(temp) {
      res.send({
        zip: zip,
        temperature: temp.main.temp,
        feelings: feelings
      });
    })
    .catch(function(reason) {
      console.log("error", reason);
    });
});

app.get("/weather", returnJournalData);

function getWeatherURL(zip) {
  return `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`;
}

const callWeatherApi = async zip => {
  const url = getWeatherURL(zip);

  const response = await fetch(url);
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error:", error);
  }
};

function returnJournalData(req, res) {
  res.send(projectData);
}

const port = 8000;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});
