//http://api.geonames.org/searchJSON?q=london&maxRows=10&username=gman9911
//get country picture from API
//calculate days to trip
//get weather prediction for the date from API
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));


// Setup Server
const port = 8081;

const server = app.listen(port, listening);
function listening() {
  console.log("server running at port " + port);
}

const weather = [];

//get route
app.get("/all", (request, response) => {
  const last = weather.length;
  response.send(weather[last - 1]); //get last entry
  console.log(weather);
});

//post route
app.post("/temperature", addTemp);

function addTemp(req, res) {
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  console.log(newEntry);

  weather.push(newEntry);

  res.json(weather);
}
