function addFlight(event) {
  console.log("adding flight");
  //get data from server


  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;

  let validation = true;
  //validations
  if (from === "") {
    alert("Select Departure location");
    validation = false;
  }
  if (to === "") {
    alert("Select Destination location");
    validation = false;
  }

  if (date === "") {
    alert("Select Departure date");
    validation = false;
  }

  if (validation) {
    let todayDate = new Date();
    let departure = new Date(date);
    console.log(todayDate);
    console.log(departure);

    let daysDiff = (departure - todayDate) / (1000 * 60 * 60 * 24);
    console.log(daysDiff);


    let data = { country: "country", days: "days" };
    data.country = to;
    data.days = daysDiff;
    var flightDetails = null;
    //get weather, and pic
    fetch('http://localhost:8081/getData', {
      method: "POST",
      credentials: "same-origin",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(data),
    })
      .then(res => {
        return res.json()
      })
      .then(function (data) {
        // document.getElementById('results').innerHTML = data.message
        flightDetails = data;

        //console.log(flightDetails);
        console.log(flightDetails);
        //create flight div
        const flightDiv = document.createElement("div");
        flightDiv.className = "flights";

        //create pic div
        const picDiv = document.createElement("div");
        picDiv.className = "flightPic";
        const countryPic = document.createElement("img");
        countryPic.src = flightDetails[1];
        picDiv.appendChild(countryPic);

        //create data
        const flightDataDiv = document.createElement("div");
        const flightDataInnerDiv = document.createElement("div");
        flightDataDiv.className = "flightContainerData";
        flightDataInnerDiv.className = "flightData";
        const flightData = document.createElement("p");
        flightData.textContent = "Flight from " + from + " to " + to;
        const flightDate = document.createElement("p");
        flightDate.textContent = "Departure: " + date;
        const flightDays = document.createElement("p");
        flightDays.textContent = to + " is " + daysDiff.toFixed(0) + " days away.";
        const flightWeather = document.createElement("p");
        flightWeather.textContent = "Weather will be " + flightDetails[0] + " °F";
        flightDataInnerDiv.appendChild(flightData);
        flightDataInnerDiv.appendChild(flightDate);
        flightDataInnerDiv.appendChild(flightDays);
        flightDataInnerDiv.appendChild(flightWeather);

        //buttons
        const buttonsDiv = document.createElement("div");
        const btnRemove = document.createElement("button");
        btnRemove.type = "button"
        btnRemove.innerText = "Remove";
        btnRemove.onclick = remove;
        buttonsDiv.appendChild(btnRemove);

        const btnSave = document.createElement("button");
        btnSave.type = "button"
        btnSave.innerText = "Save";
        btnSave.onclick = function () { console.log("save offline"); };
        buttonsDiv.appendChild(btnSave);
        flightDataInnerDiv.appendChild(buttonsDiv);
        flightDataDiv.appendChild(picDiv);//.countryPic);
        flightDataDiv.appendChild(flightDataInnerDiv);



        //flightDataDiv.appendChild(btnRemove);
        //flightDiv.appendChild(picDiv);
        flightDiv.appendChild(flightDataDiv);
        //flightDiv.appendChild(flightDate);
        //flightDiv.appendChild(buttonsDiv);

        document.getElementById('main').appendChild(flightDiv);
      })
  }
}

function remove(e) {
  console.log("inside remove");
  console.log(e);
  e.path[4].remove(); //remove select fligh
  e.path[0].remove(); //remove itselft
}

export { addFlight, remove };