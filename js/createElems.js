export const createElems = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  const form = document.createElement('form');
  form.classList.add('form');
  
  const label = document.createElement('label');
  label.classList.add('form__label');
  label.htmlFor = 'input';
  label.textContent = 'Введите текст и нажмите Enter';
  
  const input = document.createElement('input');
  input.classList.add('form__input');
  input.id = 'input';
  
  const paragraph = document.createElement('p');
  paragraph.classList.add('paragraph');
  
  form.append(label, input, paragraph);
  container.append(form);
  
  const main = document.querySelector('.main');
  main.append(container);
};
