(function () {
  'use strict';

  (() => {
    // === DOM & VARS =======
    const DOM = {};
    DOM.sectionEls = Array.from(document.querySelectorAll('section'));
    DOM.navLinkEls = document.querySelectorAll('nav a');

    // === INIT =============
    const init = () => {
      window.onscroll = () => {
        onScrollActiveLink();
      };
    };

    // === EVENTHANDLER =====
    const onScrollActiveLink = () => {
      DOM.sectionEls.forEach((section) => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');
        console.log(offset + height);
        if (top >= offset && top < offset + height) {
          DOM.navLinkEls.forEach((link) => {
            link.classList.remove('active');
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
          });
        }
      });
    };
    // === XHR/FETCH ========

    // === FUNCTIONS ========

    init();
  })();

})();
