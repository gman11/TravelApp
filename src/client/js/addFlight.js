var index = 1;
function addFlight(event) {
  console.log("adding flight");
  //get data from server
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").valueAsDate;

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
        flightDetails = data;

        //console.log(flightDetails);
        console.log(flightDetails);


        var htmlInput = `<div class="flightContainer">
          <div class="picture">
            <img src="${flightDetails[1]}" alt="Destination Picture">
          </div>
          <div class="details">
            <div class="flightInfo">
              <ul>
                <li>Fligh from ${from} to ${to}</li>
                <li>Departure date  ${date.toLocaleDateString()} </li>
                <li>Your flight is in ${daysDiff.toFixed(0)} days</li>
                <li>Weather will be  ${flightDetails[0]}°F</li>
                <li><button id="remove_${index}" class="remove">Remove</button></li>
              </ul>
            </div>
          </div>
        </div>`;

        var main = document.getElementById('main');
        main.insertAdjacentHTML("afterbegin", htmlInput);

        var button = document.getElementById("remove_" + index);
        button.onclick = remove;

        index = index + 1;

      })
  }
}

function remove(e) {
  console.log("inside remove");
  console.log(e);
  console.log("thuis");
  console.log(this);
  e.path[5].remove(); //remove select fligh
  e.path[0].remove(); //remove itselft
}

export { addFlight, remove };