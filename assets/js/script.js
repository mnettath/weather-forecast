// console.log("Hello");
var searchBar = document.getElementById("searchBar");
var searchButton = document.getElementById("searchButton");
var searchHistory = document.getElementById("searchHistory");
var currentForecast = document.getElementById("currentForecast");
var fiveDayForecast = document.getElementById("fiveDayForecast");

searchButton.addEventListener("click", searchWeather);

function searchWeather() {
  var cityName = document.getElementById("cityInput").value;
  addCitytoHistory(cityName);
  searchCurrentWeather(cityName);
  searchFiveDay(cityName);
}

function addCitytoHistory(cityName) {
  console.log("I am in the add city to search history");
  var userInputArray = JSON.parse(localStorage.getItem("cityInput")) || [];

  var userInput = {
    city: cityName,
  };

  userInputArray.push(userInput);

  localStorage.setItem("cityInput", JSON.stringify(userInputArray));

  searchHistory.innerHTML = null;

  for (i = 0; i < userInputArray.length; i++) {
    var searchHistoryCity = document.createElement("button");

    searchHistoryCity.textContent = userInputArray[i].city;
    // everytime a search history button is clicked, we will go into this function
    // puts the text content of the search history button through the searchCurrentWeather and searchFiveDay functions
    searchHistoryCity.addEventListener("click", function () {
      // clears the previous currentForecast and fiveDayForecast searched for
      currentForecast.innerHTML = "";
      fiveDayForecast.innerHTML = "";
      var selectedCity = this.textContent;
      searchCurrentWeather(selectedCity);
      searchFiveDay(selectedCity);
    });
    searchHistory.append(searchHistoryCity);
  }
}

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
      currentForecast.innerHTML = "";
      console.log(data);
      var cityName = document.createElement("h3");
      cityName.textContent = data.name;
      currentForecast.append(cityName);

      var icon = document.createElement("img");
      icon.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      currentForecast.append(icon);

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
      fiveDayForecast.innerHTML = "";
      console.log(data);
      var cityName = document.createElement("h3");
      cityName.textContent = data.city.name;
      fiveDayForecast.append(cityName);

      for (var i = 0; i < data.list.length; i++) {
        var date = new Date(data.list[i].dt * 1000);
        // convert timestamp to date
        if (
          date.getHours() === 12 &&
          date.getMinutes() === 0 &&
          date.getSeconds() === 0
        ) {
          var dateElement = document.createElement("h4");
          dateElement.textContent = date;
          fiveDayForecast.append(dateElement);
          // need to display the date

          var icon = document.createElement("img");
          icon.setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" +
              data.list[i].weather[0].icon +
              "@2x.png"
          );
          fiveDayForecast.append(icon);

          var temp = document.createElement("p");
          temp.textContent = "Temperature: " + data.list[i].main.temp + " °F";
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
      }
    });
}
