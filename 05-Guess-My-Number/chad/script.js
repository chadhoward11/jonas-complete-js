'use strict';

//console.log(document.querySelector('.message').textContent);

//document.querySelector('.message').textContent = 'Correct Number!';

const setMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};

const secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = secretNumber;

let score = 20;

const updateScore = document
  .querySelector('.check')
  .addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (guess < 1 || !guess) {
      setMessage('invalid entry');
    } else if (guess === secretNumber) {
      correctNumber('Correct Number!');
      document.querySelector('.message').textContent = 'Correct Number!';
      document.querySelector('body').style = '#60b347';
    } else if (guess > secretNumber) {
      setMessage('Too High');
      score--;
    } else if (guess < secretNumber) {
      setMessage('Too Low');
      score--;
    }
  });
