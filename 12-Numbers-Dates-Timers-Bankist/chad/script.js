'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-02-27T17:01:17.194Z',
    '2021-02-28T23:36:17.929Z',
    '2021-03-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

// passing these vars makes this reusable across any app
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    signDisplay: 'auto',
  }).format(value);
};

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24);
  };
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = date.getFullYear();
  // return `${month}/${day}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedBal = formatCur(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = formattedBal; //can just put the func call here instead of using a var, personal pref
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

// const updateUI = function (acc) {
//   // Display movements
//   displayMovements(acc);

//   // Display balance
//   calcDisplayBalance(acc);

//   // Display summary
//   calcDisplaySummary(acc);
// };

const updateUI = function () {
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
  resetInputs();
};

const resetInputs = () => {
  inputLoanAmount.value = '';
  inputClosePin.value = inputCloseUsername.value = '';
  inputTransferTo.value = inputTransferAmount.value = '';
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur(); // I think only need to blur the last item set (inputLoginPin in this case)
};

const logoutUI = () => {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
  resetInputs();
  console.log(`Logged out...`);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = (time % 60).toString().padStart(2, '0');

    // in each call, print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When timer 0, logout user

    if (time === 0) {
      clearInterval(timer);
      logoutUI();
    }

    //decrement timer
    //need to do this 'after' checking for time===0 otherwise
    //when time===1, we dec to 0, then check for 0 (now true)
    //and it immediately logs out when there is really "1" second left
    time--;
  };

  //set time to 5 min (300s)
  let time = 30;

  // Call the timer every second -
  //setup the callback func for setInterval as a separate func.
  //then we can call it once immediately, and then call it every second after that
  //this avoids the initial delay of 1s before it starts the timer.
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

///////////////////////////////////////
// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//Experimenting with intl API

///////////////////////////////////////

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  labelTimer.textContent = '';

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    //+ converts to num, option instead of using "Number(inputLoginPin.value)"
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current date and time

    //INTL API FOR DATE FORMAT
    const now = new Date();
    const options = {
      //var name does not have to be 'options'
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric', //2-digit, long, numeric
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long',
    };
    //commenting out const locale, will get from currentAccount.locale
    //const locale = navigator.language; //pulls language from current browser
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // ORIGINAL/OLD DATE SETUP
    // const now = new Date();
    // // const day = now.getDate();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // // const month = now.getMonth() + 1; //zero based
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, '0');
    // const min = `${now.getMinutes()}`.padStart(2, '0');
    // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Timer - if it already exists (different user login) then clear and restart.
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  //Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault(); //prevent page reload

  //Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    const loanWait = setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 3000);

    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// setInterval
// const myIntervalTest = setInterval(function () {
//   const now = new Date();
//   const clockHour = now.getHours().toString();
//   const clockMin = now.getMinutes().toString();
//   const clockSec = now.getSeconds().toString();
//   const myClock = `${clockHour.padStart(2, '0')}:${clockMin.padStart(
//     2,
//     '0'
//   )}:${clockSec.padStart(2, '0')}`;
//   console.log(`clock: ${myClock}`);
//   if (clockSec === '59') clearInterval(myIntervalTest);
// }, 1000);

// const initialTime = getSeconds();
// const countdownTimer = setInterval(function () {
//   const timerDate = new Date();
//   const timerSec = initialTime.getSeconds() - timerDate.getSeconds();
//   console.log(`timerSec: ${timerSec}`);
// }, 1000);
