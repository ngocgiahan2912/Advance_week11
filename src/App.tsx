import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import FrontPage from './components/FrontPage';
import SavedPage from './components/SavedPage';
import type { Joke } from './types/Joke';

function App() {
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

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <FrontPage 
                savedJokes={savedJokes}
                saveJoke={saveJoke}
              />
            } 
          />
          <Route 
            path="/saved" 
            element={
              <SavedPage 
                savedJokes={savedJokes}
                deleteJoke={deleteJoke}
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;