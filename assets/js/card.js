'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.titleBgEl = document.querySelector('.title-bg');
  DOM.bgEl = document.querySelector('.content-bg');
  DOM.h3El = Array.from(document.querySelectorAll('h3'));
  DOM.svgEl = document.querySelector('svg');
  DOM.contentTextEls = document.querySelectorAll('.content-text');
  console.log(DOM);

  let rotate = 0;
  // === INIT =============
  const init = () => {
    window.addEventListener('load', onLoad);

    DOM.h3El.forEach((h3, idx) => {
      h3.addEventListener('click', (e) => onClickh3(e, idx));
    });
  };

  // === EVENTHANDLER =====

  // const onLoad = (e) => {
  //   const pos = DOM.divEls[0].getBoundingClientRect();
  //   const contentPos = DOM.pEls[0].getBoundingClientRect();
  //   const secPos = DOM.sectionEl.getBoundingClientRect();
  //   const h3Pos = DOM.h3El[0].getBoundingClientRect();

  //   const h3Coord = {
  //     width: h3Pos.width,
  //   };
  //   const coord = {
  //     width: pos.width,
  //     height: pos.height,
  //     top: pos.top,
  //     left: pos.left,
  //   };

  //   const secCoord = {
  //     width: secPos.width,
  //     height: secPos.height,
  //   };

  //   const bgCoord = {
  //     left: contentPos.left,
  //   };

  //   DOM.titleBgEl.style.width = `${h3Pos.width + 16}px`;
  //   DOM.titleBgEl.style.height = `${coord.height}px`;
  //   DOM.titleBgEl.style.transform = `translate(${16}px , ${16}px)`;

  //   DOM.bgEl.style.transform = `translateX(${h3Pos.width + 32}px)`;
  //   DOM.bgEl.style.width = `${secCoord.width - h3Pos.width}px`;
  //   DOM.bgEl.style.height = `${secCoord.height}px`;
  // };

  const onClickh3 = (e, idx) => {
    const currEl = e.currentTarget;

    const oldEl = DOM.h3El.indexOf(document.querySelector('.rotate'));

    setPositionContent(idx);

    if (oldEl < idx) {
      rotate -= 360;
    } else {
      rotate += 360;
    }

    DOM.h3El.forEach((h3) => h3.classList.remove('rotate'));
    currEl.classList.add('rotate');

    DOM.svgEl.style.transform = `rotate(${rotate}deg)`;

    getPosTitleBg(currEl, idx);
  };

  const onLoad = (e) => {
    const startEl = DOM.h3El[0];
    getPosTitleBg(startEl, 0);
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const getPosTitleBg = (currEl, idx) => {
    // const contentTextPos = DOM.contentTextEls[idx].getBoundingClientRect();
    const currElCoord = currEl.getBoundingClientRect();

    const coord = {
      width: currElCoord.width + 16,
      height: currElCoord.height + 59,
      top: currEl.offsetTop - 27.5,
      left: currEl.offsetLeft - 15,
    };

    DOM.titleBgEl.style.width = `${coord.width}px`;
    DOM.titleBgEl.style.height = `${coord.height}px`;
    DOM.titleBgEl.style.transform = `translate(${coord.left}px, ${coord.top}px)`;
  };

  const setPositionContent = (idx) => {
    if (idx === 0) {
      DOM.contentTextEls[idx].classList.add('active-text');
      DOM.contentTextEls[idx].classList.remove('reset-text');

      DOM.contentTextEls[1].classList.add('reset-up');
      DOM.contentTextEls[1].classList.remove('active-text', 'reset-down');

      DOM.contentTextEls[2].classList.remove('active-text');
      DOM.contentTextEls[2].classList.add('reset-up');
    }

    if (idx === 1) {
      DOM.contentTextEls[0].classList.add('reset-text');
      DOM.contentTextEls[0].classList.remove('active-text');

      DOM.contentTextEls[idx].classList.add('active-text');
      DOM.contentTextEls[idx].classList.remove('reset-up', 'reset-down');

      DOM.contentTextEls[2].classList.remove('active-text');
      DOM.contentTextEls[2].classList.add('reset-up');
    }

    if (idx === 2) {
      DOM.contentTextEls[0].classList.add('reset-text');
      DOM.contentTextEls[0].classList.remove('active-text');

      DOM.contentTextEls[1].classList.add('reset-down');
      DOM.contentTextEls[1].classList.remove('active-text', 'reset-up');

      DOM.contentTextEls[idx].classList.remove('reset-up');
      DOM.contentTextEls[idx].classList.add('active-text');
    }
  };

  init();
})();
