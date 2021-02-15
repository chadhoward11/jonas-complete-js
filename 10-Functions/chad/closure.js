'use strict';

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  console.log(`set h1 text to red`);

  const b = document
    .querySelector('body')
    .addEventListener('click', function () {
      header.style.color = 'blue';
      console.log(`set h1 text to blue`);
    });
})(); //don't forget the last () parens which is 'calling' the iife
