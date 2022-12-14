// Wheather icons
const weatherIcons = {
  "01d": "fa-solid fa-sun",
  "01n": "fa-solid fa-moon",
  "02d": "fa-solid fa-cloud-sun",
  "02n": "fa-solid fa-cloud-moon",
  "03d": "fa-solid fa-cloud",
  "03n": "fa-solid fa-cloud",
  "04d": "fa-solid fa-cloud",
  "04n": "fa-solid fa-cloud",
  "09d": "fa-solid fa-cloud-rain",
  "09n": "fa-solid fa-cloud-rain",
  "10d": "fa-solid fa-cloud-showers-heavy",
  "10n": "fa-solid fa-cloud-showers-heavy",
  "11d": "fa-solid fa-cloud-bolt",
  "11n": "fa-solid fa-cloud-bolt",
  "13d": "fa-solid fa-snowflake",
  "13n": "fa-solid fa-snowflake",
  "50d": "fa-solid fa-smog",
  "50n": "fa-solid fa-smog",
};

// Current date and time
function formatDate(unixTimestamp) {
  let date = new Date(unixTimestamp);

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
  if (city === "") {
    alert("Please, type a city name...");
  } else {
    searchCity(city);
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

// Conversion

function cToF(celsius) {
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  return fahrenheit;
}
function displayFahrenheitTemp(event) {
  let tempElement = document.querySelector("#temp-digits");
  tempElement.innerHTML = cToF(temperatureC);

  let tempElementHigh = document.querySelector("#high-temp");
  tempElementHigh.innerHTML = cToF(temperatureCelsiusHigh);

  let tempElementLow = document.querySelector("#low-temp");
  tempElementLow.innerHTML = cToF(temperatureCelsiusLow);

  for (var i = 0; i <= 5; i++) {
    let forecastTempMin = document.querySelector(`#forecast-temp-min-${i}`);
    forecastTempMin.innerHTML = Math.round(cToF(forecastTemp[i].min));

    let forecastTempMax = document.querySelector(`#forecast-temp-max-${i}`);
    forecastTempMax.innerHTML = Math.round(cToF(forecastTemp[i].max));
  }

  let fahrenheitElement = document.querySelector("#fahrenheit a");
  fahrenheitElement.classList.add("active-temperature");
  let celsiusElement = document.querySelector("#celsius a");
  celsiusElement.classList.remove("active-temperature");
}

let fahr = document.querySelector("#fahrenheit");
fahr.addEventListener("click", displayFahrenheitTemp);

let temperatureC = null;
let temperatureCelsiusHigh = null;
let temperatureCelsiusLow = null;
let forecastTemp = [];

function displayCelsiusTemp(event) {
  let tempElement = document.querySelector("#temp-digits");
  tempElement.innerHTML = temperatureC;

  let tempElementHigh = document.querySelector("#high-temp");
  tempElementHigh.innerHTML = temperatureCelsiusHigh;

  let tempElementLow = document.querySelector("#low-temp");
  tempElementLow.innerHTML = temperatureCelsiusLow;

  for (var i = 0; i <= 5; i++) {
    let forecastTempMin = document.querySelector(`#forecast-temp-min-${i}`);
    forecastTempMin.innerHTML = Math.round(forecastTemp[i].min);

    let forecastTempMax = document.querySelector(`#forecast-temp-max-${i}`);
    forecastTempMax.innerHTML = Math.round(forecastTemp[i].max);
  }

  let celsiusElement = document.querySelector("#celsius a");
  celsiusElement.classList.add("active-temperature");
  let fahrenheitElement = document.querySelector("#fahrenheit a");
  fahrenheitElement.classList.remove("active-temperature");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemp);

// Weather elements

function getForecast(coordinates) {
  let apiKey = "866a208a73eeff02182218e9441647a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.sys.country;

  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "class",
    weatherIcons[response.data.weather[0].icon]
  );

  temperatureC = Math.round(response.data.main.temp);

  let currentTemp = document.querySelector("#temp-digits");
  currentTemp.innerHTML = temperatureC;

  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = response.data.weather[0].description;

  temperatureCelsiusHigh = Math.round(response.data.main.temp_max);

  let currentTempMax = document.querySelector("#high-temp");
  currentTempMax.innerHTML = temperatureCelsiusHigh;

  temperatureCelsiusLow = Math.round(response.data.main.temp_min);

  let currentTempMin = document.querySelector("#low-temp");
  currentTempMin.innerHTML = temperatureCelsiusLow;

  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;

  function convertTimestamptoTime(unixTimestamp) {
    return moment.unix(unixTimestamp).format("HH:mm");
  }

  let currentSunset = document.querySelector("#sunset");
  currentSunset.innerHTML = convertTimestamptoTime(response.data.sys.sunset);

  let currentSunrise = document.querySelector("#sunrise");
  currentSunrise.innerHTML = convertTimestamptoTime(response.data.sys.sunrise);

  getForecast(response.data.coord);
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

// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastTemp[index] = {
        min: forecastDay.temp.min,
        max: forecastDay.temp.max,
      };
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2">
          <div class="weather-forecast-day-container">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <i class="${weatherIcons[forecastDay.weather[0].icon]}"></i>
            <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max"><span id="forecast-temp-max-${index}">${Math.round(
          forecastDay.temp.max
        )}</span>?? </span>
              <span class="weather-forecast-temp-min"><span id="forecast-temp-min-${index}">${Math.round(
          forecastDay.temp.min
        )}</span>??</span>
            </div>
          </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
