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



const getData = async (req, res) => {
  console.log("getting cordinates");
  let country = req.body.country;
  let daysDiff = req.body.days;


  let baseWeatherUrl = 'https://api.weatherbit.io/v2.0/current?'
  // ˚  console.log(daysDiff);
  if (daysDiff > 7) {

    baseWeatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
  }

  //clear trypdata
  tripData = [];
  //post route
  const urlTest = 'http://api.geonames.org/searchJSON?q=' + country + '&maxRows=10&username=' + process.env.API_ID;


  const response = await fetch(urlTest, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    // headers: {
    //   "Content-Type": "application/json",
    // },
    //body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(data => {

      let lat = data.geonames[0].lat;
      let lng = data.geonames[0].lng;

      baseWeatherUrl = baseWeatherUrl + 'lat=' + lat + '&lon=' + lng + '&units=I&key=' + process.env.Weather_API;
      const response = fetch(baseWeatherUrl, {
        method: "GET",
        credentials: "same-origin",
      }).then(response => response.json())
        .then(data => {
          //res.json(data);
          tripData.push(data.data[0].temp);
          //get picture
          let pixUrl = 'https://pixabay.com/api/?key=' + process.env.Pixabay_API + '&q=' + country + '+city&image_type=photo&pretty=true';
          const response = fetch(pixUrl, {
            method: "GET",
            credentials: "same-origin",
          }).then(response => response.json())
            .then(data => {

              try {
                let pic = data.hits[0].webformatURL;
                tripData.push(pic);

              } catch {
                tripData.push("https://via.placeholder.com/150");

              }


              res.json(tripData);

            });

        });

    });

}
app.post("/getData", getData);