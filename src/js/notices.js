import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import refs from './refs';

// ========= Notices & onFetchError

export default function createNotice() {
  refs.gallery.innerHTML = '';
  error({
    type: 'notice',
    delay: 500,
    minHeight: '80px',
    addClass: 'notice',
    text: 'No image has been found. Please enter a more specific query!',
  });
}
