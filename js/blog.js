import {renderPostsPage} from './render.js';
import {showArticle} from './showArticle.js';

const init = async () => {
  await renderPostsPage();
  showArticle();
};

init();





