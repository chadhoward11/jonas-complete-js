'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////
// EXAMPLE 1
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); //using destructuring
//     console.log(data);

//     const html = `
// <article class="country">
// <img class="country__img" src=${data.flag} />
// <div class="country__data">
//   <h3 class="country__name">${data.name}</h3>
//   <h4 class="country__region">${data.region}</h4>
//   <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
//     1
//   )}M</p>
//   <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//   <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
// </div>
// </article>
// `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// EXAMPLE 2
//
// Nested callback to find neighbor of first country
// **Leads to Callback Hell**

// const getCountryAndneighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); //using destructuring
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     // Different URL - (v2/alpha/)
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();

//     // Render country 2
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText); //no destructuring on data.borders
//       console.log(data2);

//       // Render country 1
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndneighbour('portugal');

//
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// EXAMPLE 3 - fetch & promises
//
// Old way from above examples
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

// New way with fetch
// const request = fetch(`https://restcountries.eu/rest/v2/name/usa`, {
//   method: 'GET',
// });
// console.log(request);

// const getCountryData = function (country) {
//   const data = fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => response.json()) //response.json() returns a promise, need then
//     .then(data => renderCountry(data[0]));
// };

// getCountryData('usa');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// EXAMPLE 4 - chaining promises - get neighbor country
//
// const getCountryData = function (country) {
//   const data = fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(
//       response => response.json()
//       // use .catch at the end of promise chain
//       // err => console.log(`----ERROR first country lookup 🔥🔥--${err}`)
//     ) //NOTE: implied return, returns promise, which is the API (URL) data
//     .then(data => {
//       //data is the fulfilled value of the promise we're handling...response.json() object in this case.
//       console.log(data[0]); //data is an array of one item, which is entire object
//       renderCountry(data[0]); //passing in the countries object
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return; // Jonas placeholder--this doesn't actually work

//       // Country 2
//       // Need explicit return since arrow func is multi-line //see .then(data =>
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     //response2 is the fulfilled value (return) of the promise that we're handling (API response above)
//     .then(
//       response2 => response2.json()
//       // use .catch at the end of promise chain
//       // err => console.log(`---Neighbour country lookup---${err} 🔥🔥`)
//     )
//     //implicit return -- response2.json returns promise, need another .then here;
//     .then(
//       data2 => renderCountry(data2, 'neighbour')
//       // use .catch at the end of promise chain
//       // err => console.log(`----ERROR in renderCountry 🔥🔥--${err}`)
//     )
//     .catch(err => console.log(`${err} 🔥🔥`)); //catches any error in the promise chain
// };

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// EXAMPLE 5 - use .catch block,
// remove err callback in each '.then',
// and remove comments

// const getCountryData = function (country) {
//   const data = fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       // new Error is still handled by .catch, and promise is rejected
//       // Explicit return
//       return response.json();
//     })
//     .then(data => {
//       console.log(data[0]); //data is an array of one item, which is entire object
//       renderCountry(data[0]); //passing in the countries object
//       const neighbour = data[0].borders[0];

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response2 => response2.json())
//     .then(data2 => renderCountry(data2, 'neighbour'))
//     .catch(err => {
//       //catch also returns a promise
//       console.error(`${err} 🔥🔥`); //catches any error in the promise chain
//       renderError(`Something went wrong, try again. 🔥🔥 ${err.message}.`);
//     })
//     .finally(() => {
//       //hide loading spinner, etc.
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// EXAMPLE 6 - refactor with getJSON function
//

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src=${data.flag} />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}M</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;  //handled in the .finally block
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;  //handled in the .finally block
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    console.log(response);
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      console.log(data[0]); //data is an array of one item, which is entire object
      renderCountry(data[0]); //passing in the countries object
      const neighbour = data[0].borders[0];
      // const neighbour = 'asdf';
      if (!neighbour) throw new Error('No neighbor found');
      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then(data2 => renderCountry(data2, 'neighbour'))
    .catch(err => {
      //catch also returns a promise
      console.error(`${err} 🔥🔥`); //catches any error in the promise chain
      renderError(`Something went wrong, try again. 🔥🔥  
      -->${err.message}.`);
    })
    .finally(() => {
      //hide loading spinner, etc.
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});
