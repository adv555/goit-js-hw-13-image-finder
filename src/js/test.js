// import './sass/main.scss';
// import imageCardTpl from './templates/image-card';
import fetchImages from './js/fetch-Images';
var debounce = require('lodash.debounce');

const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.js-gallery'),
};
console.log(refs.searchForm);
console.log(refs.gallery);
refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const query = e.target.value;
  // refs.gallery.innerHTML = '';
  // console.log(query);

  return fetchImages(query)
    .then(data => {
      // console.log(data.hits[2]);
      const arr = data.hits;
      const marckup = arr.reduce((acc, { webformatURL, likes, views, comments, downloads }) => {
        return (
          acc +
          `<li><div class='photo-card'>
    <img src=${webformatURL} alt='' />

    <div class='stats'>
      <p class='stats-item'>
        <i class='material-icons'>thumb_up</i>
        ${likes}
      </p>
      <p class='stats-item'>
        <i class='material-icons'>visibility</i>
        ${views}
      </p>
      <p class='stats-item'>
        <i class='material-icons'>comment</i>
        ${comments}
      </p>
      <p class='stats-item'>
        <i class='material-icons'>cloud_download</i>
        ${downloads}
      </p>
    </div>
  </div></li>`
        );
      }, '');
      return marckup;
    })
    .then(marckup => (refs.gallery.innerHTML = marckup))
    .catch(err => console.log(err));
}
// refs.gallery.insertAdjacentHTML('beforeend', marckup);
// function creatCardsMarckup(data, template) {
//   refs.gallery.innerHTML = template(data);
// }

// function renderSearchContent(data) {
//   creatCardsMarckup(data, imageCardTpl);
// }

//========= fn fetch-image
const API_KEY = '22901299-3a9abb112bfd753d84521cd93';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo&illustration';
const page = 1;
const per_page = 12;

export default function fetchImages(searchQuery) {
  return fetch(
    '' +
      BASE_URL +
      '?key=' +
      API_KEY +
      '&image_type=' +
      IMAGE_TYPE +
      '&q=' +
      searchQuery +
      '&page=' +
      page +
      '&per_page=' +
      per_page +
      '',
  ).then(response => response.json());
}

// ========= class
const API_KEY = '22901299-3a9abb112bfd753d84521cd93';
const BASE_URL = 'https://pixabay.com/api/';

const url = `${BASE_URL}?key=${API_KEY}&image_type=photo&illustration&per_page=12`;

export default function fetchImages(searchQuery) {
  page = 1;
  searchQuery = '';
  const requestParam = `&q=${this.query}&page=${this.page}`;

  return fetch(url + requestParam)
    .then(response => response.json())
    .then((page += 1));
}

// ======= index.js

import './sass/main.scss';
import imageCardTpl from './templates/image-card';
import fetchImages from './js/fetch-Images';
var debounce = require('lodash.debounce');

// =========== refs
const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.js-gallery'),
  loadMoreBtn: document.querySelector('.btn'),
};
console.log(refs.searchForm);
console.log(refs.gallery);

// =========== listeners
// refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// =========== search

function onSearch(e) {
  e.preventDefault();
  console.log(e.currentTarget.elements);
  const query = e.currentTarget.elements.query.value;

  fetchImages(query)
    .then(data => renderSearchContent(data))
    .catch(err => console.log(err));
}

function creatCardsMarckup(data, template) {
  refs.gallery.innerHTML = template(data);
}

function renderSearchContent(data) {
  const arr = data.hits;
  creatCardsMarckup(arr, imageCardTpl);
}

// ============== btn

function onLoadMore(e) {
  console.dir(e.target);
  e.preventDefault();
  fetchImages(query)
    .then(data => renderSearchContent(data))
    .catch(err => console.log(err));
}
