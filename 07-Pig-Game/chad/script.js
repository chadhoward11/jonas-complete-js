'use strict';

let activePlayer = 0;
let scores = [0, 0];
let currentScore = 0;
let diceNum;
let playingGame = true;

const player0Elem = document.querySelector(`.player--0`);
const player1Elem = document.querySelector(`.player--1`);
const score0Elem = document.getElementById(`score--0`);
const score1Elem = document.getElementById(`score--1`);
const current0Elem = document.getElementById(`current--0`);
const current1Elem = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);

const setupNewGame = function () {
  player0Elem.classList.add('player--active');
  player1Elem.classList.remove('player--active');
  player0Elem.classList.remove('player--winner');
  player1Elem.classList.remove('player--winner');
  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  current0Elem.textContent = 0;
  current1Elem.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  diceEl.classList.add('hidden');
  playingGame = true;
};

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
};

const setCurrentZero = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
};

setupNewGame();

// Button Roll Dice
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playingGame) {
    diceNum = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `../assets/dice-${diceNum}.png`;
    diceEl.classList.remove('hidden');

    //is it 1
    if (diceNum === 1) {
      //set current = 0 and display
      setCurrentZero();

      //switch player
      switchPlayer();
    } else {
      //add score
      currentScore += diceNum;
      //display score
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
  }
});

// Hold Button
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playingGame) {
    //calc score and display it
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //set curr score 0
    setCurrentZero();
    console.log(`player ${activePlayer + 1} has: ${scores[activePlayer]}`);

    // did they win
    if (scores[activePlayer] >= 20) {
      //player won
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      setCurrentZero();
      console.log(`player ${activePlayer + 1} won the game`);
      playingGame = false;
      document.getElementById(`current--${activePlayer}`).textContent =
        'Winner';
      // did not win
    } else {
      switchPlayer();
    }
  }
});

// Button New Game
document.querySelector('.btn--new').addEventListener('click', setupNewGame);
