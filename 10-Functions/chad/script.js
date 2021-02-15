// 'use strict';

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   //old way in ES5
//   // numPassengers = numPassengers || 1;
//   // price = price || 1

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   bookings.push(booking);
//   console.log(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2);
// createBooking('LH123', 5);  //must enter args in order
// createBooking('LH123', undefined, 1000);  //used undefined if you want to use the default

//-------------------------------------------------------------------------------
'use strict';

const greet = (greeting) => {
  return (name) => {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');

greet('Hello')('Jonas');
greet('Hi')('Steven');
greet('Hola'); //does nothting if all args are not accounted for

//Partial Application
//const addTax = (rate, value) => value + value * rate;
const addTax = function (rate, value) {
  return value + value * rate;
};
console.log(addTax(0.07, 300));

// change first fn to use bind - we don't care about 'this' object here so first bind arg is null
const addTax2 = addTax.bind(null, 0.03);
console.log(addTax2(100));

// change first fn to returning a fn, using arrow functions
const addTaxRate = (rate) => {
  return (value) => value + value * rate;
};
console.log(`----addTaxRate ${addTaxRate(0.23)(200)}`);

// again do fn returning fn, with normal function style
const addTaxRateFn = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
console.log(`----addTaxRateFn ${addTaxRateFn(0.23)(200)}`);
