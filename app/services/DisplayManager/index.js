import {fetchNewsArticles} from '../../apis/fetchNewsArticles';
import {randomize} from '../../utils';

export function DisplayManager(store, onEvent) {
  const articlesFromStore = store.get();
  const isReady = articlesFromStore.length > 0;

  function* generateArticles({initialCount, updateCount}) {
    yield articlesFromStore.splice(0, initialCount);

    while (articlesFromStore.length) {
      const newArticles = articlesFromStore.splice(0, updateCount);
      // randomize
      randomize(newArticles);
      yield newArticles;
    }
  }

  if (!isReady) {
    // Need to sync store with the server first
    store.sync(fetchNewsArticles, onEvent);
  }

  return {isReady, generateArticles};
}
