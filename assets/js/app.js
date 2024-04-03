

// const myWeather = document.getElementById('weather');
const apiKey = '4d58d6f0a435bf7c5a52e2030f17682d'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Aalborg&units=metric';



getWeatherData();

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


