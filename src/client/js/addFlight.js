function addFlight(event) {
  console.log("adding flight");
  // const from = document.getElementById("from").value;
  // const to = document.getElementById("to").value;
  // const date = document.getElementById("date").value;

  // //create flight div
  // const flightDiv = document.createElement("div");
  // flightDiv.className = "flights";

  // //create pic div
  // //const picDiv = document.createElement("div");
  // const countryPic = document.createElement("img");
  // countryPic.src = src = "https://via.placeholder.com/200";
  // //picDiv.appendChild(countryPic);

  // //create data
  // const flightDataDiv = document.createElement("div");
  // const flightDataInnerDiv = document.createElement("div");
  // flightDataDiv.className = "flightsData";
  // const flightData = document.createElement("p");
  // flightData.textContent = "Flight from " + from + " to " + to;
  // const flightDate = document.createElement("p");
  // flightDate.textContent = "Departure: " + date;
  // const flightDays = document.createElement("p");
  // flightDays.textContent = "Days is 22";
  // const flightWeather = document.createElement("p");
  // flightWeather.textContent = "Weather would be 70f";
  // flightDataInnerDiv.appendChild(flightData);
  // flightDataInnerDiv.appendChild(flightDate);
  // flightDataInnerDiv.appendChild(flightDays);
  // flightDataInnerDiv.appendChild(flightWeather);

  // flightDataDiv.appendChild(countryPic);
  // flightDataDiv.appendChild(flightDataInnerDiv);


  // //buttons
  // const buttonsDiv = document.createElement("div");
  // const btnRemove = document.createElement("button");
  // btnRemove.type = "button"
  // btnRemove.innerText = "Remove";
  // //btnRemove.onclick = remove;
  // buttonsDiv.appendChild(btnRemove);

  // const btnSave = document.createElement("button");
  // btnSave.type = "button"
  // btnSave.innerText = "Save";
  // btnSave.onclick = function () { console.log("save offline"); };
  // buttonsDiv.appendChild(btnSave);



  // //flightDataDiv.appendChild(btnRemove);
  // //flightDiv.appendChild(picDiv);
  // flightDiv.appendChild(flightDataDiv);
  // //flightDiv.appendChild(flightDate);
  // flightDiv.appendChild(buttonsDiv);

  // document.getElementById('main').appendChild(flightDiv);
}

// function remove(e) {
//   console.log("inside remove");
//   console.log(e);
//   e.path[2].remove(); //remove select fligh
//   e.path[0].remove();
// }

export { addFlight };
//export { remove };
// /* Global Variables */
// const baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
// const apikey = "APPID=keyHere";

// let units = "&units=imperial&zip=";

// // Create a new date instance dynamically with JS
// let d = new Date();
// let month = d.getMonth() + 1; // add 1 because getMonth returns 0-11.
// let newDate = month + "." + d.getDate() + "." + d.getFullYear();

// /* Function to POST data */
// const postData = async (url = "", data = {}) => {
//   console.log(data);
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });

//   try {
//     const newData = await response.json();
//     console.log(newData);
//     return newData;
//   } catch (error) {
//     console.log("error", error);
//     // appropriately handle the error
//   }
// };

// // Async GET temperature
// const getTemperature = async (baseUrl, apikey, zipCode, units) => {
//   console.log("url = " + baseUrl + apikey + units + zipCode);
//   const res = await fetch(baseUrl + apikey + units + zipCode);
//   try {
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const updateUI = async () => {
//   const req = await fetch("/all");
//   try {
//     const allData = await req.json();
//     //update UI

//     console.log("Data from upateUI");
//     console.log(allData);
//     document.getElementById("date").innerHTML = "date: " + allData.date;
//     document.getElementById("temp").innerHTML = "temp: " + allData.temp;
//     document.getElementById("content").innerHTML =
//       "Response: " + allData.content;
//   } catch (error) {
//     console.log(error);
//   }
// };

// function doWork() {
//   const zipCode = document.getElementById("zip").value;
//   const feelings = document.getElementById("feelings").value;

//   console.log(feelings + " zip code =" + zipCode);
//   getTemperature(baseUrl, apikey, zipCode, units).then(function (data) {
//     postData("/temperature", {
//       date: newDate,
//       temp: data.main.temp,
//       content: feelings,
//     });

//     updateUI();
//   });
// }

//document.getElementById("generate").addEventListener("click", doWork);