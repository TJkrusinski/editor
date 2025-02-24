import { useEffect, useRef } from 'react';

/**
 * A classic that is non-intuitive to remember how to "hookify"
 * @param callback A function to be called every delay milliseconds.
 * @param delay Delay in milliseconds.
 */
const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return () => {};
  }, [delay]);
};

export default useInterval;
