const {fetchNewsArticles} = require('../../apis/fetchNewsArticles');
import {transformArticlesForStorage} from '../Store/utils';
const {createMMKVStore} = require('../Store');
const {SyncManager} = require('../SyncManager');

export function DisplayManager() {
  const store = createMMKVStore(transformArticlesForStorage);

  return new SyncManager(store, fetchNewsArticles);
}
