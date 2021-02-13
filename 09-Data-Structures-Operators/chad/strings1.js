'use strict';

const announcement =
  'All passengers come to boarding door 23.  We are now boarding at door 23!';

//replaceAll is now available
console.log(announcement.replaceAll('door', 'gate').replaceAll('23', '44'));

// using regex - the 'g' means global in this case
console.log(announcement.replace(/door/g, 'gate').replaceAll(/23/g, '44'));

//----------------------------------------------------------------------------------
//CODE CHALLENGE 4

//create element
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

//dom selectors
let textArea = document.querySelector('textarea');
const btn = document.querySelector('button');

btn.textContent = 'click';
textArea.value =
  'underscore_case\n\
 first_name\n\
Some_Variable\n\
  calculate_AGE\n\
delayed_departure';

let camelArray = [];
let myText;

//BUTTON CLICK EVENT
btn.addEventListener('click', function () {
  console.log('--------original text');
  myText = textArea.value;
  console.log(myText);

  //reset arrays
  let arr = [];
  camelArray = [];

  //create initial array of underscore case words
  arr = myText.split('\n');
  console.log(arr);

  let index = 0;
  let string = '';

  //iterate over array
  console.log(`-------Output`);
  for (const str of arr) {
    //Trim and LowerCase
    string = str.trim().toLowerCase();

    //index of first letter after underscore
    index = string.indexOf('_') + 1;

    //stitch word together
    string =
      string.slice(0, index) + //beginning of string to underscore, not inclusive
      string.slice(index, index + 1).toUpperCase() + //letter following underscore
      string.slice(index + 1); //second letter of second word, to the end

    //remove underscore
    string = string.replace('_', '');

    //add to array
    camelArray.push(string);
  }

  //print checkmarks
  for (const [index, val] of camelArray.entries()) {
    console.log(`${val.padEnd(25, ' ') + '✔'.repeat(index + 1)}`);
  }
});
