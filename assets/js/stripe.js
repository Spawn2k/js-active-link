'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.navBtns = document.querySelectorAll('.nav .nav-link');
  DOM.contentSectons = document.querySelectorAll('.section');
  DOM.bgContent = document.querySelector('.background');
  DOM.headerEl = document.querySelector('.header');
  DOM.popContainer = document.querySelector('.popover-container');
  DOM.popoverEl = document.querySelector('.popover');

  console.log(DOM);

  // === INIT =============
  const init = () => {
    DOM.navBtns.forEach((btn, idx) => {
      btn.addEventListener('mouseenter', (e) => {
        onMouseEnter(e, idx);
      });

      btn.addEventListener('mouseleave', (e) => {
        onMouseLeave(e, idx);
      });
    });

    DOM.headerEl.addEventListener('mouseleave', (e) => {
      console.log('leave');
    });
  };

  // === EVENTHANDLER =====

  const onMouseEnter = (e, idx) => {
    // DOM.contentSectons.forEach((section) => section.classList.remove('active'));

    const btn = e.target.getBoundingClientRect();
    const content = DOM.contentSectons[idx];
    const contentSize = content.getBoundingClientRect();
    const startPos = DOM.popContainer.getBoundingClientRect().left;
    const btnCoord = {
      left: btn.left,
      top: btn.top,
      with: btn.width,
    };

    const contentCoord = {
      width: contentSize.width,
      height: contentSize.height,
    };

    let offsetPos = btnCoord.left - startPos - contentCoord.width / 2 + btnCoord.with / 2;
    content.classList.add('active');
    DOM.bgContent.classList.add('active');

    DOM.bgContent.style.transform = `scaleX(${contentCoord.width / 100}) scaleY(${
      contentCoord.height / 100
    }) translateX(${0}px) rotateX(0deg)`;

    DOM.bgContent.style.setProperty('left', `${offsetPos.toFixed(2)}px`);
    content.style.setProperty('left', `${offsetPos.toFixed(2)}px`);
    content.style.transitionDelay = '0.1s';
  };

  const onMouseLeave = (e, idx) => {
    const content = DOM.contentSectons[idx];
    content.classList.remove('active');
    DOM.bgContent.classList.remove('active');
    content.style.transitionDelay = '0s';
    // DOM.contentSectons.forEach((section) => section.classList.remove('active'));
    // const contentSize = content.getBoundingClientRect();
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
