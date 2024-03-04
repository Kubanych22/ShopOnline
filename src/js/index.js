import {createBannerWithTimer} from './createBannerWithTimer.js';
import {createTimer} from './createTimer.js';

const init = () => {
 createBannerWithTimer();
 const dataTimerDeadline = document.querySelector('.timer');
 const deadline = (dataTimerDeadline.dataset.timerDeadline).trim();
 createTimer(deadline);
};

init();
