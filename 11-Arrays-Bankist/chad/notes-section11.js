'use strict';

const movements = [10, 200, -100, 500, -50];

//NOTE:: FILTER
const withdrawals = movements.filter(function (i) {
  return i < 0;
});
console.log(`reg function: ${withdrawals}`);

// const withd = movements.filter((i) => {
//   return i < 0;
// });

// don't need to have explicit return if only one line/item in an arrow func
const withd = movements.filter((mov, i) => {
  console.log(`index ${i}`);
  return mov < 0;
});

console.log(`arrow function: ${withd}`);

//
//NOTE:: REDUCE - SUM
const movTotal = movements.reduce(function (acc, curr) {
  return acc + curr;
}, 100); //second arg is the starting value, in this case 100. Removes need for external var for sum
console.log(`total of all movements is: ${movTotal}`);

// arrow func option
//const movTotal2 = movements.reduce((acc, curr) => acc + curr);
const movTotal2 = movements.reduce((acc, curr) => acc + curr, 200); //add initial value as 200
console.log(`movTotal2 = ${movTotal2}`);

// FIND
const myAccount = movements.find((mov) => mov < 0);
console.log(`myAccount = ${myAccount}`);

//NOTE:: FOR-OF
let myAccount2;
for (const mov of movements) {
  if (mov < 0) {
    myAccount2 = mov;
    break;
  }
}
console.log(`for-of myAccount2 = ${myAccount2}`);

console.log(`---Array.From section----------------------`);
//random numbers 1-100
let arrOfRandoms = Array.from({ length: 100 }, (_, i) =>
  Math.floor(Math.random() * 100 + 1)
); //underscore for the current element (_, i) means we are not using that var - convention that devs will understand

let countsOfRandom = Array.from({ length: 101 }, () => 0); //initialize all zeroes; array length is 101 so we have index 100 avail

const updateCountsOfRandom = function (arr) {
  arr.forEach((num) => (countsOfRandom[num] += 1)); //increment counter at the index for each random num
};

const highestRandomNumber = arrOfRandoms.reduce(
  (acc, curr, i) => (curr > acc ? curr : acc),
  0
);

console.log(`---random 1-100`);
console.log(arrOfRandoms);

console.log(`---initial countsOfRandom zeroes (101):`);
console.log(countsOfRandom);

console.log(`--- updated countsOfRandom array:`);
updateCountsOfRandom(arrOfRandoms);
console.log(countsOfRandom);

let countOfMostGeneratedNumber = countsOfRandom.reduce(
  (acc, curr, i) => (curr > acc ? curr : acc),
  0
);

let mostGeneratedNum = countsOfRandom.findIndex(
  (val) => val === countOfMostGeneratedNumber
);

console.log(`count of most generated number: ${countOfMostGeneratedNumber}`);
console.log(`highest random number = ${highestRandomNumber}`);
console.log(`last random num: ${arrOfRandoms[arrOfRandoms.length - 1]}`);
console.log(
  `most generated number: ${mostGeneratedNum}  --but does not account for multiple numbers having same count`
);
