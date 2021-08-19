import './sass/main.scss';
import refs from './js/refs';
import imageCardTpl from './templates/image-card';
import ImageServiceApi from './js/fetch-Images';
import LoadMoreBtn from './js/load-more-btn';
import createNotice from './js/notices';
import zoomImage from './js/image-lightbox';
import onTopBtn from './js/back-to-top-btn';
// =========== refs

// =========== new class
const imageServiceApi = new ImageServiceApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
// =========== fn
onTopBtn();
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
  // loadMoreBtn.showBtn();
  loadMoreBtn.disableSpinner();
  imageServiceApi.resetPage();

  imageServiceApi
    .fetchImages()
    .then(data => {
      refs.gallery.innerHTML = '';
      renderSearchContent(data);

      loadMoreBtn.enableSpinner();
      loadMoreBtn.showBtn();

      loadMoreBtn.refs.button.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    })
    .catch(err => console.log(err));
}

// ============== btn

function onLoadMore() {
  loadMoreBtn.disableSpinner();
  imageServiceApi
    .fetchImages()
    .then(data => {
      renderSearchContent(data);
      console.log(data.hits.length);
      if (data.hits.length < 12 || data.hits.length < null) {
        loadMoreBtn.disableSpinner();
        loadMoreBtn.hideBtn();
        return;
      }

      loadMoreBtn.enableSpinner();
      loadMoreBtn.showBtn();

      loadMoreBtn.refs.button.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      // loadMoreBtn.enableSpinner();
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
