import {newsAPI} from './index';

export const fetchNewsArticles = async ({
  page = 1,
  language = 'en',
  q = 'Food delivery',
}) => {
  try {
    const {data} = await newsAPI.get('/v2/everything', {
      params: {page, language, q},
    });

    return data.articles;
  } catch (error) {
    console.error(
      'Error occurred while fetching news articles.',
      error.message,
    );
  }
};
