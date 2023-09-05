// console.log("Hello");

var forecastContainer = document.getElementById("forecast");

var currentWeather =
  "https://api.openweathermap.org/data/2.5/weather?q=denver&appid=d914748315fe496635f1fbcef2e646fc&units=imperial";
// only works when looking up one word cities

function getApi(currentWeather) {
  fetch(currentWeather)
    .then(function (response) {
      console.log(response.status); // returns 200, success
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cityName = document.createElement("h3");
      cityName.textContent = data.name;
      forecastContainer.append(cityName);
      // need to display the date
      var temp = document.createElement("p");
      temp.textContent = "Current Temperature: " + data.main.temp + " °F";
      forecastContainer.append(temp);

      var humidity = document.createElement("p");
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
      forecastContainer.append(humidity);

      var windSpeed = document.createElement("p");
      windSpeed.textContent = "Wind speed: " + data.wind.speed + " mph";
      forecastContainer.append(windSpeed);
    });
}

getApi(currentWeather);

// var fiveDay =
//   "https://api.openweathermap.org/data/2.5/forecast?q=denver&appid=d914748315fe496635f1fbcef2e646fc&units=imperial";

// function getApi(fiveDay) {
//   fetch(fiveDay)
//     .then(function (response) {
//       console.log(response.status); // returns 200, success
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data.list);
//       for (var i = 0; i < data.list.length; i++) {
//         var date = document.createElement("h3");
//         date.textContent = data.list[i].dt_txt;
//         forecastContainer.append(date);
//         var temp = document.createElement("p");
//         temp.textContent = data.list[i].main.temp;
//         date.append(temp);
//       }
//     });
// } // returns temp for every 3 hours

// getApi(fiveDay);
