import { createGame, Game, GAME_STATUS, GameStatus } from '@/lib/gameModel';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type AddEditGameFormProps = {
  game: Game | null;
  onSave: (game: Game) => void;
  onCancel?: () => void;
};

const STATUS_OPTIONS: GameStatus[] = [
  GAME_STATUS.BACKLOG,
  GAME_STATUS.PLAYING,
  GAME_STATUS.COMPLETED,
  GAME_STATUS.DROPPED,
];

export function AddEditGameForm({ game, onSave, onCancel }: AddEditGameFormProps) {
  const isEdit = game != null;

  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [status, setStatus] = useState<GameStatus>(GAME_STATUS.BACKLOG);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  useEffect(() => {
    if (game) {
      setTitle(game.title);
      setPlatform(game.platform);
      setStatus(game.status);
      setRating(game.rating);
      setNotes(game.notes);
      setPurchaseDate(game.purchaseDate);
    } else {
      setTitle('');
      setPlatform('');
      setStatus(GAME_STATUS.BACKLOG);
      setRating(0);
      setNotes('');
      setPurchaseDate('');
    }
  }, [game]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEdit && game) {
      onSave({ ...game, title, platform, status, rating, notes, purchaseDate });
    } else {
      onSave(createGame({ title, platform, status, rating, notes, purchaseDate }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-label="Title"
        required
      />
      <Input
        id="platform"
        type="text"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        placeholder="Platform (e.g. PC, Switch, PS5)"
        aria-label="Platform"
      />
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as GameStatus)}
        aria-label="Status"
        className={cn(
          'flex h-8 w-full appearance-none rounded-lg border border-input bg-background px-2.5 py-1 text-sm outline-none',
          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
        )}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <Input
        id="rating"
        type="number"
        min={0}
        max={5}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        placeholder="Rating (0–5)"
        aria-label="Rating 0 to 5"
      />
      <Textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
        aria-label="Notes"
      />
      <Input
        id="purchaseDate"
        type="date"
        value={purchaseDate}
        onChange={(e) => setPurchaseDate(e.target.value)}
        aria-label="Purchase date"
      />
      <div className="flex gap-2 pt-1">
        <Button type="submit">{isEdit ? 'Save' : 'Add game'}</Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
