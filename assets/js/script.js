// console.log("Hello");

// var currentWeather =
//   "https://api.openweathermap.org/data/2.5/weather?q=denver&appid=d914748315fe496635f1fbcef2e646fc";

// function getApi(currentWeather) {
//   fetch(currentWeather)
//     .then(function (response) {
//       console.log(response.status); // returns 200, success
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// }

// getApi(currentWeather);

var fiveDay =
  "https://api.openweathermap.org/data/2.5/forecast?q=denver&appid=d914748315fe496635f1fbcef2e646fc";

function getApi(fiveDay) {
  fetch(fiveDay)
    .then(function (response) {
      console.log(response.status); // returns 200, success
      return response.json();
    })
    .then(function (data) {
      console.log(data.list[0]);
    });
}

getApi(fiveDay);
