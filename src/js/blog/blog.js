import {renderPostsPage} from './render.js';
import {showArticle} from './showArticle.js';

const menuBtn = document.querySelector('.navigation__menu-btn');

menuBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  menuBtn.classList.toggle('close-btn');
  const menu = document.querySelector('.menu');
  menu.classList.toggle('open');
});

const renderBlog = async () => {
  await renderPostsPage();
  showArticle();
};

await renderBlog();
