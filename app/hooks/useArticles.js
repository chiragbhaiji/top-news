import {useEffect, useMemo, useState} from 'react';

import {DisplayManager} from '../services/DisplayManager';
import {store} from '../services/Store';
import {sortPinnedArticles} from '../utils';

import {useTimer} from './useTimer';

const displayManager = new DisplayManager(store);

export const useArticles = (
  initialCount = 10,
  updateCount = 5,
  numberOfSecondsToLoadNewArticles = 10000,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);

  const timer = useTimer(
    introduceNewArticles,
    numberOfSecondsToLoadNewArticles,
  );

  let articlesGenerator = useMemo(
    () =>
      displayManager.generateArticles({
        initialCount,
        updateCount,
      }),
    [initialCount, updateCount],
  );

  useEffect(() => {
    displayManager.init(onStoreEvent);
  }, []);

  useEffect(() => {
    if (isError) {
      timer.stop();
      setIsLoading(false);
    }
  }, [isError]);

  function onStoreEvent(event) {
    const loadInitialData = () => {
      timer.start();
      setIsLoading(false);
      const {value} = articlesGenerator.next();
      setArticles(value);
    };

    if (event === 'ready') {
      loadInitialData();
    }

    if (event === 'reset') {
      // Initialize the new generator function to handle next page data;
      articlesGenerator = displayManager.generateArticles({
        initialCount,
        updateCount,
      });
      loadInitialData();
    }

    setIsError(event === 'error');
  }

  function introduceNewArticles() {
    const {value} = articlesGenerator.next();
    if (value) {
      setArticles(currentArticles => {
        const newArticles = [...value, ...currentArticles];
        newArticles.sort(sortPinnedArticles);
        return newArticles;
      });
    } else {
      timer.stop();
      setIsLoading(true);
      displayManager.loadNextBatch();
    }
  }

  function manualFetch() {
    timer.stop();
    introduceNewArticles();
    setTimeout(() => {
      timer.start();
    }, 0);
  }

  function deleteArticle(_id) {
    setArticles(currentArticles =>
      currentArticles.filter(({id}) => _id !== id),
    );
  }

  function pinArticle(_id) {
    const articlesAfterPinning = articles.map(article => ({
      ...article,
      isPinned: article.id === _id ? !article.isPinned : article.isPinned,
    }));

    articlesAfterPinning.sort(sortPinnedArticles);

    setArticles(articlesAfterPinning);
  }

  return {articles, isLoading, isError, manualFetch, deleteArticle, pinArticle};
};
