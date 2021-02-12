'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return 1;
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const {
  name: x = 1,
  location: y = 1,
  categories: z = 1,
  starterMenu = 1,
  mainMenu = 1,
  openingHours,
} = restaurant;

let thur = restaurant.openingHours.thu;
console.log(x, y, z, mainMenu, openingHours, thur);

console.log(`--------items of mainMenu.entries`);
for (const item of mainMenu.entries()) {
  console.log(`${item[0] + 1}. ${item[1]}`);
}

console.log(`--------items of mainMenu`);
for (const item of mainMenu) {
  console.log(item);
}

console.log(`--------arr of only the values from thursday hours`);
const hourVals = [];
for (let i in thur) {
  console.log(i);
  hourVals.push(thur[i]);
}
console.log(hourVals);

//
console.log(`--------all hours, just the values`);
const allHours = [];
let dayHours = [];
const todayList = [];
let arrayByDay = [];
for (let day in openingHours) {
  console.log(day); //thu, fri, sat

  for (let status in openingHours[day]) {
    dayHours.push(openingHours[day][status]); //[12, 22]
  }
  console.log(`hours for this day`);
  console.log(dayHours); //[12,22]

  console.log(`----list by day`);
  arrayByDay.push(dayHours); //[12,22], [11,23]
  console.log(arrayByDay);
  dayHours = [];
}

//Property Names
console.log(`-------Object.keys, array of keys`);
const properties = Object.keys(openingHours);
console.log(properties);

//Property Values
console.log(
  `-------Object.values, array of objects since the values are objects`
);
const properties2 = Object.values(openingHours);
console.log(properties2);

//Entire object - Entries (key + value)
console.log(`-------Object.entries, array of arrays, day + obj in each arr`);
const entries = Object.entries(openingHours);
console.log(entries);
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we are open at ${open}, and close at ${close}.`);
}

//----------------------------------------------------
//Jonas notes
//----------------------------------------------------
console.log(`-------Jonas notes`);
const question = new Map([
  //note bracket here...this is an array of arrays
  ['question', 'what is the best programming language?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Yay, correct'],
  [false, 'Try again'],
]);

console.log(`-------Jonas notes 2`);
// the above (map) 'array of arrays' is the same as
// the response from converting an object to array:
console.log(Object.entries(openingHours));

// Convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz App--------------
//question is same as question.entries(), same as above with the object, but an object has to be converted to an iterable first
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

//const answer = Number(prompt(question.get('question')));
const answer = 3;
console.log(question.get(question.get('correct') === answer));

//Conver map to array
console.log([...question]);
//console.log([...question.entries()]);  this is same as above
console.log([...question.keys()]);
console.log([...question.values()]);
