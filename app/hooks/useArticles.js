import {useEffect, useState} from 'react';

import {useTimer} from './useTimer';
import {StoreManager} from '../services/StoreManager';
import {DisplayManager} from '../services/DisplayManager';

export const useArticles = (initialCount = 10, updateCount = 5) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const timer = useTimer(populateArticles);

  const storeManager = new StoreManager();
  const {isReady, generateArticles, loadNextBatch} = new DisplayManager(
    storeManager,
    handleStoreUpdate,
  );

  let articlesGenerator = generateArticles({initialCount, updateCount});

  useEffect(() => {
    if (isReady) {
      loadInitialData();
    }
  }, [isReady]);

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
  }

  function populateArticles() {
    const {value} = articlesGenerator.next();
    if (value) {
      setArticles(currentArticles => [...value, ...currentArticles]);
    } else {
      timer.stop();
      setIsLoading(true);
      loadNextBatch();
    }
  }

  return {articles, isLoading};
};
