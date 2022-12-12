// Current date and time

function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayOfWeek = days[date.getDay()];

  let dayOfMonth = date.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let hours = date.getHours();
  let minutes = date.getMinutes();

  let hoursString = "";

  if (hours < 10) {
    hoursString = `0${hours}`;
  } else {
    hoursString = hours.toString();
  }

  let minutesString = "";

  if (minutes < 10) {
    minutesString = `0${minutes}`;
  } else {
    minutesString = minutes.toString();
  }

  return `${dayOfWeek} ${dayOfMonth} ${month}, ${hoursString}:${minutesString}`;
}

let now = new Date();
let h5 = document.querySelector("#current-date");
h5.innerHTML = formatDate(now);

// Submit city button listener

function searchCity(city) {
  let apiKey = "097c5d8d370b4637e523bbf17f1c01ee";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-request");
  let city = searchInput.value;
  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

// Metric/Imperial system conversion

function cToF(celsius) {
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  return fahrenheit;
}
function changeToFahrenheit(event) {
  let tempSpan = document.querySelector("#temp-digits");
  tempSpan.innerHTML = cToF(temperatureC);
  let fahrenheitElement = document.querySelector("#fahrenheit a");
  fahrenheitElement.classList.add("active-temperature");
  let celsiusElement = document.querySelector("#celsius a");
  celsiusElement.classList.remove("active-temperature");
}

let fahr = document.querySelector("#fahrenheit");
fahr.addEventListener("click", changeToFahrenheit);

let temperatureC = 23;

function changeToCelsius(event) {
  let tempSpan = document.querySelector("#temp-digits");
  tempSpan.innerHTML = temperatureC;
  let celsiusElement = document.querySelector("#celsius a");
  celsiusElement.classList.add("active-temperature");
  let fahrenheitElement = document.querySelector("#fahrenheit a");
  fahrenheitElement.classList.remove("active-temperature");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

// Weather elements

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let currentTemp = document.querySelector("#temp-digits");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = response.data.weather[0].description;

  let currentTempMax = document.querySelector("#high-temp");
  currentTempMax.innerHTML = Math.round(response.data.main.temp_max);

  let currentTempMin = document.querySelector("#low-temp");
  currentTempMin.innerHTML = Math.round(response.data.main.temp_min);

  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);

  function convertTimestamptoTime(unixTimestamp) {
    return moment.unix(unixTimestamp).format("HH:mm");
  }

  let currentSunset = document.querySelector("#sunset");
  currentSunset.innerHTML = convertTimestamptoTime(response.data.sys.sunset);

  let currentSunrise = document.querySelector("#sunrise");
  currentSunrise.innerHTML = convertTimestamptoTime(response.data.sys.sunrise);
}

searchCity("New York");

// Current geolocation

function handlePosition(position) {
  let apiKey = "097c5d8d370b4637e523bbf17f1c01ee";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function useCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let geolocation = document.querySelector("#geolocation");
geolocation.addEventListener("click", useCurrentPosition);
