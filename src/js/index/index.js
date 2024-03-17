import {createBannerWithTimer} from './createBannerWithTimer.js';
import {createTimer} from './createTimer.js';

const menuBtn = document.querySelector('.navigation__menu-btn');

createBannerWithTimer();
const dataTimerDeadline = document.querySelector('.timer');
const deadline = (dataTimerDeadline.dataset.timerDeadline).trim();
createTimer(deadline);

menuBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  menuBtn.classList.toggle('close-btn');
  const menu = document.querySelector('.menu');
  menu.classList.toggle('open');
});

