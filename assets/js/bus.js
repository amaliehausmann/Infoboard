function displayDepartureInfo() {
  fetch(
    "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1"
  )
    .then((response) => response.json())
    .then((data) => {
      const departures = data.MultiDepartureBoard.Departure;
      const departureInfoContainer = document.getElementById("departureInfo");

      departures.forEach((departure) => {
        const name = departure.name;
        const stop = departure.stop;
        const time = departure.time;
        const date = departure.date;
        const line = departure.line;
        const messages = departure.messages;
        const finalStop = departure.finalStop;

        const departureDiv = document.createElement("div");
        departureDiv.innerHTML = `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Stop:</strong> ${stop}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Line:</strong> ${line}</p>
          <p><strong>Messages:</strong> ${messages}</p>
          <p><strong>Final Stop:</strong> ${finalStop}</p>
          <hr>
        `;
        departureInfoContainer.appendChild(departureDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

displayDepartureInfo();
