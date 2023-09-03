'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  const sectionEls = document.querySelectorAll('.section');
  const headerEl = document.querySelector('.header');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const popoverEl = document.querySelector('.popover');
  const contentEl = document.querySelector('.content');
  const arrowEl = document.querySelector('.arrow');
  const backgroundEl = document.querySelector('.background');
  const videoEl = document.querySelectorAll('.slider-content video');

  // === INIT =============
  const init = () => {
    window.addEventListener('load', onLoad);

    navLinkEls.forEach((navLink, idx) => {
      navLink.addEventListener('mouseenter', (event) => {
        showSection(idx);
      });
    });

    headerEl.addEventListener('mouseleave', () => {
      popoverEl.classList.remove('open');
    });
  };

  // === EVENTHANDLER =====
  const onLoad = (e) => {
    const productsPos = sectionEls[0].getBoundingClientRect();
    const navLinkElsPos = navLinkEls[0].getBoundingClientRect();

    const productsCoord = {
      left: productsPos.left,
      top: productsPos.top,
      width: productsPos.width,
      height: productsPos.height,
    };

    const navLinkElsCoord = {
      width: navLinkElsPos.width,
      height: navLinkElsPos.height,
      left: navLinkElsPos.left,
      top: navLinkElsPos.top,
    };

    backgroundEl.style.transform = `
    translateX(${navLinkElsCoord.left}px)
    scaleX(${productsCoord.width / 100})
    scaleY(${productsCoord.height / 100})
  `;

    contentEl.style.width = productsCoord.width + 'px';
    contentEl.style.height = productsCoord.height + 'px';

    arrowEl.style.transform = `
    translateX(${navLinkElsCoord.width / 2 + navLinkElsCoord.left}px)
    rotate(45deg)`;

    contentEl.style.transform = `translateX(${navLinkElsCoord.left}px)`;
  };

  function showSection(idx) {
    popoverEl.classList.add('open');
    sectionEls.forEach((el) => el.classList.remove('active'));
    sectionEls[idx].classList.add('active');
    const productsPos = sectionEls[idx].getBoundingClientRect();
    const navLinkElsPos = navLinkEls[idx].getBoundingClientRect();

    const productsCoord = {
      left: productsPos.left,
      top: productsPos.top,
      width: productsPos.width,
      height: productsPos.height,
    };

    const navLinkElsCoord = {
      width: navLinkElsPos.width,
      height: navLinkElsPos.height,
      left: navLinkElsPos.left,
      top: navLinkElsPos.top,
    };

    let arrowPos = navLinkElsCoord.width / 2 + navLinkElsCoord.left;

    if (idx === 1) {
      const jsCenter = navLinkElsCoord.width / 2;
      const contentCenter = productsCoord.width / 2;
      navLinkElsCoord.left = navLinkElsCoord.left + jsCenter - contentCenter;
      arrowPos = navLinkElsCoord.left + contentCenter;
    }

    if (idx === 2) {
      let left = navLinkElsCoord.width + navLinkElsCoord.left - productsCoord.width;
      navLinkElsCoord.left = left;
    }

    // Position arrow
    arrowEl.style.transform = `
      translateX(${arrowPos}px)
      rotate(45deg)`;

    // Resize and position background
    backgroundEl.style.transform = `
      translateX(${navLinkElsCoord.left}px)
      scaleX(${productsCoord.width / 100})
      scaleY(${productsCoord.height / 100})
    `;

    // Resize and position content
    contentEl.style.width = productsCoord.width + 'px';
    contentEl.style.height = productsCoord.height + 'px';

    contentEl.style.transform = `translateX(${navLinkElsCoord.left}px)`;

    sectionEls.forEach((section) => {
      if (section.classList.contains('active')) {
        videoEl.forEach((video) => {
          video.pause();
        });
      }
    });
  }

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
