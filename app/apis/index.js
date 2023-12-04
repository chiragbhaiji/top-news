import axios from 'axios';
import Config from 'react-native-config';

const {NEWS_API_KEY, NEWS_API_BASE_URL} = Config;

const newsAPI = axios.create({
  baseURL: NEWS_API_BASE_URL,
});

newsAPI.defaults.headers.common['X-Api-Key'] = NEWS_API_KEY;

export default newsAPI;
