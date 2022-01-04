//Display user date
function displayDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let userDay = document.querySelector("#user-day-time");
let now = new Date();
userDay.innerHTML = displayDate(now);

function displayWeather(response) {
  console.log(response);
  document.querySelector(
    "#user-city"
  ).innerHTML = `Current Conditions in ${response.data.name}`;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#wind-speed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/hr`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
}

function searchCity(city) {
  let apiKey = "1fad0a2b796c76984806752d55e86c73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function searchCoordinates(position) {
  let apiKey = "1fad0a2b796c76984806752d55e86c73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCoordinates);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", inputCity);

let currentLocation = document.querySelector("#current-location-btn");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("New York");
