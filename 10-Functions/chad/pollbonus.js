'use strict';

let response = 0;
let promptString = '';

const getResponse = () => {
  response = prompt(promptString);
  if (response === null) {
    console.log('user clicked cancel or esc');
    return 'cancel';
  } else {
    return Number(response);
  }
};

const registerNewAnswer = function () {
  //build prompt string
  promptString = poll.question + '\n';
  for (let i = 0; i < poll.options.length; i++) {
    promptString += poll.options[i] + '\n';
  }
  promptString += '(Enter option number)\n';

  //get response
  response = getResponse();
  console.log(`------response: ${response} type:${typeof response}`);

  //user cancelled, bail
  if (response === 'cancel') return '';

  //invalid entry, prompt for valid response or cancel button
  while (
    response < 0 ||
    response > poll.options.length - 1 ||
    isNaN(response)
  ) {
    if (!promptString.includes('**'))
      promptString += `** Please enter a number 0 - ${poll.options.length - 1}`;
    response = getResponse();
    console.log(
      `------response in while loop: ${response} type:${typeof response}`
    );
    //user cancelled, bail
    if (response === 'cancel') return '';
  }
  //valid response, run displayResults fn
  console.log(`valid response`);
  poll.answers[response]++;
  displayResults('string');
  displayResults('array');
  displayResults('blah');
  displayResults();
};

const displayResults = function (type = 'array') {
  if (type === 'string') {
    let displayStr = [...this.answers];
    console.log(`Poll results are: ${displayStr}`);
  } else {
    console.log('array display: ', this.answers);
  }
};

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:  C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer,
  displayResults,
};

const pollBtn = document.querySelector('.poll');
pollBtn.addEventListener('click', registerNewAnswer);
