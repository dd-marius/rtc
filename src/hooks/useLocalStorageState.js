import { useCallback, useState } from 'react';

function saveToStorage(key, val) {
  window?.localStorage?.setItem(key, JSON.stringify(val));
}

export function useLocalStorageState(key, initialState) {
  const [state, setState] = useState(() => {
    const fromStorage = window?.localStorage?.getItem(key);
    
    if (fromStorage) {
      // Handle special cases when parsing fails if localstorage is corrupt
      try {
        return JSON.parse(fromStorage);
      } catch (error) {
        return initialState;
      }
    }

    let defaultState = initialState;
    if (typeof initialState === 'function') {
      defaultState = initialState();
    }

    saveToStorage(key, defaultState);
    return defaultState;
  });

  const updateState = useCallback(
    (newState) => {
      setState((oldState) => {
        let modifiedState = newState;
        if (typeof newState === 'function') {
          modifiedState = newState(oldState);
        }
        saveToStorage(key, modifiedState);
        return modifiedState;
      });
    },
    [key]
  );

  return [state, updateState];
}
