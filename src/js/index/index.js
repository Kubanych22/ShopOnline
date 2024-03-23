import {createBannerWithTimer} from './createBannerWithTimer.js';
import {createTimer} from './createTimer.js';

const menuBtn = document.querySelector('.navigation__menu-btn');
const menu = document.querySelector('.menu');

createBannerWithTimer();
const dataTimerDeadline = document.querySelector('.timer');
const deadline = (dataTimerDeadline.dataset.timerDeadline).trim();
createTimer(deadline);

menuBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  menuBtn.classList.toggle('close-btn');
  menu.classList.toggle('open');
  const menuListWrap = menu.querySelector('.menu__wrap');
  const menuList = menuListWrap.children;
  for (const item of menuList) {
    const innerItem = [...item.querySelectorAll('.inner__list')];
    for (const elem of innerItem) {
      const parent = elem.parentElement;
      parent.addEventListener('click', (evt) => {
        const target = evt.target;
        const ul = target.querySelector('.inner__list');
        if (ul) {
          ul.classList.toggle('expand');
        }
      });
    }
  }
});

