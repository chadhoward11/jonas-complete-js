'use strict';

const ages1 = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const humanAges = [];
//   let humanAge = 0;
//   let average = 0;
//   ages.forEach(function (age) {
//     humanAge = age <= 2 ? age * 2 : 16 + age * 4;
//     if (humanAge >= 18) humanAges.push(humanAge);
//     average += humanAge >= 18 ? humanAge : 0;
//   });
//   average /= ages.length;
//   console.log(`Average age in human years: ${average.toFixed(2)}`);
// };

//using map below instead of forEach
const calcAverageHumanAge = function (ageArr) {
  //calc all ages
  const humanAges = ageArr.map((age) => (age <= 2 ? age * 2 : 16 + age * 4));
  // console.log(`humanAges: ${humanAges}`);
  // const adultDogs = humanAges.filter(function (age) {
  //   return age >= 18;
  // })
  //remove ages < 18 human years
  const adultDogs = humanAges.filter((age) => age >= 18);
  // console.log(`adults: ${adultDogs}`);
  //calc average
  const average = adultDogs.reduce(function (acc, curr, i, arr) {
    return acc + curr / arr.length; // Given 2,3 --> (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5 so we can calc the avg for each current value and add them up (add to accumulator)
  }, 0);
  return Number(average.toFixed(2));
};

console.log(
  `ages1 average: ${calcAverageHumanAge(
    ages1
  )}  type:${typeof calcAverageHumanAge(ages1)}`
);
console.log(
  `ages2 average: ${calcAverageHumanAge(
    ages2
  )}  type:${typeof calcAverageHumanAge(ages2)}`
);

//Data 1: [5, 2, 4, 1, 15, 8, 3]
//Data 2: [16, 6, 10, 5, 6, 1, 4]
