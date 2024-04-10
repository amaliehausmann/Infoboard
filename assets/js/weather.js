const apiKey = "4d58d6f0a435bf7c5a52e2030f17682d";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&units=metric";
const myClock = document.getElementById("clock");
const myDate = document.getElementById("date");

getWeatherData();

// Opdaterer uret hvert sekund
setInterval(getDate, 1000);
getDate();

/*MODEL CODE---------------------------------------------------------------------------------------------------*/

function getWeatherData() {
  fetch(`${apiUrl}&appid=${apiKey}`)
    .then((res) => res.json())

    .then((json) => receivedWeatherData(json));
}

/*CONTROLLER CODE--------------------------------------------------------------------------------------------*/

function receivedWeatherData(weatherData) {
  // Udtræk relevante oplysninger fra API svaret
  let temperature = Math.round(weatherData.main.temp);
  let weatherIcon = weatherData.weather[0].icon;
  let weatherDescription = weatherData.weather[0].description;

  displayTemperature(temperature, weatherDescription);
  displayWeatherIcon(weatherIcon);

  // console.log(weatherData);

  // Vis vejrobservationerne i konsollen (eller du kan ændre dette til at vise dem på din webside)
}

function getDate() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let colon = ":";

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  myClock.innerText = hours + colon + minutes;

  let day = currentTime.toLocaleString("da-DK", { weekday: "long" }); // Få ugedagen som tekst på dansk
  day = day.charAt(0).toUpperCase() + day.slice(1); //uppercase første bogstav
  let date = currentTime.getDate();
  let month = currentTime.toLocaleString("da-DK", { month: "long" }); // Få måneden som tekst på dansk

  myDate.innerText = day + " " + date + ". " + month;
}

function translateWeatherDescription(description) {
  switch (description) {
    case "clear":
      return "Klar himmel";
    case "few clouds":
      return "Enkelte skyer";
    case "scattered clouds":
      return "Spredte skyer";
    case "overcast clouds":
      return "Overskyet";
    case "shower rain":
      return "Byger";
    case "light rain":
      return "Let regn";
    case "light intensity drizzle":
      return "Let støvregn";
    case "broken clouds":
      return "Delvist skyet";
    case "thunderstorm":
      return "Tordenvejr";
    case "snow":
      return "Sne";
    case "mist":
      return "Tåge";
    case "moderate rain":
      return "Moderat regn";
    default:
      return description;
  }
}

/*VIEW CODE--------------------------------------------------------------------------------------------*/

function displayTemperature(temperature, description) {
  const temperatureElement = document.getElementById("temperature");
  const descriptionElement = document.getElementById("description");

  temperatureElement.textContent = `${temperature} °C`;

  // Oversætning af vejrbeskrivelse til dansk
  const translatedDescription = translateWeatherDescription(description);
  descriptionElement.textContent = `${translatedDescription}`;
}

function displayWeatherIcon(weatherIcon) {
  const iconElement = document.getElementById("weatherIcon");

  // Mappning af vejr-ikonkoder til SVG-filnavne
  const iconMappings = {
    "01d": "clear.svg",
    "01n": "clear-night.svg",
    "02d": "few-clouds.svg",
    "02n": "few-clouds-night.svg",
    "03d": "scattered-clouds.svg",
    "03n": "scattered-clouds.svg",
    "04d": "broken-clouds.svg",
    "04n": "broken-clouds.svg",
    "09d": "shower-rain.svg",
    "09n": "shower-rain.svg",
    "10d": "rain.svg",
    "10n": "rain.svg",
    "11d": "thunderstorm.svg",
    "11n": "thunderstorm.svg",
    "13d": "snow.svg",
    "13n": "snow.svg",
    "50d": "mist.svg",
    "50n": "mist.svg",
  };

  // Hent SVG-filnavnet fra mappningen
  const iconFileName = iconMappings[weatherIcon];

  if (iconFileName) {
    const iconUrl = `assets/images/${iconFileName}`;
    iconElement.setAttribute("src", iconUrl);
  } else {
    console.error("Ukendt vejr-ikon:", weatherIcon);
  }
}
