

// const myWeather = document.getElementById('weather');
const apiKey = '4d58d6f0a435bf7c5a52e2030f17682d'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Aalborg&units=metric';
const myClock = document.getElementById('clock');
const myDate = document.getElementById('date');

getWeatherData();

// Opdaterer uret hvert sekund
setInterval(getDate, 1000);
getDate();

/*MODEL CODE---------------------------------------------------------------------------------------------------*/

function getWeatherData() {

    fetch(`${apiUrl}&appid=${apiKey}`)


        .then(res => res.json())

        .then(json => receivedWeatherData(json));
}

/*CONTROLLER CODE--------------------------------------------------------------------------------------------*/

function receivedWeatherData(weatherData) {

    // Udtræk relevante oplysninger fra API svaret
    let temperature = weatherData.main.temp;
    let weatherIcon = weatherData.weather[0].icon;


    displayTemperature(temperature);
    displayWeatherIcon(weatherIcon);

    // Vis vejrobservationerne i konsollen (eller du kan ændre dette til at vise dem på din webside)

}

function getDate() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    myClock.innerText = hours + ":" + minutes + ":" + seconds;

    let day = currentTime.toLocaleString('default', { weekday: 'long' }); // Få ugedagen som tekst
    let date = currentTime.getDate();
    let month = currentTime.toLocaleString('default', { month: 'long' });

    myDate.innerText = day + " | " + date + ". " + month;

}

/*VIEW CODE--------------------------------------------------------------------------------------------*/

function displayTemperature(temperature) {
    const temperatureElement = document.getElementById('temperature');
    temperatureElement.textContent = `Temperatur: ${temperature} °C`;
}

function displayWeatherIcon(weatherIcon) {
    const iconElement = document.getElementById('weatherIcon');

    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`

    iconElement.setAttribute('src', iconUrl);

}


