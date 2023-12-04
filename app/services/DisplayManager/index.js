import {fetchNewsArticles} from '../../apis/fetchNewsArticles';
import {randomize} from '../../utils';

export function DisplayManager(store, onEvent) {
  let page = 0;

  const isReady = store.get().length > 0;

  function* generateArticles({initialCount, updateCount}) {
    const articlesFromStore = store.get();

    yield articlesFromStore.splice(0, initialCount);

    while (articlesFromStore.length) {
      const newArticles = articlesFromStore.splice(0, updateCount);
      // randomize
      randomize(newArticles);
      yield newArticles;
    }
  }

  function loadBatch(isFirst = false) {
    // sync the store for next batch that ie next page
    store.sync(fetchNewsArticles(page + 1), event => {
      if (event === 'success') {
        page = page + 1;
        onEvent(isFirst ? 'ready' : 'reset');
      }
    });
  }

  if (!isReady) {
    // Need to sync store with the server first
    loadBatch(true);
  }

  return {isReady, generateArticles, loadNextBatch: loadBatch};
}
