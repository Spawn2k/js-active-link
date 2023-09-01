'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.buttonEls = document.querySelectorAll('.preview-element');
  DOM.sliderContentEls = document.querySelectorAll('.slider-content');
  DOM.videoEl = document.querySelectorAll('video');
  DOM.titleContainerEls = document.querySelectorAll('preview-element');
  DOM.processEl = document.querySelector('.process');
  const activeClass = 'active';
  const previewClass = 'preview';
  let activeId = null;
  // let timer = startTimer();
  let start = 0;

  // === INIT =============
  const init = () => {
    DOM.buttonEls.forEach((button, idx) => {
      button.addEventListener('click', (e) => onClick(e.target.dataset.slide, idx));
    });

    DOM.titleContainerEls.forEach((title, idx) => (e) => {
      title.addEventListener('click', onClick(e.target.dataset.slide, idx));
    });

    DOM.videoEl.forEach((video) => {
      video.addEventListener('loadedmetadata', (e) => {
        // console.log(video.duration);
      });

      video.addEventListener('timeupdate', (e) => {
        const percent = (100 / DOM.videoEl[0].duration) * DOM.videoEl[0].currentTime;
        console.log(percent);
        DOM.processEl.style.setProperty('--percent', percent - 5.5 + '%');
      });
    });
  };

  // === EVENTHANDLER =====

  const onClick = (slideId, idx) => {
    const video = document.querySelector(`[data-slide="${slideId}"]`);

    if (activeId === slideId) {
      return;
    }

    // if (video.currentTime > 35) {
    // }

    // if (video.currentTime > 0 && idx === 0) return;

    // activeId = slideId;
    // removeActiveSlide(slideId);
    // setNextSlidePreview(slideId);
    // removeActiveBtn();
    // addActiveBtn(slideId);
    // removeActiveButton();
    // addActiveButton(slideId);
    // clearInterval(timer);
    // timer = startTimer();

    // video.currentTime = 0;
    // video.pause();

    // console.log(video.currentTime);
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  function startTimer() {
    return setInterval(() => {
      const nextButton = getActiveButton().nextElementSibling || document.querySelector('.preview-element');
      if (nextButton) {
        onClick(nextButton.dataset.slide);
      }
    }, 5000);
  }

  const setActiveSlide = (id) => {
    const activeSlide = document.querySelector(`#slider-${id}`);
    activeSlide.classList.add(activeClass);
  };

  const removeActiveSlide = (id) => {
    const activeSlide = document.querySelector('.slider-content.active');
    activeSlide.classList.remove(activeClass);
  };

  const setNextSlidePreview = (id) => {
    const preview = document.querySelector(`#slider-${id}`);
    preview.classList.add(previewClass);
    setTimeout(() => {
      setActiveSlide(id);
      preview.classList.remove(previewClass);
    }, 250);
  };

  const addActiveButton = (id) => {
    const activeButton = document.querySelector(`[data-slide="${id}"]`);
    activeButton.classList.add(activeClass);
  };

  const addActiveBtn = (id) => {
    const activeButton = document.querySelector(`[data-p="${id}"]`);
    console.log(activeButton);
    activeButton.classList.add(activeClass);
  };

  const getActiveButton = () => {
    return document.querySelector('.preview-element.active');
  };

  const getActiveBtn = () => {
    return document.querySelector('.btn.active');
  };

  const removeActiveButton = () => {
    getActiveButton().classList.remove(activeClass);
  };

  const removeActiveBtn = () => {
    getActiveBtn().classList.remove(activeClass);
  };

  init();
})();
