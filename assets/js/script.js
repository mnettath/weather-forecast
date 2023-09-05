// console.log("Hello");

var searchButton = document.getElementById("searchButton");
var currentForecast = document.getElementById("currentForecast");
var fiveDayForecast = document.getElementById("fiveDayForecast");

searchButton.addEventListener("click", searchWeather);

function searchWeather() {
  var cityName = document.getElementById("cityInput").value;
  console.log(cityName);

  // clears the previous currentForecast searched for
  currentForecast.innerHTML = "";

  searchCurrentWeather(cityName);
  searchFiveDay(cityName);
  // this function searches for the current weather based on what the user inputs
  function searchCurrentWeather(cityName) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d914748315fe496635f1fbcef2e646fc&units=imperial`; // must use backticks so that cityName will be placed in the apiUrl when user hits submit
    fetch(currentWeatherUrl)
      .then(function (response) {
        console.log(response.status);
        // returns a 200 which means it was a success
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var cityName = document.createElement("h3");
        cityName.textContent = data.name;
        currentForecast.append(cityName);
        // need to display the date
        var temp = document.createElement("p");
        temp.textContent = "Current Temperature: " + data.main.temp + " °F";
        currentForecast.append(temp);

        var humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + data.main.humidity + "%";
        currentForecast.append(humidity);

        var windSpeed = document.createElement("p");
        windSpeed.textContent = "Wind speed: " + data.wind.speed + " mph";
        currentForecast.append(windSpeed);
      });
  }

  function searchFiveDay(cityName) {
    const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d914748315fe496635f1fbcef2e646fc&units=imperial`; // must use backticks so that cityName will be placed in the apiUrl when user hits submit
    fetch(fiveDayUrl)
      .then(function (response) {
        console.log(response.status);
        // returns a 200 which means it was a success
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var cityName = document.createElement("h3");
        cityName.textContent = data.city.name;
        fiveDayForecast.append(cityName);

        for (var i = 0; i < data.list.length; i++) {
          var date = new Date(data.list[i].dt * 1000);
          // convert timestamp to date
          var dateElement = document.createElement("h4");
          dateElement.textContent = date;
          fiveDayForecast.append(dateElement);
          // need to display the date
          var temp = document.createElement("p");
          temp.textContent =
            "Current Temperature: " + data.list[i].main.temp + " °F";
          fiveDayForecast.append(temp);

          var humidity = document.createElement("p");
          humidity.textContent =
            "Humidity: " + data.list[i].main.humidity + "%";
          fiveDayForecast.append(humidity);

          var windSpeed = document.createElement("p");
          windSpeed.textContent =
            "Wind speed: " + data.list[i].wind.speed + " mph";
          fiveDayForecast.append(windSpeed);
        }
      });
  }
}

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
