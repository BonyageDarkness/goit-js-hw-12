import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

let currentPage = 1;
let currentQuery = '';
let lightbox = null;

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const loadMoreButton = document.getElementById('load-more-button');
  const loadingIndicator = document.getElementById('loading');

  const showLoader = () => {
    console.log('Showing loader');
    loadingIndicator.style.display = 'block';
  };

  const hideLoader = () => {
    console.log('Hiding loader');
    loadingIndicator.style.display = 'none';
  };

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    const searchInput = document.getElementById('search-input').value.trim();

    if (searchInput === '') {
      iziToast.error({
        title: 'Error',
        message: 'Search input cannot be empty',
      });
      return;
    }

    currentQuery = searchInput;
    currentPage = 1;

    showLoader();
    document.getElementById('gallery').classList.add('hidden');
    document.querySelector('.gallery').innerHTML = '';
    loadMoreButton.classList.add('hidden');

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const data = await fetchImages(currentQuery, currentPage);
      hideLoader();

      if (data.hits.length === 0) {
        iziToast.info({
          title: 'Info',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        displayImages(data.hits);
        if (!lightbox) {
          lightbox = new SimpleLightbox('.gallery a');
        } else {
          lightbox.refresh();
        }
        if (currentPage * 15 < data.totalHits) {
          loadMoreButton.classList.remove('hidden');
        } else {
          loadMoreButton.classList.add('hidden');
          iziToast.info({
            title: 'Info',
            message:
              "We're sorry, but you've reached the end of search results.",
          });
        }
      }
    } catch (error) {
      hideLoader();
      console.error('Fetch error:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
    }
  });

  loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    showLoader();
    loadMoreButton.classList.add('hidden');

    try {
      const data = await fetchImages(currentQuery, currentPage);
      hideLoader();

      displayImages(data.hits, true);
      lightbox.refresh();
      if (currentPage * 15 < data.totalHits) {
        loadMoreButton.classList.remove('hidden');
      } else {
        loadMoreButton.classList.add('hidden');
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } catch (error) {
      hideLoader();
      console.error('Fetch error:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
    }
  });
});
