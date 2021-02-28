'use strict';

const ages1 = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];

//using map instead of forEach
const calcAverageHumanAge = (ageArr) => {
  const humanAges = ageArr
    .map((age) => (age <= 2 ? age * 2 : 16 + age * 4)) //calc age
    .filter((age) => age >= 18) //filter for adults
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0); //calc average for each 'current', add to accumulator (total avg)
  return humanAges;
};

console.log(
  `ages1 average: ${calcAverageHumanAge(
    ages1
  )} type:${typeof calcAverageHumanAge(ages1)}`
);
console.log(
  `ages2 average: ${calcAverageHumanAge(ages2).toFixed(
    2
  )} type:${typeof calcAverageHumanAge(ages2)}`
);
