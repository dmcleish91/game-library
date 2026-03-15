import { createGame, Game, GAME_STATUS, GameStatus } from '@/lib/gameModel';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLATFORMS = [
  'PC',
  'PS5',
  'PS4',
  'Xbox Series X',
  'Xbox One',
  'Switch',
  'Mobile',
  'Other',
];

const STATUS_OPTIONS: { value: GameStatus; label: string }[] = [
  { value: GAME_STATUS.BACKLOG, label: 'Backlog' },
  { value: GAME_STATUS.PLAYING, label: 'Playing' },
  { value: GAME_STATUS.COMPLETED, label: 'Completed' },
  { value: GAME_STATUS.DROPPED, label: 'Dropped' },
];

type AddEditGameFormProps = {
  game: Game | null;
  onSave: (game: Game) => void;
  onCancel?: () => void;
};

const fieldClass =
  'h-12 w-full rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none';

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
    if (!title.trim()) return;
    if (isEdit && game) {
      onSave({ ...game, title, platform, status, rating, notes, purchaseDate });
    } else {
      onSave(createGame({ title, platform, status, rating, notes, purchaseDate }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm text-foreground">
          Game Title
        </Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter game title"
          className={fieldClass}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="platform" className="text-sm text-foreground">
          Platform
        </Label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          required
          className={cn('px-3', fieldClass, 'w-fit min-w-32')}
        >
          <option value="">Select platform</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status" className="text-sm text-foreground">
          Status
        </Label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as GameStatus)}
          className={cn('px-3', fieldClass, 'w-fit min-w-28')}
        >
          {STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-foreground">Rating</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(rating === star ? 0 : star)}
              className="rounded-lg p-2 transition-colors hover:bg-secondary"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={cn(
                  'size-6 transition-colors',
                  star <= rating
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm text-foreground">
          Notes
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes..."
          className={cn(
            'min-h-24 w-full resize-none rounded-xl border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none'
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="purchaseDate" className="text-sm text-foreground">
          Purchase date
        </Label>
        <Input
          id="purchaseDate"
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-12 flex-1 rounded-xl border-border text-foreground"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="h-12 flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!title.trim() || !platform}
        >
          {isEdit ? 'Save Changes' : 'Add Game'}
        </Button>
      </div>
    </form>
  );
}
