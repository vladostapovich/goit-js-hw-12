import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import { galleryEl } from './js/render-functions';
import { imageMarkup } from './js/render-functions';

const formEl = document.querySelector('.img-form');
const loaderEl = document.querySelector('.loader');
const btnMore = document.querySelector('.load-more-btn');

formEl.addEventListener('submit', onFormSubmit);
btnMore.addEventListener('click', onLoadMoreClick);

let query;
let page;
let maxPage;

async function onFormSubmit(event) {
  event.preventDefault();
  hideLoadBtn();
  galleryEl.innerHTML = '';
  query = event.target.elements.picture.value.trim();
  page = 1;

  if (query === '') {
    showError('Sorry, there are no search terms entered. Please try again!');
    return;
  }
  showLoaderEl();
  try {
    const data = await fetchImages(query, page);
    maxPage = Math.ceil(data.totalHits / 15);
    if (data.totalHits === 0) {
      hideLoaderEl();
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    imageMarkup(data);
  } catch (error) {
    showError(error);
  }

  hideLoaderEl();
  checkBtnVisibleStatus();
  event.target.reset();
}

async function onLoadMoreClick() {
  page += 1;
  showLoaderEl();

  try {
    const data = await fetchImages(query, page);
    imageMarkup(data);
  } catch (error) {
    showError(error);
  }

  hideLoaderEl();
  checkBtnVisibleStatus();

  const height = galleryEl.firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}

function showLoadBtn() {
  btnMore.classList.remove('hidden');
}

function hideLoadBtn() {
  btnMore.classList.add('hidden');
}

function showLoaderEl() {
  loaderEl.classList.remove('hidden');
}

function hideLoaderEl() {
  loaderEl.classList.add('hidden');
}

function checkBtnVisibleStatus() {
  if (page >= maxPage) {
    hideLoadBtn();
    showError("We're sorry, but you've reached the end of search results.");
  } else {
    showLoadBtn();
  }
}

function showError(msg) {
  iziToast.error({
    message: msg,
    messageColor: 'white',
    backgroundColor: 'red',
    position: 'topRight',
  });
}
