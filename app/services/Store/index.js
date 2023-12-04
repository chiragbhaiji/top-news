import {MMKV} from 'react-native-mmkv';

import {StoreKey, transformArticlesForStorage} from './utils';
import {SyncManager} from '../SyncManager';
import {fetchNewsArticles} from '../../apis/fetchNewsArticles';

export const createMMKVStore = transformer => {
  const store = new MMKV();

  const getLastSyncedTimestamp = () => {
    return store.getNumber(StoreKey.lastSyncTimestamp) ?? null;
  };

  const get = () => {
    const articlesString = store.getString(StoreKey.articles);
    try {
      return JSON.parse(articlesString);
    } catch {
      return [];
    }
  };

  const save = articles => {
    let transformedData = articles;

    if (transformer) {
      transformedData = transformer(articles);
    }

    store.set(StoreKey.articles, JSON.stringify(transformedData));
    store.set(StoreKey.lastSyncTimestamp, Date.now());

    return transformedData;
  };

  return {
    get,
    save,
    getLastSyncedTimestamp,
  };
};

export const createSyncManager = onEvent => {
  return new SyncManager(
    createMMKVStore(transformArticlesForStorage),
    fetchNewsArticles,
    onEvent,
  );
};
