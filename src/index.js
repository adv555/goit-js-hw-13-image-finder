import './sass/main.scss';
import refs from './js/refs';
import imageCardTpl from './templates/image-card';
import ImageServiceApi from './js/fetch-Images';
import LoadMoreBtn from './js/load-more-btn';
import createNotice from './js/notices';
import zoomImage from './js/image-lightbox';

// =========== refs

// =========== new class
const imageServiceApi = new ImageServiceApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

// =========== listeners

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', zoomImage);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

// =========== search

function onSearch(e) {
  e.preventDefault();

  imageServiceApi.query = e.currentTarget.elements.query.value;
  if (imageServiceApi.query == '' || imageServiceApi.query == null) {
    return createNotice();
  }
  loadMoreBtn.show();
  loadMoreBtn.disable();
  imageServiceApi.resetPage();

  imageServiceApi
    .fetchImages()
    .then(data => {
      refs.gallery.innerHTML = '';
      renderSearchContent(data);

      loadMoreBtn.refs.button.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      loadMoreBtn.enable();
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
  loadMoreBtn.disable();
  imageServiceApi
    .fetchImages()
    .then(data => {
      renderSearchContent(data);
      loadMoreBtn.refs.button.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      loadMoreBtn.enable();
    })
    .catch(err => console.log(err));
}
