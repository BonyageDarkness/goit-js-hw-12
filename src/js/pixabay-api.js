import axios from 'axios';

const apiKey = '44822574-4b43621c9303530917b2f490d';
const apiUrl = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&orientation=horizontal&safesearch=true`;

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: query,
        page: page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
