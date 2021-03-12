'use strict';

let geo = {};

const whereAmI = function (lat, lng) {
  const url = `https://geocode.xyz/${lat},${lng}?geoit=json`;

  fetch(url)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);

      return response.json();
    })
    .then(data => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      console.log(`----data.country: `, data.country); //this works
      // return data; //how do I get the entire data object into a global var?
      // if I use setTimeout outside this func in attempt to "wait" until the data is returned, the global var still shows empty or undefined.

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    // India finds 2 countries for some reason, need data[1] instead of data[0]
    .then(data => console.log(data[data.length - 1])) //logging to console instead of full renderCountry func from prev lecture
    .catch(err => console.error(`Error caught by catch - ${err.message} 🔥🔥`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
// cannot 'return' an async to external var?
//

// Coordinates 1: 52.508, 13.381 (Latitude, Longitude) Berlin, Germany
// Coordinates 2: 19.037, 72.873 // Mumbai, India
// Coordinates 3: -33.933, 18.474 // Cape Town, Africa
