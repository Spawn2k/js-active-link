'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.text = document.querySelectorAll('.tilesWrap li span');

  // === INIT =============
  const init = () => {
    DOM.text.forEach((text) => {
      text.addEventListener('mouseover', onMouseOver);
    });
  };

  // === EVENTHANDLER =====

  const onMouseOver = (e) => {
    console.log('log');

    const el = e.target;
    console.log(el.offsetWidth);
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
