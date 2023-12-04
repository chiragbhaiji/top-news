const {fetchNewsArticles} = require('../../apis/fetchNewsArticles');
import {transformArticlesForStorage} from '../StorageManager/utils';
const {createMMKVStore} = require('../StorageManager');
const {SyncManager} = require('../SyncManager');

export function DisplayManager() {
  const store = createMMKVStore(transformArticlesForStorage);

  return new SyncManager(store, fetchNewsArticles);
}
