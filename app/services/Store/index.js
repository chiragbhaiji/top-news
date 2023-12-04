import {MMKV} from 'react-native-mmkv';

import {StoreKey} from './utils';

export const createMMKVStore = transformer => {
  const store = new MMKV();

  const getArticles = () => {
    const articlesString = store.getString(StoreKey.articles);
    try {
      return JSON.parse(articlesString);
    } catch {
      return [];
    }
  };

  const saveArticles = articles => {
    let transformedData = articles;

    if (transformer) {
      transformedData = transformer(articles);
    }

    store.set(StoreKey.articles, JSON.stringify(transformedData));

    return transformedData;
  };

  return {
    getArticles,
    saveArticles,
  };
};
