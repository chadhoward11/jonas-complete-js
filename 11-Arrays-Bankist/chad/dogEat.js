'use strict';

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] }, //250 orig food, 284=exact
  { weight: 8, curFood: 200, owners: ['Matilda'] }, //200
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }, //340 orig food
];
// const dogs = [
//   { weight: 22, curFood: 1, owners: ['Alice', 'Bob'] }, //250 orig food, 284=exact
//   { weight: 8, curFood: 1, owners: ['Matilda'] }, //200
//   { weight: 13, curFood: 1, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 1, owners: ['Michael'] }, //340 orig food
// ];

dogs.forEach((dog, i, arr) => {
  dog.recFood = Math.floor(dog.weight ** 0.75 * 28);
  dog.minFood = Math.floor(dog.recFood * 0.9);
  dog.maxFood = Math.floor(dog.recFood * 1.1);
  if (dog.owners.includes('Sarah')) {
    const str = "Sarah's dog eats ";
    let amountStr = 'the right amount';
    if (dog.curFood < dog.minFood) amountStr = 'too little';
    if (dog.curFood > dog.maxFood) amountStr = 'too much';
    console.log(
      `${str}${amountStr}. The recommended amount is ${dog.recFood}g. The current amount is ${dog.curFood}g.`
    );
  }
});

console.log(dogs);

// const ownersEatTooMuch = dogs.reduce(
//   (tooMuchArr, dog) =>
//     dog.curFood > dog.weight ** 0.75 * 28 * 1.1
//       ? tooMuchArr.concat([...dog.owners])
//       : tooMuchArr,
//   []
// );
// console.log(`too much: ${ownersEatTooMuch}`);

const { ownersEatTooMuch, ownersEatTooLittle, ownersEatCorrect } = dogs.reduce(
  (ownerArr, dog) => {
    if (dog.curFood > dog.maxFood) {
      ownerArr.ownersEatTooMuch.push(...dog.owners);
      console.log(`too much: ${dog.owners}`);
    } else if (dog.curFood < dog.minFood) {
      ownerArr.ownersEatTooLittle.push(...dog.owners);
    } else {
      ownerArr.ownersEatCorrect.push(...dog.owners);
    }
    return ownerArr;
  },
  { ownersEatTooMuch: [], ownersEatTooLittle: [], ownersEatCorrect: [] }
);

//
console.log(`------------all three arrays:`);
console.log(ownersEatTooMuch, ownersEatTooLittle, ownersEatCorrect);
//
//
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
// full solution for printing out owners and amounts
//option - new array, add recommended, min, max food amounts
const myDogs = dogs.map((dog) => {
  dog.recFood2 = Math.floor(dog.weight ** 0.75 * 28);
  dog.minFood2 = Math.floor(dog.recFood * 0.9);
  dog.maxFood2 = Math.floor(dog.recFood * 1.1);
  return dog;
});
console.log(myDogs);

//reduce to the groups
const { tooMuch, tooLittle, correctAmount } = myDogs.reduce(
  (ownerArr, dog) => {
    if (dog.curFood > dog.maxFood) {
      ownerArr.tooMuch.push(...dog.owners);
      console.log(`too much: ${dog.owners}`);
    } else if (dog.curFood < dog.minFood) {
      ownerArr.tooLittle.push(...dog.owners);
    } else {
      ownerArr.correctAmount.push(...dog.owners);
    }
    return ownerArr;
  },
  { tooMuch: [], tooLittle: [], correctAmount: [] }
);

console.log(`${tooMuch.join(' and ')}'s dogs eat too much.`);
console.log(`${tooLittle.join(' and ')}'s dogs eat too little.`);
console.log(`${correctAmount.join(' and ')}'s dogs eat the right amount.`);

// any dogs eat exact amount?
console.log(
  `do any dogs eat the exact amount: ${myDogs.reduce(
    (acc, curr) => (curr.recFood === curr.curFood ? true : acc),
    false
  )}`
);

// any dogs eat an okay amount
console.log(
  `do any dogs eat the right amount: ${myDogs.reduce(
    (acc, curr) =>
      curr.curFood >= curr.minFood && curr.curFood <= curr.maxFood ? true : acc,
    false
  )}`
);

// array of dogs eating okay amount
const okayArray = myDogs.filter(
  (dog) => dog.curFood >= dog.minFood && dog.curFood <= dog.maxFood
);
console.log(`---okay array:`);
console.log(okayArray);

const sortedDogs = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(`----sortedDogs`);
console.log(sortedDogs);
