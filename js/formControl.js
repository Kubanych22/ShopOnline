export const formControl = () => {
  const form = document.querySelector('.form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target;
    const input = target.querySelector('.form__input');
    const paragraph = target.querySelector('.paragraph');
    setTimeout(() => {
      paragraph.textContent = input.value;
    }, 300);
  });
}
