

// const myWeather = document.getElementById('weather');


getWeatherData();

/*MODEL CODE---------------------------------------------------------------------------------------------------*/

function getWeatherData() {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric')

        .then(res => res.json())

        .then(json => receivedWeatherData(json));
}

/*CONTROLLER CODE--------------------------------------------------------------------------------------------*/

function receivedWeatherData(weatherData) {

    // Udtræk relevante oplysninger fra API svaret
    let temperature = weatherData.main.temp;
    let weatherDescription = weatherData.weather[0].description;

    displayTemperature(temperature);
    displayWeatherIcon(weatherDescription);

    // Vis vejrobservationerne i konsollen (eller du kan ændre dette til at vise dem på din webside)
    console.log("Temperatur: " + temperature + " °C");
    console.log("Beskrivelse: " + weatherDescription);

}



/*VIEW CODE--------------------------------------------------------------------------------------------*/


