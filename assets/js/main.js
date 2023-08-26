'use strict';
(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.sectionEls = Array.from(document.querySelectorAll('section'));
  DOM.navLinkEls = Array.from(document.querySelectorAll('nav a'));
  DOM.navEl = document.querySelector('nav');
  DOM.logoEl = document.querySelector('.logo');

  // === INIT =============

  const init = () => {
    window.onscroll = () => {
      onScrollActiveLink();
    };

    DOM.navEl.addEventListener('click', onClickNav);
    DOM.logoEl.addEventListener('click', onClickLogo);
  };

  // === EVENTHANDLER =====

  const onScrollActiveLink = () => {
    DOM.sectionEls.forEach((section) => {
      let top = window.scrollY;
      let offset = section.offsetTop - 150;
      let height = section.offsetHeight;
      let id = section.getAttribute('id');
      if (top >= offset && top < offset + height) {
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
  init();
})();
