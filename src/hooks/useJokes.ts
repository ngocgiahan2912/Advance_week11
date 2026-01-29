import { useState } from 'react';
import type { Joke } from '../types/Joke';

const useJokes = () => {
  const [savedJokes, setSavedJokes] = useState<Joke[]>([]);

  const saveJoke = (joke: Joke) => {
    // Check if joke already exists
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

export default useJokes;