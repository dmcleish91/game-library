import { createGame, Game, GAME_STATUS, GameStatus } from '@/lib/gameModel';
import { useEffect, useState } from 'react';

type AddEditGameFormProps = {
  game: Game | null;
  onSave: (game: Game) => void;
  onCancel?: () => void;
};

const STATUS_OPTIONS: GameStatus[] = [GAME_STATUS.BACKLOG, GAME_STATUS.PLAYING, GAME_STATUS.COMPLETED, GAME_STATUS.DROPPED];

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title</label>
        <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor='platform'>Platform</label>
        <input id='platform' type='text' value={platform} onChange={(e) => setPlatform(e.target.value)} />
      </div>
      <div>
        <label htmlFor='status'>Status</label>
        <select id='status' value={status} onChange={(e) => setStatus(e.target.value as GameStatus)}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='rating'>Rating (0–5)</label>
        <input id='rating' type='number' min={0} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
      </div>
      <div>
        <label htmlFor='notes'>Notes</label>
        <textarea id='notes' value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <div>
        <label htmlFor='purchaseDate'>Purchase date</label>
        <input id='purchaseDate' type='date' value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
      </div>
      <button type='submit'>{isEdit ? 'Save' : 'Add game'}</button>
      {onCancel && (
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
