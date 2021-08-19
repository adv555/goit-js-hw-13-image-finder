import refs from './refs';
import imageCardTpl from '../templates/image-card';

// =========== marckup

function creatCardsMarckup(data, template) {
  refs.gallery.insertAdjacentHTML('beforeend', template(data));
}
// ========= renderSearchContent

export default function renderSearchContent(data) {
  const arr = data.hits;
  creatCardsMarckup(arr, imageCardTpl);
}
