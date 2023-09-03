'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.videoEl = document.querySelectorAll('video');
  DOM.titleContainerEls = document.querySelectorAll('.preview-element');
  DOM.processEl = document.querySelectorAll('.progress-bar');

  let activeId = 1;

  // === INIT =============
  const init = () => {
    DOM.titleContainerEls.forEach((title) => {
      const slideId = Number(title.dataset.slide);
      title.addEventListener('click', (e) => onClick(e, slideId));
    });

    DOM.videoEl.forEach((video, idx) => {
      video.addEventListener('timeupdate', (e) => {
        const percentGym = (100 / DOM.videoEl[idx].duration) * DOM.videoEl[idx].currentTime;
        DOM.processEl[idx].style.setProperty('--percent', percentGym - 5 + '%');
      });
    });
  };

  // === EVENTHANDLER =====

  const onClick = (e, slideId) => {
    const currEl = e.target;
    if (currEl.classList.contains('active')) {
      if (activeId === slideId) {
        return;
      }
    }

    removeActiveControl(currEl, slideId);

    if (currEl.classList.contains('preview-element')) {
      setActiveControl(currEl, slideId);
    }

    pausePrevVideo(currEl);

    if (currEl.classList.contains('preview-element')) {
      activeId = slideId;
    }

    playVideo(currEl, slideId);

    puseVideo(currEl, slideId);
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const playVideo = (el, slideId) => {
    const playBtn = el.dataset.play;
    const isActive = el.parentElement.parentElement.classList.contains('active');
    if (!isActive || !playBtn) return;

    const videoEl = document.querySelector(`[data-video="${slideId}"]`);
    if (!videoEl) return;
    videoEl.play();
  };

  const removeActiveControl = (el, slideId) => {
    const activeEl = document.querySelector('.preview-element.active');
    const slideEl = document.querySelector(`#slider-${activeId}`);
    if (!activeEl || !checkEl(el)) return;
    activeEl.classList.remove('active');
    slideEl.classList.remove('active');
  };

  const setActiveControl = (el, slideId) => {
    setTimeout(() => {
      if (el.classList.contains('preview-element')) el.classList.add('active');
      const slideEl = document.querySelector(`#slider-${slideId}`);
      slideEl.classList.add('active');
    }, 200);
  };

  const pausePrevVideo = (el) => {
    const isActive = el.classList.contains('active');
    if (!isActive) return;
    const video = document.querySelector(`[data-video="${activeId}"]`);
    if (!video) return;
    video.pause();
  };

  const puseVideo = (el, slideId) => {
    const pauseBtn = el.dataset.stop;
    const isActive = el.parentElement.parentElement.classList.contains('active');
    if (!isActive || !pauseBtn) return;
    const video = document.querySelector(`[data-video="${slideId}"]`);
    if (!video) return;
    video.pause();
  };

  const checkEl = (el) => {
    return el.classList.contains('preview-element');
  };

  init();
})();
