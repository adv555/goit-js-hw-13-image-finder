export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hideBtn();
  }
  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.lable = document.querySelector('.lable');
    refs.spinner = document.querySelector('.spinner');
    return refs;
  }
  enableSpinner() {
    this.refs.spinner.classList.remove('hidden');
  }
  disableSpinner() {
    this.refs.spinner.classList.add('hidden');
  }
  showBtn() {
    this.refs.button.classList.remove('hidden');
    this.refs.lable.textContent = 'Show More';
  }
  hideBtn() {
    this.refs.button.classList.add('hidden');
  }
}
