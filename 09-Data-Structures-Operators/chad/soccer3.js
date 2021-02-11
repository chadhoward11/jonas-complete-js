'use strict';

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

//Coding Challenge #3
//Task 1
console.log(`------Unique Events`);
const eventsUnique = new Set(gameEvents.values());
console.log(eventsUnique);

//Task 2
gameEvents.delete(64);
console.log(`------Remove unfair event at minute 64`);
console.log(gameEvents);

//Task 3
console.log(`-------Average`);
const arrOfGame = [...gameEvents.keys()];
console.log(gameEvents.keys());
let average = 0;
let totalDiffs = 0;
for (let i = 0; i < arrOfGame.length; i++) {
  totalDiffs += arrOfGame[i] - (arrOfGame[i - 1] || 0); //when i=0, i-1 index is undefined, so use || 0 for start of game, so we record the first 17 min
}
average = totalDiffs / arrOfGame.length;
console.log(
  `An event happened, on average, every ${average.toFixed(0)} minutes.`
);

//Task 4
let keyStr = '';
console.log(gameEvents.entries()); //map is an array of arrays, so return from '.entries' is an array, not an object
console.log(`-------First Half or Second Half`);
for (const [key, value] of gameEvents.entries()) {
  //key is minute-mark in game, value is the event that happened in the game
  keyStr =
    key <= 45
      ? `[FIRST HALF] ${key}: ${value}`
      : `[SECOND HALF] ${key}: ${value}`;
  console.log(keyStr);
}

//Task 4 option
//currently prints out the last two keys, not going to fix at the moment
console.log(`-------OPTION - First Half or Second Half`);
gameEvents.set(true, '[FIRST HALF]').set(false, '[SECOND HALF]');
for (const [key, value] of gameEvents.entries()) {
  if (typeof key === 'number')
    console.log(`${gameEvents.get(key <= 45)}: ${value}`);
}

//Task 4 - easier to read?
console.log(`-------Fourth OPTION - First Half or Second Half`);
let isFirstHalf;
let outputString = '';
for (const [minuteMark, eventName] of gameEvents.entries()) {
  isFirstHalf = minuteMark <= 45; //45 min half-way mark in game
  if (typeof minuteMark === 'number') {
    outputString = isFirstHalf
      ? `[FIRST HALF] ${minuteMark}: ${eventName}`
      : `[SECOND HALF] ${minuteMark}: ${eventName}`;
    console.log(outputString);
  }
}
