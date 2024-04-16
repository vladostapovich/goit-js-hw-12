import axios from 'axios';
export async function fetchImages(query, page) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const KEY_API = '?key=43293372-b4e22d1edd78f6a49221e5436';
  const PARAMS = `&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  const url = BASE_URL + END_POINT + KEY_API + PARAMS;

  const res = await axios.get(url);
  return res.data;
}
