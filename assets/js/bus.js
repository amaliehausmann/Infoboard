// INTERN KLOKKE TIL TIDSUDREGNING AF BUSTIDER
function logCurrentTime() {
  setInterval(() => {
    const currentTime = new Date();
    console.log("Current time:", currentTime.toLocaleTimeString());
    // Refresh departure info after logging current time
    displayDepartureInfo();
  }, 1000); // Log current time every second
}

logCurrentTime();

// VIS BUSTIDER
// Ting, som skal bruges: Busstop, Busankomststidspunkt, Busnummer, Beskeder
function displayDepartureInfo() {
  fetch(
    "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1"
  )
    .then((response) => response.json())
    .then((data) => {
      const departures = data.MultiDepartureBoard.Departure;
      const departureInfoContainer = document.getElementById("departureInfo");

      const currentTime = new Date();
      let displayedCount = 0;

      // Clear previous departure info before updating
      departureInfoContainer.innerHTML = '';

      departures.forEach((departure) => {
        if (displayedCount >= 5) return; // Exit loop if 5 buses have been displayed

        const departureTime = new Date(departure.date + " " + departure.time);
        const timeDifference = Math.floor((departureTime - currentTime) / 1000); // Difference in seconds

        if (timeDifference > 0) {
          const stop = departure.stop;
          const line = departure.line;
          const messages = departure.messages;

          // Convert time difference to hours and minutes
          const hours = Math.floor(timeDifference / 3600);
          const minutes = Math.floor((timeDifference % 3600) / 60);

          let timeString = '';
          if (hours > 0) {
            timeString = `${hours} time${hours > 1 ? 'r' : ''} `;
          }
          timeString += `${minutes} minut${minutes > 1 ? 'ter' : ''}`;

          const departureDiv = document.createElement("div");
          departureDiv.innerHTML = `
            <p><img src="./assets/images/bus-icon-svgrepo-com.svg" alt=""> ${line}</p>
            <p>${stop}</p>
            <p>${timeString}</p>
            ${messages !== "0" ? `<p><strong>BEMÆRK:</strong> ${messages}</p>` : ''}
            <hr>
          `;
          departureInfoContainer.appendChild(departureDiv);

          displayedCount++;
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call displayDepartureInfo function initially
displayDepartureInfo();

// Refresh data every minute
setInterval(displayDepartureInfo, 60 * 1000); // 60 seconds in milliseconds