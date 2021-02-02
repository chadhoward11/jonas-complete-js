'use strict';

//console.log(document.querySelector('.message').textContent);

//document.querySelector('.message').textContent = 'Correct Number!';

const setMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;

//const correctNumber =

let score = 20;
let won = false;
let lost = false;
let highScore = 0;

const updateScore = document
  .querySelector('.check')
  .addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (lost === true) {
      console.log('game was lost');
    } else if (won === true) {
      console.log('game was won');
    } else if (guess < 1 || !guess || guess > 20) {
      setMessage('Invalid entry');
    } else if (guess === secretNumber) {
      //correctNumber('Correct Number!');
      document.querySelector('.message').textContent = 'Correct Number!';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.score').value = score;
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('.number').style.width = '30rem';
      won = true;
      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = score;
      }
    } else if (guess > secretNumber) {
      setMessage('Too High');
      score--;
      document.querySelector('.score').textContent = score;
      if (score === 0) {
        document.querySelector('.message').textContent = 'You Lost!';
        lost = true;
      }
    } else if (guess < secretNumber) {
      setMessage('Too Low');
      score--;
      document.querySelector('.score').textContent = score;
      if (score === 0) {
        document.querySelector('.message').textContent = 'You Lost!';
        lost = true;
      }
    }
  });

const newGame = document
  .querySelector('.again')
  .addEventListener('click', function () {
    won = false;
    lost = false;
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = '20';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.number').style.width = '15rem';
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
  });
