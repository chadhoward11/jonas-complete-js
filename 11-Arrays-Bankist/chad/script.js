'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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
const displayAllMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
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

const updateUI = function (currentAccount) {
  displayAllMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount);
  calcDisplayDeposits(currentAccount.movements);
  calcDisplayWithdrawals(currentAccount.movements);
  calcDisplayInterest(currentAccount);
};

const resetUI = () => {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
  inputLoanAmount.value = '';
  inputClosePin.value = inputCloseUsername.value = '';
  inputTransferTo.value = inputTransferAmount.value = '';
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur(); // I think only need to blur the last item set (pin in this case)
};
/////////////////////////////////////////////////
// EXECUTION
//selectors: btnLogin, inputLoginUsername, inputLoginPin

//CREATE USERNAMES
createUserNames(accounts);
let currentAccount = {};

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
    updateUI(currentAccount);
    console.log(
      `balance = ${
        currentAccount.balance
      } and type=${typeof currentAccount.balance}`
    );

    //display welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0] //split first, last, display first
    }`;
    //reveal page content
    containerApp.style.opacity = 100;

    //clear login fields
    inputLoginUsername.value = inputLoginPin.value = '';

    //remove focus from pin field - blur method
    inputLoginPin.blur();

    //PIN INCORRECT
  } else {
    inputLoginPin.value = '';
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
    updateUI(currentAccount);
  } else {
    console.log(`invalid transfer`);
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
    resetUI();
  } else {
    console.log(`account does not match current user`);
    inputCloseUsername.value = inputClosePin.value = '';
    inputCloseUsername.focus(); //if I don't set focus then blur, the user pin field get focus for some reason
    inputCloseUsername.blur();
  }
});
