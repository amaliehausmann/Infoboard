const myClock = document.getElementById('clock');
const myDate = document.getElementById('date');

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
// Opdaterer uret hvert sekund
setInterval(getDate, 1000);

getDate();