import type { Game } from '@/lib/gameModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type GameListProps = {
  games: Game[];
  onEdit: (game: Game) => void;
  onRemove: (id: string) => void;
};

export function GameList({ games, onEdit, onRemove }: GameListProps) {
  if (games.length === 0) {
    return <p className="text-muted-foreground">No games in your library.</p>;
  }

  return (
    <ul className="space-y-4">
      {games.map((game) => (
        <li key={game.id}>
          <Card>
            <CardHeader>
              <CardTitle>{game.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {game.platform} · {game.status} · {game.rating > 0 ? `${game.rating}/5` : 'Unrated'}
              </p>
            </CardHeader>
            {game.notes ? (
              <CardContent>
                <p className="text-sm text-muted-foreground">{game.notes}</p>
              </CardContent>
            ) : null}
            <CardFooter className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onEdit(game)}>
                Edit
              </Button>
              <Button type="button" variant="destructive" size="sm" onClick={() => onRemove(game.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
