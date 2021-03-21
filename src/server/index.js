const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
var path = require("path");
const express = require("express");
const fetch = require('node-fetch');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
const { text } = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

var Buffer = require('buffer/').Buffer
// Setup Server
const port = 8081;

const server = app.listen(port, listening);
function listening() {
  console.log("server running at port " + port);
}



app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

let tripData = [];

///get cordinates of requestedc place
///Parmans:  country  
const getCordinates = async (country) => {
  console.log("inside getCordinates" + country);
  const url = 'http://api.geonames.org/searchJSON?q=' + country + '&maxRows=10&username=' + process.env.API_ID;
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit

  });
  const data = await response.json();
  return data;
};
///get weather data
///param:  latitude, longitute, and daysDiff
const getWeather = async (lat, lng, daysDiff) => {
  console.log("insde weather " + lat + " " + lng + " " + daysDiff);
  let baseWeatherUrl = 'https://api.weatherbit.io/v2.0/current?'
  // ˚  console.log(daysDiff);
  if (daysDiff > 7) {

    baseWeatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
  }
  baseWeatherUrl = baseWeatherUrl + 'lat=' + lat + '&lon=' + lng + '&units=I&key=' + process.env.Weather_API;
  const response = await fetch(baseWeatherUrl, {
    method: "GET",
    credentials: "same-origin",
  });
  const data = await response.json();
  return data;
};
///get Picture
//Params: country
const getPicture = async (country) => {
  console.log("inside picture " + country);
  let pixUrl = `https://pixabay.com/api/?key=${process.env.Pixabay_API}&q=${country}+city&image_type=photo&pretty=true&min_width=640`;
  const response = await fetch(pixUrl, {
    method: "GET",
    credentials: "same-origin",
  });
  const data = await response.json();
  return data;
};

async function getAllData(req, res) {
  try {

    //clear trypdata
    tripData = [];

    let cordinates = await getCordinates(req.body.country);
    console.log(cordinates);

    //get weather
    let weather = await getWeather(cordinates.geonames[0].lat, cordinates.geonames[0].lng, req.body.days);
    console.log(weather);
    //push weather data
    let days = req.body.days;

    if (days > 7) {
      // Push the last day of the forecast
      tripData.push(weather.data[15].temp);
    } else {
      tripData.push(weather.data[0].temp);
    }

    //get pic
    let picture = await getPicture(req.body.country);
    console.log(picture);

    try {

      let pic = picture.hits[0].webformatURL;
      tripData.push(pic);

    } catch {
      tripData.push("https://via.placeholder.com/150");
    }

    res.json(tripData);
  }
  catch (err) {
    console.log("something bad happen");
  }

}
//enable this export for jtest
module.exports = { getPicture };

app.post("/getData", getAllData);