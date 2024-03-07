export const createBannerWithTimer = () => {
  const main = document.querySelector('.main');
  
  const banner = document.createElement('section');
  banner.classList.add('banner', 'banner-container');
  
  const container = document.createElement('div');
  container.classList.add('container');
  const title = document.createElement('h1');
  title.classList.add('visually-hidden');
  title.textContent = 'Интернет магазин ShopOnline';
  
  const offer = document.createElement('div');
  offer.classList.add('banner__offer', 'offer');
  
  const offerTitle = document.createElement('h2');
  offerTitle.classList.add('offer__title');
  offerTitle.textContent = '-50% на все ноутбуки';
  offerTitle.setAttribute('tabindex', '0');
  
  const offerText = document.createElement('p');
  offerText.classList.add('offer__text');
  offerText.textContent = 'До конца акции:';
  offerText.setAttribute('tabindex', '0');
  
  const offerTimer = document.createElement('div');
  offerTimer.classList.add('offer__timer');
  
  const timer = document.createElement('div');
  timer.classList.add('timer');
  
  timer.dataset.timerDeadline = '2024/03/08 20:23';     // Установка deadline
  
  const timerDay = document.createElement('div');
  timerDay.classList.add('timer__day');
  const timerDayNumber = document.createElement('span');
  timerDayNumber.classList.add('timer__day-number');
  const timerDayWord = document.createElement('span');
  timerDayWord.classList.add('timer__word');
  timerDayWord.textContent = 'дня';
  timerDay.append(timerDayNumber, timerDayWord);
  
  const timerHour = document.createElement('div');
  timerHour.classList.add('timer__hour');
  const timerHourNumber = document.createElement('span');
  timerHourNumber.classList.add('timer__hour-number');
  const timerHourWord = document.createElement('span');
  timerHourWord.classList.add('timer__word');
  timerHourWord.textContent = 'часов';
  timerHour.append(timerHourNumber, timerHourWord);
  
  const timerMinute = document.createElement('div');
  timerMinute.classList.add('timer__minute');
  const timerMinuteNumber = document.createElement('span');
  timerMinuteNumber.classList.add('timer__minute-number');
  const timerMinuteWord = document.createElement('span');
  timerMinuteWord.classList.add('timer__word');
  timerMinuteWord.textContent = 'минуты';
  timerMinute.append(timerMinuteNumber, timerMinuteWord);
  
  const timerSeconds = document.createElement('div');
  timerSeconds.classList.add('timer__seconds');
  const timerSecondsNumber = document.createElement('span');
  timerSecondsNumber.classList.add('timer__seconds-number');
  const timerSecondsWord = document.createElement('span');
  timerSecondsWord.classList.add('timer__word');
  timerSecondsWord.textContent = 'секунды';
  timerSeconds.append(timerSecondsNumber, timerSecondsWord);
  
  timer.append(timerDay, timerHour, timerMinute, timerSeconds);
  offerTimer.append(offerText, timer);
  offer.append(offerTitle, offerTimer);
  container.append(title, offer);
  banner.append(container);
  main.prepend(banner);
};
