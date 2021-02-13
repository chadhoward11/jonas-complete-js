'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//Task 1
const scoredArr = game.scored;
for (const [index, name] of scoredArr.entries()) {
  console.log(`Goal ${index + 1}: ${name}`);
}

//Task 2 & 3
//creates array of arrays
// [[team1, 1.33],[team2,6.5],[x,3.25]]
const oddsEntries = Object.entries(game.odds);
let sum = 0;
let avg = 0;
console.log(oddsEntries);
let [a, b, c] = oddsEntries.entries();
console.log(a, b, c); // each individual array

//option1 for task 2
// for (let [index, [teamName, oddVal]] of oddsEntries.entries()) {
//   console.log(`Odd of victory, ${game[teamName] || 'draw'}: ${oddVal}`); // 1.33 etc
//   sum += oddVal;
//   avg = sum / (index + 1);
//}
//option2 for task 2
// let count = 0;
// for (let [teamName, oddVal] of oddsEntries.values()) {
//   console.log(`Odd of victory, ${game[teamName] || 'draw'}: ${oddVal}`); // 1.33 etc
//   sum += oddVal;
//   count += 1;
//   avg = sum / count;
// }

//option3 for task 2 answer per Jonas
const odds = Object.values(game.odds);
for (const odd of odds) {
  console.log(odd);
  avg += odd;
}
avg /= odds.length;
console.log(`total is: ${avg}`);
console.log(`average odd is: ${avg.toFixed(2)} - length is ${odds.length}`);

//-------------

// Bonus Task 4
// scoredArr was defined above
// const scoredArr = game.scored;
const scorers = {};
for (let [i, pName] of scoredArr.entries()) {
  console.log(`${pName} in array, value is: ${typeof scorers[pName]}`);
  //scorers.hasOwnProperty([pName]) //option for checking if obj has prop
  //scorers[pName] !== undefined; //another option
  [pName] in scorers ? scorers[pName]++ : (scorers[pName] = 1); //third option
  console.log(scorers);
}
