const API_KEY = '22901299-3a9abb112bfd753d84521cd93';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo&orientation=horizontal';

export default class ImageServiceApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    const url =
      '' +
      BASE_URL +
      '?key=' +
      API_KEY +
      '&image_type=' +
      IMAGE_TYPE +
      '&q=' +
      this.searchQuery +
      '&page=' +
      this.page +
      '&per_page=12';

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.increamentPage();
        // console.log(this);
        // console.log(data);
        return data;
      });
  }
  increamentPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

//============= version 2

// const API_KEY = '22901299-3a9abb112bfd753d84521cd93';
// const BASE_URL = 'https://pixabay.com/api/';
// const IMAGE_TYPE = 'photo&illustration';
// const page = 1;
// const per_page = 12;

// export default function fetchImages(searchQuery) {
//   return fetch(
//     '' +
//       BASE_URL +
//       '?key=' +
//       API_KEY +
//       '&image_type=' +
//       IMAGE_TYPE +
//       '&q=' +
//       searchQuery +
//       '&page=' +
//       page +
//       '&per_page=' +
//       per_page +
//       '',
//   ).then(response => response.json());
// }
