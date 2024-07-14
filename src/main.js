import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('search-button')
    .addEventListener('click', function () {
      const searchInput = document.getElementById('search-input').value.trim();

      if (searchInput === '') {
        iziToast.error({
          title: 'Error',
          message: 'Search input cannot be empty',
        });
        return;
      }

      document.getElementById('loading').style.display = 'block';
      document.getElementById('gallery').classList.add('hidden');
      document.querySelector('.gallery').innerHTML = '';

      fetchImages(searchInput)
        .then(data => {
          document.getElementById('loading').style.display = 'none';

          displayImages(data.hits);
        })
        .catch(error => {
          document.getElementById('loading').style.display = 'none';
          console.error('Fetch error:', error);
          iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images. Please try again later.',
          });
        });
    });
});
