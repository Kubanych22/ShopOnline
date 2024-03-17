export const createTimer = (deadline) => {
  const timerDay = document.querySelector('.timer__day-number');
  const timerHour = document.querySelector('.timer__hour-number');
  const timerMinute = document.querySelector('.timer__minute-number');
  const timerSeconds = document.querySelector('.timer__seconds-number');
  const day = timerDay.parentElement;
  const seconds = timerSeconds.parentElement;
  
  const getTimeRemaining = () => {
    const dateStop = new Date(deadline);
    const dateNow = new Date();
    
    let hourUTC = new Date().getTimezoneOffset() / 60;
    
    hourUTC < 0 ? hourUTC += 3 : hourUTC -= 3;
    
    dateNow.setHours(dateNow.getHours() + hourUTC);
    
    const timeRemaining = dateStop - dateNow;
    
    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    
    return {timeRemaining, days, hours, minutes, seconds};
  };
  
  const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 :
      [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  };
  
  const start = () => {
    let intervalId, delay;
    const timer = getTimeRemaining();
    const timerBlock = document.querySelector('.offer__timer');
    
    if (timer.days !== 0) {
      timerDay.textContent = '' + timer.days;
      timerDay.nextSibling.textContent = declensionNum(timer.days, ['день', 'дня', 'дней']);
      seconds.remove();
      timerBlock.style.backgroundColor = '#890005';
      delay = 1000 * 60;
    } else {
      day.remove();
      timerBlock.style.backgroundColor = '#566b35';
      delay = 1000;
    }
    
    timerHour.textContent = ('0' + timer.hours).slice(-2);
    timerHour.nextSibling.textContent = declensionNum(timer.hours, ['час', 'часа', 'часов']);
    timerMinute.textContent = ('0' + timer.minutes).slice(-2);
    timerMinute.nextSibling.textContent = declensionNum(timer.minutes, ['минута', 'минуты', 'минут']);
    timerSeconds.textContent = ('0' + timer.seconds).slice(-2);
    timerSeconds.nextSibling.textContent = declensionNum(timer.seconds, ['секунда', 'секунды', 'секунд']);
    
    intervalId = setTimeout(start, delay);
    
    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      timerBlock.remove();
    }
  };
  
  start();
};
