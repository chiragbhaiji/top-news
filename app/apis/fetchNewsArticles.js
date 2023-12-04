import {newsAPI} from './index';

export const fetchNewsArticles =
  (page = 1) =>
  async (
    params = {
      page,
      language: 'en',
      q: 'Food delivery',
    },
  ) => {
    try {
      const {data} = await newsAPI.get('/v2/everything', {params});
      return data.articles;
    } catch (error) {
      console.error(
        'Error occurred while fetching news articles.',
        error.message,
      );
    }
  };
