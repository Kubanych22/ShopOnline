const check = (numPage, curentPage) => {
  while (curentPage < 30) {
    if (numPage === curentPage) {
      return true;
    }
    curentPage += 3;
  }
  return false;
};

export const createPage = (articlesList, btnNum) => {
  const blog = document.createElement('section');
  blog.classList.add('blog');
  const container = document.createElement('div');
  container.classList.add('container');
  const blogContainer = document.createElement('div');
  blogContainer.classList.add('blog__container');
  const articlesWrapper = document.createElement('ul');
  articlesWrapper.classList.add('blog__list');
  let articleNum = 1;
  const articles = articlesList.map((item) => {
    const article = document.createElement('li');
    article.classList.add('blog__item');
    const link = document.createElement('a');
    link.classList.add('blog__link');
    link.href = `article.html?id=${item.id}`;
    const img = document.createElement('img');
    img.classList.add('item__img');
    img.src = `https://loremflickr.com/400/400?${articleNum++}`;
    img.alt = 'Превью статьи';
    const title = document.createElement('h2');
    title.classList.add('item__title');
    title.textContent = `${item.title}`;
    link.append(img, title);
    article.append(link);
    return article;
  });
  articlesWrapper.append(...articles);
  blogContainer.append(articlesWrapper);
  container.append(blogContainer);
  
  const navigation = document.createElement('div');
  navigation.classList.add('navigation');
  const navigationPrev = document.createElement('button');
  navigationPrev.classList.add('navigation__prev');
  navigationPrev.type = 'button';
  navigationPrev.innerHTML = `
    <svg class="navigation__prev-img" xmlns="http://www.w3.org/2000/svg" width="37" height="37"
         viewBox="0 0 37 37" fill="none">
      <path
        d="M32.375 16.9583H10.5296L16.0487 11.4237L13.875 9.25L4.625 18.5L13.875 27.75L16.0487 25.5763L10.5296 20.0417H32.375V16.9583Z"
        fill="#8F8F8F"/>
    </svg>
  `;
  
  const navigationList = document.createElement('ul');
  navigationList.classList.add('navigation__list');
  const navigationItemFirst = document.createElement('li');
  navigationItemFirst.classList.add('navigation__item');
  
  const navigationBtnFirst = document.createElement('button');
  navigationBtnFirst.classList.add('navigation__btn', 'navigation__btn_first');
  
  const navigationItemSecond = document.createElement('li');
  navigationItemSecond.classList.add('navigation__item');
  const navigationBtnSecond = document.createElement('button');
  navigationBtnSecond.classList.add('navigation__btn', 'navigation__btn_second');
  
  const navigationItemThird = document.createElement('li');
  navigationItemThird.classList.add('navigation__item');
  const navigationBtnThird = document.createElement('button');
  navigationBtnThird.classList.add('navigation__btn', 'navigation__btn_third');
  if (check(btnNum, 1)) {
    navigationBtnFirst.classList.add('navigation__btn_active')
  }
  if (check(btnNum, 2)) {
    navigationBtnSecond.classList.add('navigation__btn_active')
  }
  if (check(btnNum, 3)) {
    navigationBtnThird.classList.add('navigation__btn_active')
  }
  
  navigationItemFirst.append(navigationBtnFirst);
  navigationItemSecond.append(navigationBtnSecond);
  navigationItemThird.append(navigationBtnThird);
  
  navigationList.append(navigationItemFirst, navigationItemSecond, navigationItemThird);
  
  const navigationNext = document.createElement('button');
  navigationNext.classList.add('navigation__next');
  navigationNext.type = 'button';
  navigationNext.innerHTML = `
    <svg class="navigation__next-img" xmlns="http://www.w3.org/2000/svg" width="37" height="37"
         viewBox="0 0 37 37" fill="none">
      <path
        d="M4.625 16.9583H26.4704L20.9513 11.4237L23.125 9.25L32.375 18.5L23.125 27.75L20.9513 25.5763L26.4704 20.0417H4.625V16.9583Z"
        fill="#3670C7"/>
    </svg>
  `;
  
  navigation.append(navigationPrev, navigationList, navigationNext);
  
  container.append(navigation);
  
  blog.append(container);
  
  document.body.append(blog);
  
  return {
    blog,
    navigationBtnFirst,
    navigationBtnSecond,
    navigationBtnThird,
  };
}
