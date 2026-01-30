import { useState } from 'react';
import type { Joke } from '../types/Joke';

export const useJokes = () => {
  const [savedJokes, setSavedJokes] = useState<Joke[]>([]);

  const saveJoke = (joke: Joke) => {
    const exists = savedJokes.some(savedJoke => savedJoke.id === joke.id);
    if (!exists) {
      setSavedJokes(prev => [...prev, joke]);
    }
  };

  const deleteJoke = (id: number) => {
    setSavedJokes(prev => prev.filter(joke => joke.id !== id));
  };

  return {
    savedJokes,
    saveJoke,
    deleteJoke
  };
};
