// 'use strict';
// // code challenge 3
// const mark = {
//   first: 'Mark',
//   last: 'Miller',
//   mass: 78,
//   height: 1.69,
//   calcBmi: function () {
//     this.bmi = this.mass / this.height ** 2;
//     return this.bmi;
//   }
// }

// const john = {
//   first: 'John',
//   last: 'Smith',
//   mass: 92,
//   height: 1.95,
//   calcBmi: function () {
//     this.bmi = this.mass / this.height ** 2;
//     return this.bmi;
//   }
// }

// if (mark.calcBmi() > john.calcBmi()) {
//   console.log(`${mark.first}'s BMI (${parseInt(mark.bmi)}) is higher than ${john.first}'s (${parseInt(john.bmi)})`)
// } else {
//   console.log(`${john.first}'s BMI (${john.bmi}) is higher than ${mark.first}'s (${mark.bmi})`)
// };

// console.log(mark, john);

//////////////////////////////////////////////////////////////////////////////
//
// 'use strict';

// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tips = [];
// const totals = [];

// //calc tips, totals arrays
// for (let i = 0; i < bills.length; i++) {
//   tips.push(
//     bills[i] >= 50 && bills[i] <= 300 ? bills[i] * 0.15 : bills[i] * 0.2
//   );
//   totals.push(bills[i] + tips[i]);
// }

// //get avg of totals
// let sum = 0;
// const calcAverage = function (arr) {
//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
//   }
//   return sum / arr.length;
// };

// const avgTotal = calcAverage(totals);
// console.log(bills, avgTotal);
// console.log('aa');

// REVIEW: SECTION 5, CODE CHALLENGE 1
// 'use strict';

// const temp1 = [17, 21, 23];
// const temp2 = [12, 5, -5, 0, 4];
// const allTemps = [...temp1, ...temp2];

// let forecast = 'The forecast is:  ';
// const printForecast = function (arr) {
//   for (let i = 0; i < arr.length; i++) {
//     forecast += `${arr[i]}C in ${i + 1} days`;
//     if (i < arr.length - 1) {
//       forecast += '... ';
//     } else {
//       forecast += '.';
//     }
//   }
//   return forecast;
// };

// console.log(printForecast(allTemps));

// ('use strict');
