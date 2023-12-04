import {useState, useEffect, useRef, useCallback} from 'react';
import {DisplayManager} from '../services/DisplayManager';

export const useArticles = () => {
  const allArticles = useRef([]);
  const [articles, setArticles] = useState([]);

  const {start, stop} = useTimer(introduceNewRandomArticles);

  useEffect(() => {
    const loadAllArticles = async () => {
      const displayManager = new DisplayManager();
      const data = await displayManager.getData();

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

    loadAllArticles();
  }, []);

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
      stop();
    }
  }

  return {articles};
};

const useTimer = (callback, duration = 10000) => {
  const intervalId = useRef(null);

  const start = useCallback(() => {
    intervalId.current = setInterval(callback, duration);
  }, [duration, callback]);

  const stop = () => {
    intervalId.current && clearInterval(intervalId.current);
  };

  return {stop, start};
};

const popTopArticles = ({from, count, shouldRandomize = false}) => {
  const copy = [...from];
  let topArticles = copy.splice(0, count);

  if (shouldRandomize) {
    randomize(topArticles);
  }

  return {
    top: topArticles,
    remaining: copy,
  };
};

const randomize = array => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};
