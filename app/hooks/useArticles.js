import {useState, useEffect, useRef} from 'react';

import {createSyncManager} from '../services/Store';
import {popTopArticles} from '../utils';
import {useTimer} from './useTimer';

export const useArticles = () => {
  const allArticles = useRef([]);
  const [articles, setArticles] = useState([]);

  const {sync} = createSyncManager(handleSyncEvent);
  const {start, stop} = useTimer(introduceNewRandomArticles);

  useEffect(() => {
    sync();
  }, []);

  function handleSyncEvent({event, data, error}) {
    if (error) {
      return;
    }
    loadData(data);
  }

  const loadData = data => {
    allArticles.current = data;

    const {top, remaining} = popTopArticles({
      count: 10,
      from: allArticles.current,
    });
    // Update the remaining articles
    allArticles.current = remaining;
    // Add the top articles to the current list.
    setArticles(currentArticles => [...top, ...currentArticles]);
    // start the timer to introduce new articles periodically.
    start();
  };

  function introduceNewRandomArticles() {
    const {top, remaining} = popTopArticles({
      count: 5,
      from: allArticles.current,
      shouldRandomize: true,
    });
    // Update the remaining articles
    allArticles.current = remaining;
    // Add the top articles to the current list.
    setArticles(currentArticles => [...top, ...currentArticles]);
    // Stop the timer in case all the articles are exhausted
    if (allArticles.current.length === 0) {
      resetAndLoadNextBatch();
    }
  }

  const resetAndLoadNextBatch = async () => {
    stop();
    sync();
  };

  return {articles};
};
