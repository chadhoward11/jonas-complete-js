'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// ch: There is something wrong with my sort.
// Values move, but dates don't follow.

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const displayAllMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // .slice is used to create a copy of the array so we don't mutate(sort) the original movements arr
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (currentAccount) {
  currentAccount.balance = currentAccount.movements.reduce(function (
    acc,
    curr
  ) {
    return acc + curr;
  },
  0);

  labelBalance.textContent = `${currentAccount.balance}€`;
};

// reg function version
// const calcDisplayDeposits = function (movementsArr) {
//   const deposits = movementsArr
//     .filter(function (mov) {
//       return mov > 0;
//     })
//     .reduce(function (acc, curr) {
//       return acc + curr;
//     });

//   labelSumIn.textContent = `${deposits}€`;
// };
// arrow function version with logging the array after filter:
// const calcDisplayDeposits = (movementsArr) => {
//   const deposits = movementsArr
//     .filter((mov) => mov > 0)
//     .reduce((acc, curr, i, arr) => {
//       console.log(arr);
//       return acc + curr;
//     }, 0);
//   labelSumIn.textContent = `${deposits}€`;
// };
// arrow function version, standard:
const calcDisplayDeposits = (movementsArr) => {
  const deposits = movementsArr
    .filter((mov) => mov > 0)
    .reduce((acc, curr, i, arr) => acc + curr, 0);
  labelSumIn.textContent = `${deposits}€`;
};

const calcDisplayWithdrawals = (movementsArr) => {
  const withdraw = movementsArr
    .filter((mov) => mov < 0)
    .reduce((acc, curr, i, arr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(withdraw)}€`;
};

const calcDisplayInterest = (currentAccount) => {
  //pass in entire account object so we can access the individual interest rates
  const interest = currentAccount.movements //specify movements key
    .filter((mov) => mov > 0) //get deposits
    .map((deposit) => (deposit * currentAccount.interestRate) / 100) //pass in as 'deposit', create array of interest values
    .filter((interest, i, arr) => {
      return interest >= 1; // bank rule: only include interest >= 1
    })
    .reduce((acc, curr) => acc + curr, 0); //reduce to total interest, passing in all deposits >1 from prev method
  labelSumInterest.textContent = `${Number(interest).toFixed(2)}€`;
};

const createUserNames = function (accounts) {
  //is it possible to use map?
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ') //returns array split on each space, so array of each name -> [first, last]
      .map((name) => name[0]) //passing in each element of array, which is a string, so name[0] is the first letter of the string
      .join(''); //previous map iterates through whole array (both names), so join the first letters -> js, jd, etc.
  });
};

const resetInputs = () => {
  inputLoanAmount.value = '';
  inputClosePin.value = inputCloseUsername.value = '';
  inputTransferTo.value = inputTransferAmount.value = '';
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur(); // I think only need to blur the last item set (inputLoginPin in this case)
};

const updateUI = function () {
  displayAllMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount);
  calcDisplayDeposits(currentAccount.movements);
  calcDisplayWithdrawals(currentAccount.movements);
  calcDisplayInterest(currentAccount);
  resetInputs();
};

const logoutUI = () => {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
  resetInputs();
};

//SORT MUTATES ORIGINAL ARRAY, SO CREATE A NEW ONE
//SORT LOGIC FOR NUMBERS - .sort treats numbers like strings so we have to do our own compare function
//
// code snip from displayMovements:
// const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;  //a-b is ascending - our bank display is showing in reverse order (most recent on top), so we need to sort ascending from bottom up...which means largest number is on top of list.  :)
//
// sort function is geared for ascending, so a-b < 0 means a is smaller, keep the order.  Changing to b-a means if b (second item of the two) is smaller (b-a < 0), keep the order, so descending.
//return < 0, A,B (keep order)
//return > 0, B,A (switch order)
//Ascending
// movements.sort(a,b) => {
//  if(a > b) return 1 (any number > 0, switch order)
//  if(a < b) return -1 (any number < 0, keep order)
//
// a-b would be ascending
// b-a would be descending

/////////////////////////////////////////////////
// EXECUTION
//selectors: btnLogin, inputLoginUsername, inputLoginPin

// Create usernames, initial vars
createUserNames(accounts);
let currentAccount = {};
let sortedMovements = [];

//LOGIN BUTTON
//since it's a form, pressing <enter> on the login fields will also trigger
btnLogin.addEventListener('click', function (e) {
  //prevent page from reloading upon click
  e.preventDefault();

  //GET ACCOUNT FROM USER INPUT
  currentAccount = accounts.find((acct) => {
    //cannot use let or const here because we need to use the global var created above
    return acct.username === inputLoginUsername.value; //returns the object where object username matches the user input
  });

  console.log(`currentAccount username = ${currentAccount?.username}`);
  console.log(`pin entered: ${inputLoginPin.value}`);
  console.log(`full array:`);
  console.log(currentAccount);

  //PIN IS CORRECT
  //option chaining (?) - if undefined, does nothing instead of error
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //calc all movements, total, deposits, withdrawals, interest
    updateUI();
    console.log(
      `balance = ${
        currentAccount.balance
      } and type=${typeof currentAccount.balance}`
    );

    //display welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0] //split first, last, display first using index 0
    }`;
    //reveal page content
    containerApp.style.opacity = 100;

    //clear login fields
    inputLoginUsername.value = inputLoginPin.value = '';

    //remove focus from pin field - blur method
    inputLoginPin.blur();

    //PIN INCORRECT
  } else {
    resetInputs();
    labelWelcome.textContent = `Incorrect login, please try again...`;
    containerApp.style.opacity = 0;
    console.log('bad login');
  }
});

// TRANSFER BUTTON
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  //receiver account is the whole account object, not just username
  //inputTransferTo is already a string
  let receiverAcct = accounts.find(
    (acct) => acct.username === inputTransferTo.value
  );
  let transferAmount = Number(inputTransferAmount.value);

  if (
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance &&
    receiverAcct && //object exists, not undef
    receiverAcct.username !== currentAccount.username
  ) {
    receiverAcct.movements.push(transferAmount);
    currentAccount.movements.push(-transferAmount);
    inputTransferTo.value = inputTransferAmount.value = '';
    updateUI();
  } else {
    resetInputs();
    console.log(`invalid transfer`);
  }
});

// REQUEST LOAN BUTTON
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  //One of the deposits must be at least 10% of the loan amount
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //Add movement
    currentAccount.movements.push(amount);
    updateUI();
  } else {
    resetInputs();
    console.log(`invalid loan amount`);
  }
});

// CLOSE ACCOUNT BUTTON
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    console.log(`...get close index section...`);
    const closeAcctIndex = accounts.findIndex(function (acct, i, arr) {
      return acct.username === currentAccount.username;
    });
    console.log(`Closing index ${closeAcctIndex}`);

    //delete account from array
    accounts.splice(closeAcctIndex, 1);

    //reset UI
    logoutUI();
  } else {
    resetInputs();
    console.log(`account does not match current user`);
  }
});

//SORT BUTTON
let sorted = true; //value when we click button the first time
// could set intial to false, then use !sorted in the func...I prefer true for initial
btnSort.addEventListener('click', function (e) {
  e.preventDefault(); //prevent page reload

  displayAllMovements(currentAccount.movements, sorted);
  sorted = !sorted; //toggle true/false on each click
});
