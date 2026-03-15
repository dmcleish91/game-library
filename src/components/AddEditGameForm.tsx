import { createGame, Game, GAME_STATUS, GameStatus } from '@/lib/gameModel';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLATFORMS = [
  'PC',
  'NES',
  'SNES',
  'N64',
  'GameCube',
  'Wii',
  'Wii U',
  'Switch',
  'Master System',
  'Genesis',
  'Saturn',
  'Dreamcast',
  'PlayStation',
  'PS2',
  'PS3',
  'PS4',
  'PS5',
  'Xbox',
  'Xbox 360',
  'Xbox One',
  'Xbox Series X',
  'Xbox Series S',
  'TurboGrafx-16',
  '3DO',
  'Other',
];

type AddEditGameFormProps = {
  game: Game | null;
  statusOptions: { value: GameStatus; label: string }[];
  onSave: (game: Game) => void;
  onCancel?: () => void;
};

const fieldClass =
  'h-12 w-full rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none';

export function AddEditGameForm({ game, statusOptions, onSave, onCancel }: AddEditGameFormProps) {
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
    if (!title.trim() || !platform) return;
    if (isEdit && game) {
      onSave({ ...game, title, platform, status, rating, notes, purchaseDate });
    } else {
      onSave(createGame({ title, platform, status, rating, notes, purchaseDate }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <div className='space-y-2'>
        <Label htmlFor='title' className='text-sm text-foreground'>
          Game Title
        </Label>
        <Input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter game title'
          className={fieldClass}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='platform' className='text-sm text-foreground'>
          Platform
        </Label>
        <Select value={platform || null} onValueChange={(v) => setPlatform(v ?? '')}>
          <SelectTrigger
            id='platform'
            className={cn(
              'h-12 w-fit min-w-32 rounded-xl border-border bg-input px-3 text-foreground data-[placeholder]:text-muted-foreground focus-visible:ring-ring/50',
              'focus-visible:border-ring focus-visible:ring-3 outline-none',
            )}>
            <SelectValue placeholder='Select platform' />
          </SelectTrigger>
          <SelectContent>
            {PLATFORMS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='status' className='text-sm text-foreground'>
          Status
        </Label>
        <Select value={status} onValueChange={(v) => setStatus((v ?? status) as GameStatus)}>
          <SelectTrigger
            id='status'
            className={cn(
              'h-12 w-fit min-w-28 rounded-xl border-border bg-input px-3 text-foreground focus-visible:ring-ring/50',
              'focus-visible:border-ring focus-visible:ring-3 outline-none',
            )}>
            <SelectValue placeholder='Status'>
              {(value) => (value ? (statusOptions.find((o) => o.value === value)?.label ?? value) : null)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label className='text-sm text-foreground'>Rating</Label>
        <div className='flex gap-2'>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type='button'
              onClick={() => setRating(rating === star ? 0 : star)}
              className='rounded-lg p-2 transition-colors hover:bg-secondary'
              aria-label={`Rate ${star} stars`}>
              <Star className={cn('size-6 transition-colors', star <= rating ? 'fill-primary text-primary' : 'text-muted-foreground')} />
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='notes' className='text-sm text-foreground'>
          Notes
        </Label>
        <Textarea
          id='notes'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder='Add any notes...'
          className={cn(
            'min-h-24 w-full resize-none rounded-xl border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none',
          )}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='purchaseDate' className='text-sm text-foreground'>
          Purchase date
        </Label>
        <Input
          id='purchaseDate'
          type='date'
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className='flex gap-3 pt-2'>
        {onCancel && (
          <Button type='button' variant='outline' onClick={onCancel} className='h-12 flex-1 rounded-xl border-border text-foreground'>
            Cancel
          </Button>
        )}
        <Button
          type='submit'
          className='h-12 flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90'
          disabled={!title.trim() || !platform}>
          {isEdit ? 'Save Changes' : 'Add Game'}
        </Button>
      </div>
    </form>
  );
}
