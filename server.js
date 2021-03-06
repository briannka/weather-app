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

app.post("/weather", async function(req, res) {
  let zip = req.body.zip;
  let feelings = req.body.feelings;
  projectData.zip = zip;
  projectData.feelings = feelings;
  try {
    const result = await callWeatherApi(zip);
    // console.log("Result in final function: ", result);
    const { weather, main, name } = result;
    const { description } = weather[0];
    console.log({
      name,
      temperature: main.temp,
      weather: description
    });

    res.send({
      name,
      temperature: main.temp,
      weather: description,
      feelings
    });
  } catch (reason) {
    console.log("error", reason);
  }
});

app.get("/getWeather", returnJournalData);

function getWeatherURL(zip) {
  return `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`;
}

const callWeatherApi = async zip => {
  const url = getWeatherURL(zip);

  const response = await fetch(url);
  try {
    const newData = await response.json();
    console.log("Result of API: ", newData);
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
