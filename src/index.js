import './sass/main.scss';
import refs from './js/refs';
import ImageServiceApi from './js/ImageServiceApi-class';
import LoadMoreBtn from './js/loadMoreBtn-class';
import createNotice from './js/notices';
import zoomImage from './js/image-lightbox';
import backToTopBtn from './js/back-to-top-btn';
import renderSearchContent from './js/render-search-content';

// =========== new class instance
const imageServiceApi = new ImageServiceApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

// =========== listeners

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', zoomImage);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

// =========== search data

function onSearch(e) {
  e.preventDefault();

  imageServiceApi.query = e.currentTarget.elements.query.value;

  if (imageServiceApi.query == '' || imageServiceApi.query == null) {
    return createNotice();
  }

  loadMoreBtn.enableSpinner();
  imageServiceApi.resetPage();

  imageServiceApi
    .fetchImages()
    .then(data => {
      refs.gallery.innerHTML = '';
      renderSearchContent(data);
      checkData(data);
    })
    .catch(err => console.log(err));
}

// ============== on-load-more-btn fn

function onLoadMore() {
  loadMoreBtn.hideBtn();
  loadMoreBtn.enableSpinner();

  imageServiceApi
    .fetchImages()
    .then(data => {
      renderSearchContent(data);
      checkData(data);
    })
    .catch(err => console.log(err));
}

// =========== check data
function checkData(data) {
  if (data.hits.length < 12) {
    loadMoreBtn.disableSpinner();
    loadMoreBtn.hideBtn();

    return createNotice();
  }
  loadMoreBtn.disableSpinner();
  loadMoreBtn.showBtn();

  scrollContent();
}

// ========= smooth scroll
function scrollContent() {
  loadMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

// =========== back-to-top-button
backToTopBtn();
