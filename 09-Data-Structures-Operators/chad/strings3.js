'use strict';

//Output desired - right aligned

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

let flightArr = [];
let status, origination, destination, time, displayLine;
let maxLen = 0;

const getAirport = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  [status, origination, destination, time] = flight.split(';');
  status = status.replaceAll('_', ' ').trim().replace('Delayed', '🔴 Delayed');
  origination = getAirport(origination);
  destination = getAirport(destination);
  time = time.replace(':', 'h');
  displayLine = `${status} from ${origination} to ${destination} (${time})`;
  flightArr.push(displayLine);
  maxLen = displayLine.length > maxLen ? displayLine.length : maxLen;
}

for (let i = 0; i < flightArr.length; i++) {
  console.log(flightArr[i].padStart(maxLen));
}
