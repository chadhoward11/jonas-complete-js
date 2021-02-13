'use strict';

//----------------------------------------------------------------------------------
//CODE CHALLENGE 4 - hints from Jonas

//create element
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

//selectors
let textArea = document.querySelector('textarea');
const btn = document.querySelector('button');

btn.textContent = 'click';
//setting value so I don't have to paste every time
textArea.value =
  'underscore_case\n\
 first_name\n\
Some_Variable\n\
  calculate_AGE\n\
delayed_departure\n\
capITal_CITY';

btn.addEventListener('click', function () {
  const rows = textArea.value.split('\n');
  // console.log(rows);
  let camelArray = [];
  let camelString = '';

  for (const [index, row] of rows.entries()) {
    const [first, second] = row.trim().toLowerCase().split('_');
    camelString = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(camelString.padEnd(25, ' ') + '✔'.repeat(index + 1));
  }
});
