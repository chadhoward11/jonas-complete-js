'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

//////////////////////////////////////////////////////////////////
// Code Challenge #2 - Section 16 Asynchronous
// const imgContainer = document.querySelector('.images');

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve, _) {  //don't need reject in this one
//     setTimeout(resolve, seconds * 1000);  //resolve is the callback func name
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found (chad)...')); //becomes error message
//     });
//   });
// };

// let currentImage;
// createImage('img/img-2.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log(`Image number ${img.src.slice(-5, -4)} loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-3.jpg')
//       .then(img => {
//         currentImage = img;
//         console.log(`Image number ${img.src.slice(-5, -4)} loaded`);
//         return wait(2);
//       })
//       .then(() => (currentImage.style.display = 'none'));
//   })
//   .catch(err => console.error(`Something is broken...${err}`));

//
//
//////////////////////////////////////////////////////////////////
// Notes - Async Await
// const whereAmI = async function (country) {
//   //this still returns the 'ReadableStream' in the object, use response.json(),
//   // which returns another promise.  So a second await is below this.
//   const response = await fetch(
//     `https://restcountries.eu/rest/v2/name/${country}`
//   );
//   console.log(`----await--ReadableStream:`);
//   console.log(response);

//   //response.json returns promise, so need another 'await' (or chain .then)
//   const [data] = await response.json(); //returns array of 1 object, so destructuring
//   renderCountry(data);

//   console.log(`----await: data object:`);
//   console.log(data); //if we don't destructure above, then use data[0]
// };

///////////////////////
// Example 2 - chain .then to return the res.json() 'promise' that await will get
//
// Seems messy, but showing that it can be done.
// const whereAmI2 = async function (country) {
//   const response = await fetch(
//     `https://restcountries.eu/rest/v2/name/${country}`
//   ).then(res2 => res2.json());
//   console.log(`----await-option2--response[0].name:`);
//   console.log(response[0].name);
// };

// Async-Await is only syntactic sugar for .then
//
// Above await syntax exactly the same as:
// fetch(`https://restcountries.eu/rest/v2/name/usa`).then(response => {
//   console.log(`----plain fetch.then: `);
//   console.log(response);
// });

// Logging different items to see the order they appear in the log
// console.log (not async) will always show up first.
// The rest show up in the order they complete...depends on response speed etc.
//
// setTimeout(() => console.log(`----setTimeout log`), 5000);
// whereAmI('usa');
// console.log(`----regular console.log`);

//
//
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//
// .then with Geocoding example
//

// const getPosition = function () {
//   navigator.geolocation.getCurrentPosition(position => {
//     const { latitude, longitude } = position.coords;
//     console.log(latitude, longitude);
//     console.log(pos);
//   });
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI3 = async function () {
//   getPosition()
//     .then(position => {
//       const { latitude: lat, longitude: lng } = position.coords; //destructure object

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`); //get data, returns promise
//     })
//     .then(resp => resp.json()) //response from promise; resp.json() returns promise
//     .then(data => {
//       //data is the response from resp.json() promise
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(resp => resp.json())
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.error(`Something broke man ${err}`);
//       renderError(`🔥 ${err.message}`);
//     });
// };

//whereAmI3();

//
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//
// Async Await with Try-Catch
//
// const getPosition4 = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI4 = async function () {
//   try {
//     // Geolocation
//     const position = await getPosition4();
//     const { latitude: lat, longitude: lng } = position.coords;

//     // Reverse geocoding
//     const geoResp4 = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json`
//     );
//     if (!geoResp4.ok) throw new Error('Problem getting geolocation data');

//     const geoData4 = await geoResp4.json(); //also returns promise, so await

//     // Country data
//     const countryResp4 = await fetch(
//       `https://restcountries.eu/rest/v2/name/${geoData4.country}`
//     );
//     if (!countryResp4.ok)
//       throw new Error('Problem getting country, possible throttle');

//     const countryData4 = await countryResp4.json();
//     //could also destructure to [countryData4] above
//     renderCountry(countryData4[0]);

//     return countryData4[0];
//   } catch (err) {
//     console.error(`🔥 ${err}`);
//     renderError(`🔥🔥 - ${err.message}`);
//     // Reject promise and re-throw error so we can catch it outside this func
//     throw err;
//   }
// };
//
// AN ASYNC FUNC ALWAYS RETURNS A PROMISE
// if you console.log just the whereAmI() func you'll see only the Promise
// Using .then .catch is not great, but works -- use IIFE below
//
// whereAmI4()
//   .then(countryData4 => console.log(countryData4))
//   .catch(err => console.err(`${err.message}`));

// // Create IIFE (immediately invoked function expression)
// // to convert above to async await model instead of .then
// // --create the func in parens, then call it () immediately.
// (async function () {
//   try {
//     const outsideData4 = await whereAmI4();
//     console.log(`---IIFE function---`);
//     console.log(outsideData4);
//   } catch (err) {
//     console.error(`🔥 ${err}`);
//     renderError(`🔥🔥 - ${err.message}`);
//   }
//   console.log(`Finished getting data`);
// })();

// whereAmI4();
// whereAmI4();
// whereAmI4();

//
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//
// Promise.all
//
// const capitalCities = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]);
//     console.log(data);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// capitalCities('portugal', 'canada', 'tanzania');

//
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//
// Promise.all - pull out data with IIFE
//
// const capitalCities = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]);

//     console.log(data);
//     console.log(data.map(d => d[0].capital));
//     //
//     const capArr = data.map(d => d[0].capital);
//     return capArr;
//     //
//   } catch (err) {
//     console.error(err);
//   }
// };

// (async function () {
//   try {
//     const myCapitals = await capitalCities('portugal', 'canada', 'tanzania');
//     const [cap1, cap2, cap3] = myCapitals;
//     //
//     console.log(`cap1: ${cap1}`);
//     console.log(`cap2: ${cap2}`);
//     console.log(`cap3: ${cap3}`);
//     //
//   } catch (err) {
//     console.log(`🔥⚡ ${err}`);
//   }
// })();

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//
// Promise Combinators: race, allSettled, any
// ** Promise.all and .race are by far most common **
//
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//     getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

///////////////////////////////
// Promise.race is commonly used to race against a 'timeout'
// to protect against poor internet connections, etc.
// .race returns the first response, whether resolved or rejected
// .any will return the first resolved, ignores rejected
//
// const timeout = function (sec) {
//   return new Promise(function (resolve, reject) {
//     //could use _ instead of resolve
//     setTimeout(function () {
//       reject(new Error('🕓took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//   timeout(0.9),
// ])
//   .then(res => console.log(res[0])) //could use 'data' as var too, doesn't matter
//   .catch(err => console.error(err));

///////////////////////////////
// Promise.allSettled
// --takes in array of promises, return array of all settled
// --never short circuits
//
// Promise.all will short circuit if as soon as one promise rejects
//
// Simple example using Promise.resolve so we don't have to wait
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ]).then(res => console.log(res));

// // Compare to Promise.all - short circuits to reject as soon as one rejects
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// Promise.any [ES2021] - returns first fulfilled promise (resolve)
// -- unless all reject, then returns error 'All promises were rejected'
// .race returns the first response period, whether resolved or rejected
// .any will return the first resolved, ignores rejected
// Promise.any([
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//
// Coding Challenge #3

const imgContainer = document.querySelector('.images');

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve, _) {
    //don't need reject in this one
    setTimeout(resolve, seconds * 1000); //resolve is the callback func name
  });
};

// Create Image Func
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.classList.add('parallel');

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found (chad)...')); //becomes error message
    });
  });
};

// Async-Await section
const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log(`image 1 loaded`);
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log(`image 2 loaded`);
    await wait(2);
    img.style.display = 'none';

    console.log(`challenge 3, part 1, complete`);
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

// Part 2 - loadAll
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async i => await createImage(i)); //implicit return is a promise.  Need to await on Promise.all
    console.log(imgs);
    const imgEl = await Promise.all(imgs);

    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// let myImgs = loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
// console.log(`my images`, myImgs);
