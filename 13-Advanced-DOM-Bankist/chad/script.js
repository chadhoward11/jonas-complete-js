'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//using forEach instead of standard for loop
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//original - old way
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//lecture

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(`---section1 rect: `, s1coords);

  console.log(`---learn more button: `, e.target.getBoundingClientRect());

  console.log(
    `---current scroll pos - window offset (x/y):`,
    window.pageXOffset,
    window.pageYOffset
  );

  //old way of doing the scroll
  // window.scrollTo({
  //   left: s1coords + window.pageXOffset,
  //   top: s1coords + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //new way of doing the scroll - only works in modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
//Tabbed component

tabsContainer.addEventListener('click', function (e) {
  //matching strategy
  const clicked = e.target.closest('.operations__tab');

  console.log(clicked);

  //Guard clause
  //In this case, when we click the tabs container,
  //there is no closest parent, so it returns null, which breaks
  //the 'clicked' var above.
  //When that check returns null, it is falsy, so the guard clause
  //simply returns immediately, skips rest
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// ****Passing "argument" into handler***
// cannot actually pass an arg
// Use BIND - returns a function, not a value due to calling a func
// event handler can only have 1 'real' parameter (e/event)
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//these options "work", but ugly to have the function (e) calling another function.
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

///////////////////////////////////////
// Sticky navigation

// event listener for 'scroll' should not be used - fires too much
// here for reference
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// //I changed it to be sticky based on nav height - ch
// const navBox = nav.getBoundingClientRect();
// console.log(`---nav box`);
// console.log(navBox);

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);

//   if (window.scrollY > navBox.height) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

///////////////////////////////////////
// INTERSECTION OBSERVER API

//Example
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, //null means entire viewport
//   threshold: [0, 0.2], //can be array - 0% will trigger when target is completely "out" of the viewport, or as soon as any part enters the view. 1 (100%) would mean the entire target is visible - not possible with current target of "section1" because that section does not fit completely within viewport
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

///////////////////////////////////////
//
// Observer for header
// header var created at top of file
const stickyNav = function (entries, observer) {
  const [entry] = entries; //this is destructure example, which is same as writing entries[0].  There is only one entry since there is only one threshold defined below.

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: [0],
  rootMargin: `-${navHeight}px`, //navHeight var at top of file; must use px - percent and rem won't work...browser error message indicates pixels or percent are allowed (?)
};
const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

///////////////////////////////////////
// Revealing elements on scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revealOptions = {
  root: null,
  threshold: [0.15],
  rootMargin: '0px',
};
const sectionObserver = new IntersectionObserver(revealSection, revealOptions);

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
