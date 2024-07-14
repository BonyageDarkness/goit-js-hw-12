import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function displayImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Clear previous images

  if (images.length === 0) {
    iziToast.info({
      title: 'Info',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  images.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    const link = document.createElement('a');
    link.href = image.largeImageURL;
    link.setAttribute('data-lightbox', 'gallery');
    link.setAttribute('target', '_blank'); // Открытие изображения в новом окне

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    link.appendChild(img);
    galleryItem.appendChild(link);

    const infoStatsContainer = document.createElement('div');
    infoStatsContainer.className = 'info-stats-container';

    const infoLabels = ['Likes', 'Views', 'Comments', 'Downloads'];
    const infoValues = [
      image.likes,
      image.views,
      image.comments,
      image.downloads,
    ];

    infoLabels.forEach((label, index) => {
      const infoBlock = document.createElement('div');
      infoBlock.className = 'info-block';

      const info = document.createElement('div');
      info.className = 'info';
      info.textContent = label;

      const stats = document.createElement('div');
      stats.className = 'stats';
      stats.textContent = infoValues[index];

      infoBlock.appendChild(info);
      infoBlock.appendChild(stats);
      infoStatsContainer.appendChild(infoBlock);
    });

    galleryItem.appendChild(infoStatsContainer);
    gallery.appendChild(galleryItem);
  });

  document.getElementById('gallery').classList.remove('hidden');

  // Refresh SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
