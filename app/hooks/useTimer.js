import {useCallback, useRef} from 'react';

export const useTimer = (callback, duration = 3000) => {
  const intervalId = useRef(null);

  const start = useCallback(() => {
    intervalId.current = setInterval(callback, duration);
  }, [duration, callback]);

  const stop = () => {
    intervalId.current && clearInterval(intervalId.current);
  };

  return {stop, start};
};
