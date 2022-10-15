import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '29525143-9c76bb8aba39698f94cc40e50';
export const PER_PAGE = 12;

export const getImages = async (query, page) => {
  const url = `/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
  const response = await axios.get(url);
  return response.data;
};
