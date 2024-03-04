import {createPage} from './createPage.js';
import {showArticle} from './showArticle.js';
import preload from './preload.js';

export const getArticles = async (numPage) => {
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${numPage}`);
  return await response.json();
};

export let currentPage = 1;
let numPage = 1;

export const renderPostsPage = async () => {
  const main = document.querySelector('main')
  main.style.minHeight = '2000px';
  preload.show();
  const posts = await getArticles(numPage);
  main.style.minHeight = 'auto';
  preload.remove();
  
  const articlesList = posts.data;
  const page = createPage(articlesList, numPage);
  let navBtnFirst = page.navigationBtnFirst;
  let navBtnSecond = page.navigationBtnSecond;
  let navBtnThird = page.navigationBtnThird;
  
  navBtnFirst.textContent = currentPage;
  navBtnSecond.textContent = currentPage + 1;
  navBtnThird.textContent = currentPage + 2;
  
  const paginationIncrease = async (e) => {
    e.preventDefault();
    
    if (navBtnFirst.classList.contains('nav__btn_active')) {
      navBtnFirst.classList.remove('nav__btn_active');
      numPage++;
    }
    
    if (navBtnSecond.classList.contains('nav__btn_active')) {
      navBtnSecond.classList.remove('nav__btn_active');
      numPage++;
    }
    
    if (navBtnThird.classList.contains('nav__btn_active')) {
      navBtnThird.classList.remove('nav__btn_active');
      numPage++;
      currentPage = numPage;
    }
    
    const blog = document.querySelector('.blog');
    blog.remove();
    await renderPostsPage();
    showArticle();
  };
  
  const paginationDecrease = async (e) => {
    e.preventDefault();
    if (numPage === 1) {
      return;
    }
    if (currentPage === numPage) {
      currentPage -= 3;
    }
    
    if (navBtnFirst.classList.contains('nav__btn_active')) {
      navBtnFirst.classList.remove('nav__btn_active');
      numPage--;
    }
    
    if (navBtnSecond.classList.contains('nav__btn_active')) {
      navBtnSecond.classList.remove('nav__btn_active');
      numPage--;
    }
    
    if (navBtnThird.classList.contains('nav__btn_active')) {
      navBtnThird.classList.remove('nav__btn_active');
      numPage--;
    }
    
    const blog = document.querySelector('.blog');
    blog.remove();
    await renderPostsPage();
    showArticle();
  };
  
  const nextBtn = document.querySelector('.nav__next');
  const prevBtn = document.querySelector('.nav__prev');
  nextBtn.addEventListener('click', paginationIncrease);
  prevBtn.addEventListener('click', paginationDecrease);
};
