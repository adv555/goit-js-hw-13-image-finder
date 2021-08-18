export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }
  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.lable = document.querySelector('.lable');
    refs.spinner = document.querySelector('.spinner');
    return refs;
  }
  enable() {
    this.refs.button.disabled = false;
    this.refs.lable.textContent = 'Show More';
    this.refs.spinner.classList.add('hidden');
  }
  disable() {
    this.refs.button.disabled = true;
    this.refs.lable.textContent = '';
    this.refs.spinner.classList.remove('hidden');
  }
  show() {
    this.refs.button.classList.remove('hidden');
  }
  hide() {
    this.refs.button.classList.add('hidden');
  }
}
