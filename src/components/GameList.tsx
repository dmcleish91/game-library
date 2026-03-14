import type { Game } from '@/lib/gameModel';

type GameListProps = {
  games: Game[];
  onEdit: (game: Game) => void;
  onRemove: (id: string) => void;
};

export function GameList({ games, onEdit, onRemove }: GameListProps) {
  if (games.length === 0) {
    return <p>No games in your library.</p>;
  }

  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>
          <span>{game.title}</span>
          <span>{game.platform}</span>
          <span>{game.status}</span>
          <span>{game.rating}</span>
          <button type='button' onClick={() => onEdit(game)}>
            Edit
          </button>
          <button type='button' onClick={() => onRemove(game.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
