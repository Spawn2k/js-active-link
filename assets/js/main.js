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

  let execute = true;
  let direction = false;
  let curr;
  let prev;
  let last = true;

  // === INIT =============

  const init = () => {
    window.onscroll = () => {
      onScrollActiveLink();
      let top = window.scrollY;
      // let offset = DOM.contactEl.offsetTop;
      let heightHome = DOM.homeEl.offsetTop;
      let heightAbout = DOM.aboutEl.offsetTop;
      let heightServices = DOM.servicesEl.offsetTop;
      let heightPortfolio = DOM.portfolioEl.offsetTop;
      let heightContact = DOM.contactEl.offsetTop;
    };

    DOM.navEl.addEventListener('click', onClickNav);
    DOM.logoEl.addEventListener('click', onClickLogo);
  };

  // === EVENTHANDLER =====

  const onScrollActiveLink = () => {
    DOM.sectionEls.forEach((section, idx) => {
      let top = window.scrollY;
      let offset = section.offsetTop - 150;
      let height = section.offsetHeight;
      let id = section.getAttribute('id');
      if (top >= offset && top < offset + height) {
        if (section.classList.contains('about')) {
          if (top - offset > 0 && top - (section.nextElementSibling.offsetTop - 150) < 0) {
            // if (idx === 0) position = 0;

            if (!direction) {
              prev = DOM.navLinkEls[idx - 1];
              curr = DOM.navLinkEls[idx];
            } else {
              prev = DOM.navLinkEls[idx + 1];
              curr = DOM.navLinkEls[idx];
            }

            if (execute) {
              moveIndicator(prev, curr);
            }
            execute = false;

            // section.nextElementSibling.offset - 150;
          }
        }
        if (section.classList.contains('services')) {
          if (top - offset > 0 && top - (section.nextElementSibling.offsetTop - 150) < 0) {
            // moveIndicator(DOM.navLinkEls[idx - 1], DOM.navLinkEls[idx]);

            if (direction) {
              prev = DOM.navLinkEls[idx - 1];
              curr = DOM.navLinkEls[idx];
            } else {
              prev = DOM.navLinkEls[idx + 1];
              curr = DOM.navLinkEls[idx];
            }

            if (!execute) {
              moveIndicator(prev, curr);
            }
            execute = true;
            direction = true;
          }
        }

        if (section.classList.contains('Portfolio')) {
          if (top - offset > 0 && top - (section.nextElementSibling.offsetTop - 150) < 0) {
            // moveIndicator(DOM.navLinkEls[idx - 1], DOM.navLinkEls[idx]);
            if (direction && last) {
              prev = DOM.navLinkEls[idx - 1];
              curr = DOM.navLinkEls[idx];
            } else {
              prev = DOM.navLinkEls[idx + 1];
              curr = DOM.navLinkEls[idx];
            }
            if (!last) {
              console.log('fase');
              prev = DOM.navLinkEls[idx + 1];
              curr = DOM.navLinkEls[idx];
              last = true;
            }
            if (execute) {
              moveIndicator(prev, curr);
            }
            console.log('port');
            execute = false;
            direction = false;
          }
        }
        if (section.classList.contains('contact')) {
          if (top - offset > 0) {
            // moveIndicator(DOM.navLinkEls[idx - 1], DOM.navLinkEls[idx]);
            // console.log('log');
            if (!direction) {
              prev = DOM.navLinkEls[idx - 1];
              curr = DOM.navLinkEls[idx];
            } else {
              prev = DOM.navLinkEls[idx - 1];
              curr = DOM.navLinkEls[idx];
            }

            if (!execute) {
              moveIndicator(prev, curr);
            }
            execute = true;
            direction = true;
            last = false;
          }
        }

        DOM.navLinkEls.forEach((link) => {
          link.classList.remove('active');
          document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        });
      }
    });
  };

  const onClickNav = (e) => {
    const oldTab = DOM.navEl.querySelector('.active');
    const currentTab = e.target;
    if (currentTab.tagName.toLowerCase() !== 'a') return;

    moveIndicator(oldTab, currentTab);
  };

  const onClickLogo = () => {
    const oldTab = DOM.navEl.querySelector('.active');
    const currentTab = DOM.navLinkEls[0];
    moveIndicator(oldTab, currentTab);
  };
  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const moveIndicator = (oldTab, newTab, position = 4) => {
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

  init();
})();
