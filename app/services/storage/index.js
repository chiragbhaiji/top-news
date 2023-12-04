import {MMKV} from 'react-native-mmkv';

import {StoreKey} from './utils';

const storage = new MMKV();

export const storeNewsArticles = articles => {
  storage.set(StoreKey.articles, JSON.stringify(articles));
};

export const getNewsArticles = () => {
  const articlesString = storage.getString(StoreKey.articles);
  try {
    return JSON.parse(articlesString);
  } catch {
    return [];
  }
};
