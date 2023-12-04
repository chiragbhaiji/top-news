import {fetchNewsArticles} from '../../apis/fetchNewsArticles';
import {randomize} from '../../utils';

export function DisplayManager(store) {
  let page = 0;
  let onEvent;

  function init(_onEvent) {
    onEvent = _onEvent;
    loadBatch(true);
  }

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
    if (isFirst && store.get().length) {
      setTimeout(() => {
        onEvent?.('ready');
      }, 1000);
    } else {
      // sync the store for next batch that ie next page
      store.sync(fetchNewsArticles(page + 1), event => {
        if (event === 'success') {
          page = page + 1;
          onEvent?.('reset');
        } else {
          onEvent?.(event);
        }
      });
    }
  }

  return {generateArticles, loadNextBatch: loadBatch, init};
}
