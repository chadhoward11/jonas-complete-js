'use strict';

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
const dj = [9, 16, 6, 8, 3];
const dk = [10, 5, 6, 1, 4];

const checkDogs = function (dj, dk) {
  // const djNoCat = [...dj];
  // djNoCat.splice(0, 1); //slice pulls copied values, splice removes them from orig array
  // djNoCat.splice(-2);
  // or
  const djNoCat = dj.slice(1, -2);
  console.log(`no cats---`, djNoCat);

  const allDogs = [...djNoCat, ...dk];
  //const allDogs = djNocat.concat(dk);
  console.log(allDogs);

  allDogs.forEach(function (dogAge, i) {
    let str =
      dogAge < 3
        ? 'is still a puppy'
        : `is an adult, and is ${dogAge} years old`;
    console.log(`Dog number ${i + 1} ${str}`);
  });
};

checkDogs(dogsJulia, dogsKate);
checkDogs(dj, dk);

//Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
//Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
