// Require Express to run server and routes
const express = require("express");
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

const port = 8888;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});