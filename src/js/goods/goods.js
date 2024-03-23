const menuBtn = document.querySelector('.navigation__menu-btn');
const menu = document.querySelector('.menu');
menuBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  menuBtn.classList.toggle('close-btn');
  menu.classList.toggle('open');
  
  const menuListWrap = menu.querySelector('.menu__wrap');
  const menuList = menuListWrap.children;
  for (const item of menuList) {
    const innerItem = [...item.querySelectorAll('.inner__list')];
    for (const elem of innerItem) {
      const parent = elem.parentElement;
      parent.addEventListener('click', (evt) => {
        const target = evt.target;
        const ul = target.querySelector('.inner__list');
        if (ul) {
          ul.classList.toggle('expand');
        }
      });
    }
  }
});

const createBreadcrumbs = () => {
  const nav = document.querySelector('.navigation');
  const breadcrumbsList = document.createElement('ul');
  breadcrumbsList.classList.add('breadcrumbs')
  breadcrumbsList.id = 'breadcrumbs';
  let breadcrumbsItem;
  breadcrumbsItem = document.createElement('li');
  breadcrumbsItem.classList.add('breadcrumbs__item');
  let breadcrumbsLink = document.createElement('a');
  breadcrumbsLink.classList.add('breadcrumbs__link');
  breadcrumbsLink.href = 'index.html';
  breadcrumbsLink.textContent = 'Главная'
  breadcrumbsItem.append(breadcrumbsLink);
  breadcrumbsList.append(breadcrumbsItem);
  nav.append(breadcrumbsList);
  const breadcrumbs = document.querySelector('.breadcrumbs');
  const menuListWrap = menu.querySelector('.menu__wrap');
  const menuList = [...menuListWrap.children];
  for (const item of menuList) {
    const links = [...item.querySelectorAll('a')];
    const url = links.map(link => {
      return link.getAttribute('href');
    })
    let href = [];
    for (let i = 0; i < url.length; i++) {
      if (url[i] === '#') {
        continue
      }
      href.push(url[i])
    }
   
    const paths = location.href.split('/').slice(3);
    const path = paths[0]
    if (href.toString().includes(path.toString())) {
      const menuItemTitle = item.querySelector('h3');
      breadcrumbsItem = document.createElement('li');
      breadcrumbsItem.classList.add('breadcrumbs__item');
      breadcrumbsItem.textContent = menuItemTitle.textContent;
      breadcrumbs.append(breadcrumbsItem);
      const currentLink = item.querySelector(`a[href*="${path}"]`)
      breadcrumbsItem = document.createElement('li');
      breadcrumbsItem.classList.add('breadcrumbs__item');
      breadcrumbsItem.textContent = currentLink.textContent;
      breadcrumbs.append(breadcrumbsItem);
      break;
    }
  }
}

const goods = () => {
  createBreadcrumbs();
}

goods();
