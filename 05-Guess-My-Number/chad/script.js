'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
let msg;

const updateScore = document
  .querySelector('.check')
  .addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (score > 1) {
      if (guess < 1 || !guess || guess > 20) {
        incorrectGuess('Invalid entry');
      } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = 'Correct Number!';
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.score').value = score;
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('.number').style.width = '30rem';
        if (score > highScore) {
          highScore = score;
          document.querySelector('.highscore').textContent = score;
        }
      } else {
        msg = guess > secretNumber ? 'Too High' : 'Too Low';
        document.querySelector('.message').textContent = msg;
        score--;
        document.querySelector('.score').textContent = score;
      }
    } else {
      document.querySelector('.message').textContent = 'You Lost!';
      document.querySelector('.score').textContent = '0';
    }
  });

const newGame = document
  .querySelector('.again')
  .addEventListener('click', function () {
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = '20';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.number').style.width = '15rem';
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
  });
