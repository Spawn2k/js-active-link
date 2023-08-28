console.clear();

const sectionEls = document.querySelectorAll('.section');
const headerEl = document.querySelector('.header');
const navLinkEls = document.querySelectorAll('.nav-link');
const popoverEl = document.querySelector('.popover');
const contentEl = document.querySelector('.content');
const arrowEl = document.querySelector('.arrow');
const backgroundEl = document.querySelector('.background');

const sections = ['react', 'js', 'md'];

// TODO: generate on the fly
const dimensions = {
  react: { width: 590, height: 280, x: 0 },
  js: { width: 390, height: 340, x: 100 },
  md: { width: 300, height: 296, x: 200 },
};

const popoverLeft = popoverEl.getBoundingClientRect().x;

navLinkEls.forEach((navLink) => {
  let section = navLink.getAttribute('data-nav');
  let rect = navLink.getBoundingClientRect();
  dimensions[section].arrowX = rect.left + rect.width / 2 - popoverLeft;
});

// Set initial arrow position
arrowEl.style.transform = `
  translateX(${dimensions.react.arrowX}px)
  rotate(45deg)`;

function showSection(section, idx) {
  popoverEl.classList.add('open');
  sectionEls.forEach((el) => el.classList.remove('active'));
  document.querySelector(`.section-${section}`).classList.add('active');
  const content = sectionEls[idx];
  const contentCoord = content.getBoundingClientRect();

  const pos = navLinkEls[idx].getBoundingClientRect();

  const coords = {
    width: contentCoord.width / 100,
    height: contentCoord.height / 100,
    top: contentCoord.top,
    left: contentCoord.left,
    center: contentCoord.width / 2,
  };
  const posCoord = {
    left: pos.left - coords.center,
  };

  console.log(coords.width * 100, coords.height * 100);
  console.log(posCoord.left - coords.center);
  // Position arrow
  arrowEl.style.transform = `
    translateX(${pos.left}px)
    rotate(45deg)`;

  // Resize and position background

  backgroundEl.style.transform = `
    translateX(${posCoord.left}px)
    scaleX(${coords.width})
    scaleY(${coords.height})
  `;

  // Resize and position content
  contentEl.style.width = coords.width * 100 + 'px';
  contentEl.style.height = coords.height * 100 + 'px';

  contentEl.style.transform = `translateX(${posCoord.left}px)`;

  // size container? If we remove from CSS and do everything dynamically.
}

navLinkEls.forEach((navLink, idx) => {
  navLink.addEventListener('mouseenter', (e) => {
    let targetPopover = e.target.getAttribute('data-nav');

    showSection(targetPopover, idx);
  });
});

headerEl.addEventListener('mouseleave', () => {
  popoverEl.classList.remove('open');
});

navLinkEls.forEach((link, idx) => {
  link.addEventListener('mouseenter', (e) => {
    show(idx);
  });
});

function show(idx, e) {
  const content = sectionEls[idx];
  const contentCoord = content.getBoundingClientRect();

  const coords = {
    width: contentCoord.width,
    height: contentCoord.height,
    top: contentCoord.top,
    left: contentCoord.left,
  };
}
