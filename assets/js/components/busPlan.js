import { myFetch } from "../utils/apiUtils.js";

/**
 * busPlan component
 */
export const busPlan = async () => {
  const container = document.getElementById("bus");
  container.innerHTML = "";

  const endpoint =
    "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1";
  const apiData = await myFetch(endpoint);
  const slicedData = apiData.MultiDepartureBoard?.Departure.slice(0, 5);

  const ul = document.createElement("section");
  const liLine = document.createElement("p");
  liLine.innerText = "Linje";
  const liStop = document.createElement("p");
  liStop.innerText = "Stop";
  const liTime = document.createElement("p");
  liTime.innerText = "Tid";

  ul.append(liLine, liStop, liTime);
  container.append(ul);

  /**
   * LOOP
   */
  if (slicedData) {
    slicedData.map((value, index) => {
      const ul = document.createElement("section");
      ul.classList.add("busPlan");
      ul.className = 'busPlan';

      const liLine = document.createElement("p");
      liLine.innerText = value.line;
      liLine.className = 'line';

      const liStop = document.createElement("p");
      liStop.innerText = value.stop;
      liStop.className = 'stop';

      const liTime = document.createElement("p");
      liTime.className = 'timestamp';
      liTime.innerText = calcRemainingTime(`${value.date} ${value.time}`);

      ul.append(liLine, liStop, liTime);
      //   console.log(value.name, index);
      container.append(ul);
    });
  }
  setTimeout(busPlan, 30000);
};

const calcRemainingTime = (departureTime) => {
  const currentTimeStamp = new Date().getTime();

  const arrayDepartureTime = departureTime.split(/[.: ]/);

  const departureYear = new Date().getFullYear();
  const departureMonth = parseInt(arrayDepartureTime[1], 10) - 1;
  const departureDay = parseInt(arrayDepartureTime[0]);
  const departureHours = parseInt(arrayDepartureTime[3]);
  const departureMinutes = parseInt(arrayDepartureTime[4]);

  const departureTimeStamp = new Date(
    departureYear,
    departureMonth,
    departureDay,
    departureHours,
    departureMinutes
  ).getTime();

  const differenceSeconds = Math.abs(
    Math.floor((departureTimeStamp - currentTimeStamp) / 1000)
  );
  const differenceHours = Math.floor(differenceSeconds / 3600);
  const differenceMinutes = Math.floor(differenceSeconds / 60);
  return differenceHours
    ? `${differenceHours} t ${differenceMinutes} m`
    : `${differenceMinutes} m`;
};
