'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');

// const mssg = document.createElement('div');
// mssg.classList.add('cookie-message');
// // mssg.textContent('We use cookies bla bla bla bla bla bla bla bla bla');

// mssg.innerHTML = `We use cookies bla bla bla bla bla bla bla bla bla <button class='btn btn--close-cookie'>Got it</button>`;
// header.append(mssg);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     mssg.parentElement.removeChild(mssg);
//   });

// mssg.style.backgroundColor = '#37383d';
// mssg.style.width = '120%';

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function () {
//   alert('holanda');
// });

btnScroll.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1cords.left + window.pageXOffset,
    top: s1cords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

const hide = el => el.forEach(e => (e.style.display = 'none'));

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const i = this.getAttribute('href');
//     console.log(i);
//     document.querySelector(i).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document
      .querySelector(id)
      .scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab'),
  tabsContainer = document.querySelector('.operations__tab-container'),
  tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
const handleMouseMoveInNav = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target,
      siblings = link.closest('.nav').querySelectorAll('.nav__link'),
      logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', function (e) {
  handleMouseMoveInNav(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleMouseMoveInNav(e, 1);
});
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// const obsCallback = function (entries, observer) {

// };

// const obsOption = {
//   root: null,
//   treshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

const allSection = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};

const sectionObserve = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(section => {
  sectionObserve.observe(section);
  section.classList.add('section--hidden');
});

const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => {
  imgObserver.observe(img);
});
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;
  const createDots = () => {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeEnd',
        `<Button class='dots__dot' data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const goSlide = slide => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goSlide(curSlide);
    activateDot(curSlide);
  };
  const init = () => {
    goSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// window.addEventListener('beforeunload',function(e){
//   e.preventDefault()
//   console.log(e)
//   e.returnValue = ''
// })
