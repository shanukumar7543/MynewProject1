import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

const useDebounce = <T = any>(value: T, milliSeconds: number = 2000) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};

// useAwayListener
type Event = MouseEvent | TouchEvent;

const useAwayListener = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]);
};

export { useAwayListener, useDebounce };
