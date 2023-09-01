'use strict';
(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.sectionEls = Array.from(document.querySelectorAll('section'));
  DOM.navLinkEls = Array.from(document.querySelectorAll('nav a'));
  DOM.navEl = document.querySelector('nav');
  DOM.logoEl = document.querySelector('.logo');
  DOM.homeEl = document.querySelector('#home');
  DOM.aboutEl = document.querySelector('#about');
  DOM.servicesEl = document.querySelector('#services');
  DOM.portfolioEl = document.querySelector('#portfolio');
  DOM.contactEl = document.querySelector('#contact');

  const body = document.body;
  let lastScroll = 0;

  // === INIT =============

  const init = () => {
    window.addEventListener('scroll', onScrollActiveLink);

    DOM.navEl.addEventListener('click', onClickNav);
    DOM.logoEl.addEventListener('click', onClickLogo);
  };

  // === EVENTHANDLER =====

  const onScrollActiveLink = (e) => {
    // navOnScrollReveal(e);
    DOM.sectionEls.forEach((section, idx) => {
      let top = window.scrollY;
      let offset = section.offsetTop - 150;
      let height = section.offsetHeight;
      let id = section.getAttribute('id');
      if (top >= offset && top < offset + height) {
        if (idx === 1) {
          // console.log(oldTab);
          // moveIndicator(oldTab, DOM.navLinkEls[idx]);
        }

        DOM.navLinkEls.forEach((link) => {
          link.classList.remove('active');
          document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        });
      }
    });
  };

  const onClickNav = (e) => {
    // window.removeEventListener('scroll', onScrollActiveLink);
    // e.preventDefault();
    const oldTab = DOM.navEl.querySelector('.active');
    const currentTab = e.target;

    if (currentTab.tagName.toLowerCase() !== 'a') return;

    moveIndicator(oldTab, currentTab);
    // currentTab.classList.add('active');
  };

  const onClickLogo = () => {
    const oldTab = DOM.navEl.querySelector('.active');
    const currentTab = DOM.navLinkEls[0];
    moveIndicator(oldTab, currentTab);
  };
  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const moveIndicator = (oldTab, newTab) => {
    const newTabPosition = oldTab.compareDocumentPosition(newTab);
    const newTabWidth = newTab.offsetWidth / DOM.navEl.offsetWidth;
    let transistionWidth;

    if (newTabPosition === 4) {
      transistionWidth = newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;
    } else {
      transistionWidth = oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;
      DOM.navEl.style.setProperty('--_left', newTab.offsetLeft + 'px');
    }

    DOM.navEl.style.setProperty('--_width', transistionWidth / DOM.navEl.offsetWidth);

    setTimeout(() => {
      DOM.navEl.style.setProperty('--_left', newTab.offsetLeft + 'px');
      DOM.navEl.style.setProperty('--_width', newTabWidth);
    }, 220);
  };

  const navOnScrollReveal = (e) => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      body.classList.remove('scroll-up');
      return;
    }

    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
      body.classList.remove('scroll-up');
      body.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
      body.classList.remove('scroll-down');
      body.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  };

  init();
})();
