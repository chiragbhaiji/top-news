import {useEffect, useState} from 'react';

import {useTimer} from './useTimer';
import {DisplayManager} from '../services/DisplayManager';
import {store} from '../services/Store';

export const useArticles = (initialCount = 10, updateCount = 5) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);

  const timer = useTimer(populateArticles, 1000);

  const {isReady, generateArticles, loadNextBatch} = new DisplayManager(
    store,
    handleStoreUpdate,
  );

  let articlesGenerator = generateArticles({initialCount, updateCount});

  useEffect(() => {
    if (isReady) {
      loadInitialData();
    }
  }, [isReady]);

  useEffect(() => {
    if (isError) {
      timer.stop();
      setIsLoading(false);
    }
  }, [isError]);

  const loadInitialData = () => {
    timer.start();
    setIsLoading(false);
    // reset the current articles
    setArticles([]);
    populateArticles();
  };

  function handleStoreUpdate(event) {
    if (event === 'ready') {
      loadInitialData();
    }
    if (event === 'reset') {
      // Initialize the new generator function to handle next page data;
      articlesGenerator = generateArticles({initialCount, updateCount});
      loadInitialData();
    }
    setIsError(event === 'error');
  }

  function populateArticles() {
    const {value} = articlesGenerator.next();
    if (value) {
      setArticles(currentArticles => [...value, ...currentArticles]);
    } else {
      timer.stop();
      setIsLoading(true);
      if (!isError) {
        loadNextBatch();
      }
    }
  }

  return {articles, isLoading, isError};
};
