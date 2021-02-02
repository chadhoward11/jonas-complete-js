'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
let msg;
let won = false;

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

const updateScore = document
  .querySelector('.check')
  .addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (won === true) {
      console.log(guess, typeof guess, 'you won');
    } else if (score > 1) {
      if (guess < 1 || !guess || guess > 20) {
        document.querySelector('.message').textContent = 'Invalid entry';
      } else if (guess === secretNumber) {
        displayMessage('Correct Number!');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.score').value = score;
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('.number').style.width = '30rem';
        won = true;
        if (score > highScore) {
          highScore = score;
          document.querySelector('.highscore').textContent = score;
        }
      } else {
        msg = guess > secretNumber ? 'Too High' : 'Too Low';
        displayMessage(msg);
        score--;
        document.querySelector('.score').textContent = score;
      }
    } else {
      displayMessage('You Lost!');
      document.querySelector('.score').textContent = '0';
      console.log(guess, 'game over');
    }
  });

const newGame = document
  .querySelector('.again')
  .addEventListener('click', function () {
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = '20';
    document.querySelector('body').style.backgroundColor = '#222';
    displayMessage('Start guessing...');
    document.querySelector('.number').style.width = '15rem';
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    won = false;
  });
