import {MMKV} from 'react-native-mmkv';

import {StoreKey, transformArticlesForStorage} from './utils';

export function StoreManager() {
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

  const save = (articles, transformer) => {
    let transformedData = articles;

    if (transformer) {
      transformedData = transformer(articles);
    }

    store.set(StoreKey.articles, JSON.stringify(transformedData));
    store.set(StoreKey.lastSyncTimestamp, Date.now());
  };

  const reset = () => {
    store.clearAll();
  };

  const sync = async (fetcher, onEvent) => {
    try {
      const data = await fetcher();
      save(data, transformArticlesForStorage);
      onEvent?.('success');
    } catch {
      onEvent?.('error');
    }
  };

  return {
    get,
    save,
    reset,
    sync,
    getLastSyncedTimestamp,
  };
}
