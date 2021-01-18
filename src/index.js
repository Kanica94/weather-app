let now = new Date();
function formatDate(date) {
  let dates = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
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

  let h6 = document.querySelector("#date");
  h6.innerHTML = `${day} ${dates} ${month},  ${hour}:${minutes}`;
}
console.log(formatDate(now));

//

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = city;
  let temperatureElement = document.querySelector("#mainTemp");
  temperatureElement.innerHTML = `${temperature}°C`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
  let humidity = Math.round(response.data.main.humidity);
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity: ${humidity}%`;
  let minimum = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#min");
  min.innerHTML = `${minimum}°`;
  let maximum = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#max");
  max.innerHTML = `${maximum}°`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "0864ac7dec2540b572d96a9d7503af67";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  search(city);
}

function locationButton(position) {
  let apiKey = "0864ac7dec2540b572d96a9d7503af67";
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationButton);
}

let button = document.querySelector("#location");
button.addEventListener("click", showLocation);

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

search("London");

// Switching from Celsius to Fahrenheit

function degrees(event) {
  event.preventDefault();
  let temperature = document.querySelector("#mainTemp");
  let celsius = "10°C";
  temperature.innerHTML = celsius;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", degrees);

function fahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#mainTemp");
  let fahrenheit = "50°F";
  temperature.innerHTML = fahrenheit;
}

let degree = document.querySelector("#fahrenheit");
degree.addEventListener("click", fahrenheit);
