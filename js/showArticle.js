const getPost = async (postId) => {
  const response = await fetch(`https://gorest.co.in/public-api/posts${postId}`);
  return await response.json();
};

const getUser = async (userId) => {
  const response = await fetch(`https://gorest.co.in/public/v1/users?id=${userId}`);
  return await response.json();
};

const createArticlePage = (post) => {
  const article = document.createElement('article');
  article.classList.add('article');
  let docTitle = '';
  post.map(async item => {
    const userId = item.user_id;
    const userData = await getUser(userId);
    const user = userData.data;
    let userName;
    if (user.length === 0) {
      userName = 'Информация отсутствует';
    } else {
      userName = user[0].name;
    }
    
    docTitle = document.head.title = `${item.title}`;
    article.innerHTML = `
 <h1 class="visually-hidden">${item.title}</h1>
    <section class="article__body">
      <div class="container">
        <h2 class="article__title">${item.title}</h2>
        <p class="article__text">${item.body}</p>
        <div class="article__details">
          <a class="article__list" href="blog.html">
            <svg class="article__img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 11H6.83L10.41 7.41L9 6L3 12L9 18L10.41 16.59L6.83 13H21V11Z" fill="#2D2D2D"/>
            </svg>
            К списку статей
          </a>
          <a class="article__author" href="mailto:">${userName}</a>
        </div>
      </div>
    </section>
    <section class="ads">
      <div class="container">
        <img class="ads__img" src="img/ads-1.jpg" width="532" height="328" alt="Реклама">
        <img class="ads__img" src="img/ads-2.jpg" width="532" height="328" alt="Реклама">
      </div>
    </section>
 `;
  });
  
  return {article, docTitle};
};

export const showArticle = () => {
  const postList = document.querySelector('.blog__list');
  postList.addEventListener('click', async (e) => {
    e.preventDefault();
    const target = e.target;
    const postLink = target.closest('.blog__link');
    const url = new URL(postLink.href);
    const postId = url.search;
    const postData = await getPost(postId);
    const post = postData.data;
    const {article, docTitle} = createArticlePage(post);
    const blog = document.querySelector('.blog');
    blog.remove();
    document.title = docTitle;
    document.body.append(article);
    window.history.pushState('', docTitle, url.href);
  });
};
