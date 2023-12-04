import {useEffect, useMemo, useState} from 'react';

import {useTimer} from './useTimer';
import {DisplayManager} from '../services/DisplayManager';
import {store} from '../services/Store';

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
      // timer.start();
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
      setArticles(currentArticles => [...value, ...currentArticles]);
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
    const articlesAfterDeletion = articles.filter(({id}) => _id !== id);
    setArticles(articlesAfterDeletion);
  }

  function pinArticle(_id) {
    const articlesAfterPinning = articles.map(article => ({
      ...article,
      isPinned: article.id === _id ? !article.isPinned : article.isPinned,
    }));

    articlesAfterPinning.sort((a, b) => {
      if (a.isPinned && b.isPinned) return 0;
      if (a.isPinned) return -1;
      if (b.isPinned) return 1;
    });

    setArticles(articlesAfterPinning);
  }

  return {articles, isLoading, isError, manualFetch, deleteArticle, pinArticle};
};
