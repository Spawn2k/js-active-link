'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.navBtns = document.querySelectorAll('.nav .nav-link');
  DOM.contentSectons = document.querySelectorAll('.section');
  DOM.bgContent = document.querySelector('.background');
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
  };

  // === EVENTHANDLER =====

  const onMouseEnter = (e, idx) => {
    const btn = e.target.getBoundingClientRect();
    const content = DOM.contentSectons[idx];
    const contentSize = content.getBoundingClientRect();
    const btnCoord = {
      left: btn.left,
      top: btn.top,
      with: btn.width,
    };

    const contentCoord = {
      width: contentSize.width,
      height: contentSize.height,
      top: contentSize.top,
      left: contentSize.left,
    };

    let offsetPos = btnCoord.left - contentCoord.left - contentCoord.width / 2 + btnCoord.with / 2;

    DOM.bgContent.style.transform = `scaleX(${contentCoord.width / 100}) scaleY(${
      contentCoord.height / 100
    }) translateX(${0}px)`;

    DOM.bgContent.style.setProperty('left', `${offsetPos}px`);

    console.log(offsetPos);
  };

  const onMouseLeave = (e, idx) => {
    console.log('leave');
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
