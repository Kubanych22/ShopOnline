import {createPage} from './createPage.js';
import {showArticle} from './showArticle.js';

export const getArticles = async (numPage) => {
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${numPage}`);
  return await response.json();
};

let currentPage = 1;
let numPage = 1;

export const renderPostsPage = async () => {
  const posts = await getArticles(numPage);
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
    
    if (navBtnFirst.classList.contains('navigation__btn_active')) {
      navBtnFirst.classList.remove('navigation__btn_active');
      numPage++;
    }
    
    if (navBtnSecond.classList.contains('navigation__btn_active')) {
      navBtnSecond.classList.remove('navigation__btn_active');
      numPage++;
    }
    
    if (navBtnThird.classList.contains('navigation__btn_active')) {
      navBtnThird.classList.remove('navigation__btn_active');
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
    
    if (navBtnFirst.classList.contains('navigation__btn_active')) {
      navBtnFirst.classList.remove('navigation__btn_active');
      numPage--;
    }
    
    if (navBtnSecond.classList.contains('navigation__btn_active')) {
      navBtnSecond.classList.remove('navigation__btn_active');
      numPage--;
    }
    
    if (navBtnThird.classList.contains('navigation__btn_active')) {
      navBtnThird.classList.remove('navigation__btn_active');
      numPage--;
    }
    
    const blog = document.querySelector('.blog');
    blog.remove();
    await renderPostsPage();
    showArticle();
  };
  
  const nextBtn = document.querySelector('.navigation__next');
  const prevBtn = document.querySelector('.navigation__prev');
  nextBtn.addEventListener('click', paginationIncrease);
  prevBtn.addEventListener('click', paginationDecrease);
};
