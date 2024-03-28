import { useEffect, useState } from 'react';

export const useDebounce = (value: string | undefined, timeout: number = 500) => {
  const [debounncedValue, setDebounncedValue] = useState<string | undefined>();
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [value, timeout]);

  return debounncedValue;
};
