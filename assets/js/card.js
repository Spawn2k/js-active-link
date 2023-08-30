'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.divEls = document.querySelectorAll('.react-content');
  DOM.pEls = document.querySelectorAll('.react-content p');
  DOM.titleBgEl = document.querySelector('.title-bg');
  DOM.bgEl = document.querySelector('.content-bg');
  DOM.sectionEl = document.querySelector('.section');
  DOM.h3El = Array.from(document.querySelectorAll('h3'));
  DOM.svgEl = document.querySelector('svg');

  DOM.contentTextEls = document.querySelectorAll('.content-text');
  console.log(DOM);

  let rotate = 0;
  // === INIT =============
  const init = () => {
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

    const contentTextPos = DOM.contentTextEls[idx].getBoundingClientRect();
    const currElCoord = currEl.getBoundingClientRect();

    const coord = {
      width: currElCoord.width + 16,
      height: currElCoord.height + 59,
      top: currEl.offsetTop - 27.5,
      left: currEl.offsetLeft - 16,
    };
    // const pos = DOM.divEls[0].getBoundingClientRect();

    // DOM.svgEl.classList.remove('rotate');
    // DOM.svgEl.style.transform = `rotate(0deg)`;

    // const oldEl = DOM.h3El.indexOf(document.querySelector('.rotate'));
    // DOM.h3El.forEach((h3) => h3.classList.remove('rotate', 'active'));
    // currEl.classList.add('active');

    // if (oldEl < idx) {
    //   rotate -= 360;
    // } else {
    //   rotate += 360;
    // }

    // const coord = {
    //   width: pos.width,
    //   height: pos.height,
    //   top: pos.top,
    //   left: pos.left,
    // };

    // const titleBgPos = [
    //   {
    //     x: 0,
    //     y: 0,
    //   },
    //   {
    //     x: 0,
    //     y: coord.height,
    //   },
    //   {
    //     x: 0,
    //     y: coord.height * 2,
    //   },
    // ];

    // DOM.titleBgEl.style.transform = `translate(${titleBgPos[idx].x}px,${titleBgPos[idx].y}px)`;

    DOM.titleBgEl.style.width = `${coord.width}px`;
    DOM.titleBgEl.style.height = `${coord.height}px`;

    DOM.titleBgEl.style.transform = `translate(${coord.left}px, ${coord.top}px)`;

    // DOM.svgEl.style.transform = `rotate(${rotate * 360}deg)`;
    // DOM.svgEl.classList.add('rotate');

    console.log(currEl.offsetTop);
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
