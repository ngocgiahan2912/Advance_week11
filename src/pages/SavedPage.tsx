import { Card, CardContent, Typography, Button } from '@mui/material';
import type { Joke } from '../types/Joke';

interface SavedPageProps {
  savedJokes: Joke[];
  deleteJoke: (id: number) => void;
}

const SavedPage = ({ savedJokes, deleteJoke }: SavedPageProps) => {
  if (savedJokes.length === 0) {
    return <Typography>No saved jokes yet.</Typography>;
  }

  return (
    <div>
      {savedJokes.map((joke) => (
        <Card key={joke.id}>
          <CardContent>
            <Typography>{joke.setup}</Typography>
            <Typography>{joke.punchline}</Typography>
            <Button onClick={() => deleteJoke(joke.id)}>
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SavedPage;