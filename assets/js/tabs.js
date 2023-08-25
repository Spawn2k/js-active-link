'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.tabsContainer = document.querySelector('.tabs-container');
  DOM.tabsList = document.querySelector('ul');
  DOM.tabsButtons = document.querySelectorAll('a');
  DOM.tabsPanels = DOM.tabsContainer.querySelectorAll('.tabs__panels  > div');
  console.log(DOM);

  // === INIT =============
  const init = () => {
    DOM.tabsList.setAttribute('role', 'tablist');

    DOM.tabsButtons.forEach((tab, idx) => {
      tab.setAttribute('role', 'tab');
      if (idx === 0) {
        tab.setAttribute('aria-selected', 'true');
        // we'll add something here
      } else {
        tab.setAttribute('tabindex', '-1');
        DOM.tabsPanels[idx].setAttribute('hidden', '');
      }
    });

    DOM.tabsPanels.forEach((panel) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '0');
    });

    DOM.tabsList.querySelectorAll('li').forEach((listItem) => {
      listItem.setAttribute('role', 'presentation');
    });

    DOM.tabsContainer.addEventListener('click', onClick);

    DOM.tabsContainer.addEventListener('keydown', onKeydown);
  };

  // === EVENTHANDLER =====

  const onClick = (e) => {
    const clickedTab = e.target.closest('a');
    if (!clickedTab) return;
    e.preventDefault();

    switchTab(clickedTab);
  };

  const onKeydown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveright();
        break;
      case 'Home':
        e.preventDefault();
        switchTab(DOM.tabsButtons[0]);
        break;
      case 'End':
        e.preventDefault();
        switchTab(DOM.tabsButtons[DOM.tabsButtons.length - 1]);
        break;
      default:
        break;
    }
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const switchTab = (newTab) => {
    const activePanelId = newTab.getAttribute('href');
    const activePanl = DOM.tabsContainer.querySelector(activePanelId);

    DOM.tabsButtons.forEach((button) => {
      button.setAttribute('aria-selected', false);
      button.setAttribute('tabindex', '-1');
    });

    DOM.tabsPanels.forEach((panel) => {
      panel.setAttribute('hidden', true);
    });

    activePanl.removeAttribute('hidden', false);
    newTab.setAttribute('aria-selected', true);
    newTab.setAttribute('tabindex', '0');
    newTab.focus();
  };

  const moveLeft = () => {
    const currentTab = document.activeElement;

    if (!currentTab.parentElement.previousElementSibling) {
      switchTab(DOM.tabsButtons[DOM.tabsButtons.length - 1]);
    } else {
      switchTab(currentTab.parentElement.previousElementSibling.querySelector('a'));
    }
  };
  const moveright = () => {
    const currentTab = document.activeElement;

    if (!currentTab.parentElement.nextElementSibling) {
      switchTab(DOM.tabsButtons[0]);
    } else {
      switchTab(currentTab.parentElement.nextElementSibling.querySelector('a'));
    }
  };

  init();
})();
