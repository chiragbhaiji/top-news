import {SHA256} from 'crypto-js';

export const StoreKey = {
  articles: 'articles',
};

const generateIdForURL = url => {
  return SHA256(url).toString();
};

const removeNotRequiredData = (
  newsObj,
  keysOfNotRequiredData = ['description', 'content', 'source'],
) => {
  const trimmedNewsObj = {...newsObj};

  keysOfNotRequiredData.forEach(key => delete trimmedNewsObj[key]);

  return trimmedNewsObj;
};

export const transformArticlesForStorage = articles => {
  return articles
    .map(article => {
      const {url, ...rest} = removeNotRequiredData(article);

      if (url === 'https://removed.com') {
        return null;
      } else {
        return {
          id: generateIdForURL(url),
          ...rest,
        };
      }
    })
    .filter(obj => obj !== null);
};
