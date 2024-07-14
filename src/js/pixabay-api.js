export function fetchImages(query) {
  const apiKey = '44822574-4b43621c9303530917b2f490d';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(apiUrl).then(response => response.json());
}
