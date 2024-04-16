import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryEl = document.querySelector('.gallery');

export function imageMarkup(data) {
  const markup = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class= "gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-img" src="${webformatURL}" alt="${tags}"</a> 
        <div class="image-description">
        <p class = "comment">Likes: ${likes}</p>
        <p class = "comment">Views: ${views}</p>
        <p class = "comment">Comments: ${comments}</p>
        <p class = "comment">Downloads: ${downloads}</p></div>
        </li>`;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: 'alt',
    captionPosition: 'bottom',
  });
  lightbox.refresh();
}
