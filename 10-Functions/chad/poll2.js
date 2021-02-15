'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:  C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    //get answer
    let answer = prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`
    );
    //console.log(`---answer: ${answer} ${typeof answer} converted Number: ${Number(answer)}`);

    //converting null to number is zero
    // string to number is NaN
    // setting answer === null to any string so we don't update the answers array
    // clicking "ok" with no answer --> will evaluate to zero
    answer = answer === null || answer === '' ? 'none' : Number(answer);
    if (answer >= 0 && answer <= 3) this.answers[answer]++;

    this.displayResults('string');
    this.displayResults();
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(`Poll array: `, this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are: `, this.answers.join(', '));
    } else {
      console.log(`Default display: `, this.answers);
    }
  },
};

//OPTIONS
//-----------------------------------------------------------------------------------------------
// For event listeners, 'this' = <DOM element that the handler is attached to.  In this case, the class 'poll'

const pollBtn = document.querySelector('.poll');
//--> DOES NOT WORK even though calling poll method directly --> the poll class (in querySelector) does not have the 'answers' array that we're using in the method 'registerNewAnswer.

//pollBtn.addEventListener('click', poll.registerNewAnswer); //--> DOES NOT WORK

//WORKS because we're binding to poll object.
pollBtn.addEventListener('click', poll.registerNewAnswer.bind(poll)); //WORKS
//-----------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------
//registerNewAnswer was defined as regular function (outside of poll object).  We can still bind it to poll Object to set the this keyword.
const registerNewAnswer = poll.registerNewAnswer;
pollBtn.addEventListener('click', registerNewAnswer.bind(poll)); // WORKS
//-----------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------
//'bind' command does NOT call the function - it returns a new function with 'this' permanently set

const displayPoll = poll.registerNewAnswer.bind(poll);
// displayPoll();
// displayPoll('string');

// Defined displayPoll function above, which permanently assigns the 'bind' to the function
pollBtn.addEventListener('click', displayPoll); // WORKS
//-----------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------
//'call' will call the function immediately  (where 'bind' does not)
// Need to bind it to an object with an 'answers' array per the function (using this.answers in the method)
// Here we are manually assigning an object with answers array directly in the statement
console.log(`---using .call, runs immediately`);

const displayCustom = poll.displayResults;
displayCustom.call({ answers: [5, 2, 3] }, 'string'); // WORKS
displayCustom.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string'); // WORKS
displayCustom.call(poll, 'array'); // WORKS

// Data 1: [5, 2, 3]
// Data 2: [1, 5, 3, 9, 6, 1]
//-----------------------------------------------------------------------------------------------
