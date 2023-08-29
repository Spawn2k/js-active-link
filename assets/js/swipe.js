console.clear();

const sectionEls = document.querySelectorAll('.section');
const headerEl = document.querySelector('.header');
const navLinkEls = document.querySelectorAll('.nav-link');
const popoverEl = document.querySelector('.popover');
const contentEl = document.querySelector('.content');
const arrowEl = document.querySelector('.arrow');
const backgroundEl = document.querySelector('.background');

const sections = ['products', 'developers', 'company'];

// TODO: generate on the fly
const dimensions = {
  products: { width: 590, height: 280, x: 0 },
  developers: { width: 390, height: 340, x: 100 },
  company: { width: 300, height: 296, x: 200 },
};

const popoverLeft = popoverEl.getBoundingClientRect().x;

navLinkEls.forEach((navLink) => {
  let section = navLink.getAttribute('data-nav');
  let rect = navLink.getBoundingClientRect();
  dimensions[section].arrowX = rect.left + rect.width / 2 - popoverLeft;
});

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

  contentEl.style.transform = `translateX(${navLinkElsCoord.left}px)`;
  console.log('load');
};

window.addEventListener('load', onLoad);

// Set initial arrow position
arrowEl.style.transform = `
  translateX(${dimensions.products.arrowX}px)
  rotate(45deg)`;

function showSection(section, idx) {
  popoverEl.classList.add('open');
  sectionEls.forEach((el) => el.classList.remove('active'));
  document.querySelector(`.section-${section}`).classList.add('active');

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

  // Position arrow
  arrowEl.style.transform = `
    translateX(${navLinkElsCoord.width / 2 + navLinkElsCoord.left}px)
    rotate(45deg)`;

  // Resize and position background
  backgroundEl.style.transform = `
    translateX(${navLinkElsCoord.left}px)
    scaleX(${productsCoord.width / 100})
    scaleY(${productsCoord.height / 100})
  `;
  // backgroundEl.style.transform = `
  //   translateX(${dimensions[section].x}px)
  //   scaleX(${dimensions[section].width / dimensions['products'].width})
  //   scaleY(${dimensions[section].height / dimensions['products'].height})
  // `;

  // Resize and position content
  contentEl.style.width = productsCoord.width + 'px';
  contentEl.style.height = productsCoord.height + 'px';

  contentEl.style.transform = `translateX(${navLinkElsCoord.left}px)`;

  // size container? If we remove from CSS and do everything dynamically.
}

navLinkEls.forEach((navLink, idx) => {
  navLink.addEventListener('mouseenter', (event) => {
    let targetPopover = event.target.getAttribute('data-nav');

    showSection(targetPopover, idx);
  });
});

headerEl.addEventListener('mouseleave', () => {
  console.log('leave');
  popoverEl.classList.remove('open');
});
