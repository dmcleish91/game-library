import { createGame, Game, GAME_STATUS, GameStatus } from '@/lib/gameModel';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Input
          id="platform"
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as GameStatus)}
          className={cn(
            'flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none',
            'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
          )}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rating">Rating (0–5)</Label>
        <Input
          id="rating"
          type="number"
          min={0}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="purchaseDate">Purchase date</Label>
        <Input
          id="purchaseDate"
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
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
