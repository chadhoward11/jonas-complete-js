'use strict';

const movements = [10, 200, -100, 500, -50];

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
//reduce
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

//Use for-of instead of find
let myAccount2;
for (const mov of movements) {
  if (mov < 0) {
    myAccount2 = mov;
    break;
  }
}
console.log(`for-of myAccount2 = ${myAccount2}`);
