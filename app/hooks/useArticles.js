import {useEffect, useState} from 'react';

import {useTimer} from './useTimer';
import {StoreManager} from '../services/StoreManager';
import {DisplayManager} from '../services/DisplayManager';

export const useArticles = (initialCount = 10, updateCount = 5) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const {start, stop} = useTimer(populateArticles);

  const storeManager = new StoreManager();
  const {isReady, generateArticles} = new DisplayManager(
    storeManager,
    handleStoreUpdate,
  );
  const articlesGenerator = generateArticles({initialCount, updateCount});

  useEffect(() => {
    if (isReady) {
      loadInitialData();
    }
  }, [isReady]);

  const loadInitialData = () => {
    start();
    setIsLoading(false);
    populateArticles();
  };

  function handleStoreUpdate(event) {
    if (event === 'ready') {
      loadInitialData();
    }
  }

  function populateArticles() {
    const {value} = articlesGenerator.next();
    if (value) {
      setArticles(currentArticles => [...value, ...currentArticles]);
    } else {
      stop();
    }
  }

  return {articles, isLoading};
};
