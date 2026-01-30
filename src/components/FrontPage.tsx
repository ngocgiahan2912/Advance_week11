import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import type { Joke } from '../types/Joke';

interface FrontPageProps {
  savedJokes?: Joke[];
  saveJoke?: (joke: Joke) => void;
}

const FrontPage = ({ savedJokes, saveJoke }: FrontPageProps) => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortCtrl: AbortController = new AbortController();
    
    const fetchJoke = async () => {
      try {
        const response: Response = await fetch(
          'https://official-joke-api.appspot.com/random_joke',
          { signal: abortCtrl.signal }
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch joke");
        }
        
        const data: Joke = await response.json();
        setJoke(data);
        setLoading(false);
        
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            console.error(error.message);
          }
        }
        setLoading(false);
      }
    };
    
    fetchJoke();
    
    return () => {
      abortCtrl.abort();
    };
  }, []);

  const handleNewJoke = () => {
    setLoading(true);
    const abortCtrl: AbortController = new AbortController();
    
    fetch('https://official-joke-api.appspot.com/random_joke', {
      signal: abortCtrl.signal
    })
      .then(response => {
        if (!response.ok) 
          throw new Error("Failed to fetch joke");
        return response.json();
      })
      .then((data: Joke) => {
        setJoke(data);
        setLoading(false);
      })
      .catch(error => {
        if (error.name !== "AbortError") {
          console.error(error);
          setLoading(false);
        }
      });
  };

  const handleSaveJoke = () => {
    if (joke && saveJoke) {
      saveJoke(joke);
    }
  };

  return (
    <div>
      <Button 
        onClick={handleNewJoke}
      >
        Get Random Joke
      </Button>

      {saveJoke && joke && (
        <Button 
          onClick={handleSaveJoke}
        >
          Save Joke
        </Button>
      )}

      {loading ? (
        <Typography>Loading a joke...</Typography>
      ) : joke ? (
        <Card key={joke.id}>
          <CardContent>
            <Typography>{joke.setup}</Typography>
            <Typography>{joke.punchline}</Typography>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default FrontPage;

/*
Notes: useState stores joke and loading state, 
useEffect fetches the first joke on page load, 
handleNewJoke fetches a new joke when button is clicked. 
AbortController cancels fetch if component unmounts. 
Loading shows text, joke shows in a Card. 
*/