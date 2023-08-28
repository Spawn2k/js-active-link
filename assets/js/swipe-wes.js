'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.liEls = document.querySelectorAll('.cool > li');
  DOM.bgDropDown = document.querySelector('.dropdownBackground');
  DOM.navEl = document.querySelector('.top');

  // === INIT =============
  const init = () => {
    DOM.liEls.forEach((li) => {
      li.addEventListener('mouseenter', onMouseEnterLi);
      li.addEventListener('mouseleave', onMouseLeaveLi);
    });
  };

  // === EVENTHANDLER =====

  const onMouseEnterLi = (e) => {
    const liEl = e.target;
    liEl.classList.add('trigger-enter');
    setTimeout(() => {
      if (liEl.classList.contains('trigger-enter')) {
        liEl.classList.add('trigger-enter-active');
      }
    }, 150);

    DOM.bgDropDown.classList.add('open');

    const dropdownEl = liEl.querySelector('.dropdown');
    const dropdownCoords = dropdownEl.getBoundingClientRect();
    const navCoords = DOM.navEl.getBoundingClientRect();

    const coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top - navCoords.top,
      left: dropdownCoords.left - navCoords.left,
    };

    DOM.bgDropDown.style.setProperty('width', coords.width + 'px');
    DOM.bgDropDown.style.setProperty('height', coords.height + 'px');
    DOM.bgDropDown.style.setProperty('transform', `translate(${coords.left}px ,${coords.top}px)`);
  };
  const onMouseLeaveLi = (e) => {
    const liEl = e.target;
    liEl.classList.remove('trigger-enter', 'trigger-enter-active');

    DOM.bgDropDown.classList.remove('open');
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
