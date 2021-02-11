'use strict';

//pass in array (or iterable)
const orderSet = new Set(['pasta', 'pasta', 'pizza', 'pizza', 'risotto']);
//removes dups
console.log(orderSet);

//pass in string - drops last 's' because its a dup
console.log(new Set('Jonass')); //['J', 'o', 'n', 'a', 's']
