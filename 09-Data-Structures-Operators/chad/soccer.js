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

let [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;

console.log(`gk: ${gk}, fieldPlayers: ${fieldPlayers}`);
console.log(gk);
console.log(fieldPlayers);

let allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(`players1Final: ${players1Final}`);
console.log(players1Final);

const { team1, team2, x: draw } = game.odds;
console.log(team1, team2, draw);

function printGoals(...playerNames) {
  for (let i = 0; i < playerNames.length; i++) {
    console.log(`Player ${i + 1}: ${playerNames[i]}`);
  }
  console.log(`Total Goals: ${playerNames.length}`);
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

console.log(`passing in array:`);
printGoals(...game.scored);

console.log(`best odds, lowest number:`);
console.log(team2 ?? team1);

team1 < team2 && console.log(`Team 1 is more likely to win`);
team1 > team2 && console.log(`Team 1 is more likely to win`);
