import './sass/main.scss';
import refs from './js/refs';
import imageCardTpl from './templates/image-card';
import ImageServiceApi from './js/fetch-Images';
// import LoadMoreBtn from './js/load-more-btn';
import createNotice from './js/notices';
// var debounce = require('lodash.debounce');

// =========== refs

// =========== listeners
// refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// =========== new class
const imageServiceApi = new ImageServiceApi();
// const loadMoreBtn = new LoadMoreBtn();

// =========== search

function onSearch(e) {
  e.preventDefault();
  // console.log(e.currentTarget.elements.query.value);
  // const query = e.currentTarget.elements.query.value);
  imageServiceApi.query = e.currentTarget.elements.query.value;
  if (imageServiceApi.query == '' || imageServiceApi.query == null) {
    return createNotice();
  }
  imageServiceApi.resetPage();

  imageServiceApi
    .fetchImages()
    .then(data => {
      refs.gallery.innerHTML = '';
      renderSearchContent(data);
      refs.loadMoreBtn.classList.remove('hidden');

      refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    })
    .catch(err => console.log(err));
}

// =========== marckup

function creatCardsMarckup(data, template) {
  refs.gallery.insertAdjacentHTML('beforeend', template(data));
}

function renderSearchContent(data) {
  const arr = data.hits;
  creatCardsMarckup(arr, imageCardTpl);
}

// ============== btn

function onLoadMore() {
  imageServiceApi
    .fetchImages()
    .then(data => {
      renderSearchContent(data);
      refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    })
    .catch(err => console.log(err));
}
