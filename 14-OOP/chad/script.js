'use strict';
///////////////////////////////////////////////////////////
// Code challenge #1 in OOP
// Constructor function
console.log(`-------Constructor Function BMW, Mercedes------`);
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} accelerated to ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} slowed down to ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.brake();
console.log(bmw);

mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();
mercedes.brake();
console.log(mercedes);
console.log(`--------------------------------------`);

//
/////////////////////////////////////
////////////////////////////////////////////////////////////////////
// Code Challenge #2
// recreate the 'Car' class using class syntax
// ES6 Classes
// this is a class declaration
// class declarations are NOT hoisted, so they have to be written before calling them

console.log(`--------Class option-------`);
class CarCl {
  // must use the name 'constructor'
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  //methods are created outside the constructor
  //
  // "Instance Methods" available
  accelerate() {
    this.speed += 10;
    console.log(`---the ${this.make} accelerated to ${this.speed}`);
  }

  // no commas between methods
  brake() {
    this.speed -= 5;
    console.log(`---the ${this.make} slowed down to ${this.speed}`);
    return this;
  }

  // Assessor properties
  // getters and setters
  // treated like properties, not called like methods

  get mySpeed() {
    return this.speed;
  }

  set changeMake(newMake) {
    this.make = newMake;
  }

  // Setter method needs exactly 1 parameter
  // if you have a setter that sets a property that already exists (in the constructor for example), you must use a separate var name.  The normal convention is an underscore befor the var name.  MUST also have a getter to return the original property name if you intend to use it.

  set make(myMake) {
    if (myMake.includes('f'))
      console.log(`---this make name includes the letter f.`);
    this._make = myMake;
  }

  get make() {
    return this._make;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(mph) {
    this.speed = mph * 1.6;
  }

  // Static method - used by the contructor method only, not part of the prototype
  // so new objects created do not have access to this method (does not inherit)
  // "Helper functions" etc.
  static hey() {
    console.log(`---------Hey there!`);
  }
}

let ford = new CarCl('Ford', 120);
console.log(`using getter, mySpeed: ${ford.make} speed is ${ford.mySpeed}`); //call this like a property...no () parens.
ford.changeMake = 'chevy';
console.log(`---used setter changeMake.  new make is now: ${ford.make}`);
console.log(ford);

//calling static method
CarCl.hey();

ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.brake();

console.log(`---The Ford speed in Mph is ${ford.speedUS} mph`);
console.log(
  `---Ford speed in km/h is ${ford.speed}, and in mph is ${ford.speedUS}mph`
);
ford.speedUS = 55;
console.log(
  `---I just set speed to ${ford.speedUS}mph, which is ${ford.speed}km/h`
);

/////////////////////////////////////////////////////////////
// Code challenge #3
//
// (#2 is using classes, 1 & 3 are grouped since they both use constructor func)
// Object.create - set prototype inheritance with constructor function
console.log(
  `------Constructor with Object.create for inheritence (EV)-------------`
);
const EV = function (make, speed, charge) {
  Car.call(this, make, speed); //need to use .call to set 'this' keyword
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype); //must happen before adding methods or this will overwrite the methods

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`${this.make} charged to ${this.charge}%`);
};

// this overrides the Car method for accelerate because this one comes first in the prototype chain.
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} EV accelerated 20 to ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.chargeBattery(50);
tesla.brake();
tesla.brake();
tesla.brake();
tesla.brake();
tesla.accelerate();
tesla.accelerate();

///////////////////////////////

////////////////////////////////////////
// Coding Challenge #4
// inheritence using classes - recreate EV class from above, but use class

console.log(`------------Class extends...--------`);
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    //super must be done first because it is defining 'this'
    super(make, speed); // super automatically uses the class we extended (Car)
    this.#charge = charge;
  }
  chargeBattery(val) {
    this.#charge = val;
    return this;
  }
  accelerate() {
    this.accel = 10;
    this.speed += this.accel;
    this.#charge -= 5;
    return this; //makes the method chainable
  }
  getCharge() {
    return this.#charge;
  }
}

const Rivian = new EVCl('Rivian', 88, 50);
console.log(Rivian);
console.log(
  `---Rivian is going ${Rivian.speed}km/h, charge is ${Rivian.getCharge()}%`
);
console.log(`Rivian speed in mph is ${Rivian.speedUS}mph`);

Rivian.accelerate();
Rivian.accelerate();
console.log(
  `Rivian accelerated x2 at a rate of ${Rivian.accel}, to ${
    Rivian.speed
  }, and charge decreased to ${Rivian.getCharge()}%`
);
Rivian.brake();
Rivian.brake();

console.log(`new US speed is ${Rivian.speedUS} mph. Or, ${Rivian.speed}km/h`);
Rivian.chargeBattery(99).accelerate().brake();
console.log(
  `---chained methods: set charge to 99, accelerated (+10 km/h, -5% charge) and brake (-5)).  Speed is ${
    Rivian.speed
  }. Charge is ${Rivian.getCharge()}%`
);

//see if #charge is in fact private
// console.log(this.#charge);  //yes, private, this throws an error
