'use strict';

let player0 = {
  playerName: 'Player 1',
  score: 0,
  currentScore: 0,
  active: true,
  roll: 0,
  winner: false,
};
const player1 = {
  playerName: 'Player 2',
  score: 0,
  currentScore: 0,
  active: false,
  roll: 0,
  winner: false,
};

let diceNum = 0;
let diceImageName = '';
let activePlayer = player0.active === true ? player0 : player1; //seems like need to set value to the object, not the string name of the obj.
let diceValue = 0;
let gameOver = false;

//ROLL DICE FUNCTION
const rollDice = function () {
  //roll 1-6
  diceNum = Math.floor(Math.random() * 6 + 1);
  diceImageName = `../assets/dice-${diceNum}.png`; //..assets/dice-5.png
  document.querySelector('.dice').src = diceImageName; //update image name in DOM
  return diceNum;
};

//ROLL DICE BUTTON
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gameOver === false) {
    diceValue = rollDice();
    console.log(`btn click rolled ${diceValue}`);

    //Update info for active player
    if (player0.active === true) {
      //Player 1 is obj player0
      if (diceValue !== 1) {
        player0.currentScore += diceValue;
      } else {
        player0.currentScore = 0;
        player0.active = false;
        player1.active = true;
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.add('player--active');
      }
      document.querySelector('#current--0').textContent = player0.currentScore;
      console.log(`player 1 ${player0.active}`);
    } else {
      //Player 2 is obj player1
      if (diceValue !== 1) {
        player1.currentScore += diceValue;
      } else {
        player1.currentScore = 0;
        player1.active = false;
        player0.active = true;
        document.querySelector('.player--0').classList.add('player--active');
        document.querySelector('.player--1').classList.remove('player--active');
      }
      document.querySelector('#current--1').textContent = player1.currentScore;
      console.log(`player 2 ${player1.active}`);
    }
  }
});

//HOLD BUTTON
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gameOver === false) {
    if (player0.active === true) {
      //update score
      player0.score += player0.currentScore;
      //display score
      document.querySelector('#score--0').textContent = player0.score;
      //check for winner
      if (player0.score >= 100) {
        player0.winner = true;
        gameOver = true;
        document.querySelector('#name--0').textContent = 'winner';
      } else {
        //if didn't win, switch to player 2
        player0.currentScore = 0;
        player0.active = false;
        player1.active = true;
        document.querySelector('#current--0').textContent = '0';
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.add('player--active');
      }
    } else if (player1.active === true) {
      //update score
      player1.score += player1.currentScore;
      //display score
      document.querySelector('#score--1').textContent = player1.score;
      //check for winner
      if (player1.score >= 100) {
        player1.winner = true;
        gameOver = true;
        document.querySelector('#name--1').textContent = 'winner';
      } else {
        //if didn't win, switch to player 1
        player1.currentScore = 0;
        player0.active = true;
        player1.active = false;
        document.querySelector('#current--1').textContent = '0';
        document.querySelector('.player--0').classList.add('player--active');
        document.querySelector('.player--1').classList.remove('player--active');
      }
    }
  }
});

// NEW GAME BUTTON
document.querySelector('.btn--new').addEventListener('click', function () {
  gameOver = false;
  player0.active = true;
  player1.active = false;
  player0.score = 0;
  player1.score = 0;
  player0.currentScore = 0;
  player1.currentScore = 0;
  player0.winner = false;
  player1.winner = false;

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('#score--0').textContent = '0';
  document.querySelector('#current--0').textContent = '0';
  document.querySelector('#name--0').textContent = 'Player 1';

  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('#score--1').textContent = '0';
  document.querySelector('#current--1').textContent = '0';
  document.querySelector('#name--1').textContent = 'Player 2';
});
