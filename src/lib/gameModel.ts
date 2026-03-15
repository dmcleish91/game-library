export const GAME_STATUS = {
  PLAYING: 'Playing',
  COMPLETED: 'Completed',
  BACKLOG: 'Backlog',
  DROPPED: 'Dropped',
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export const STATUS_OPTIONS: { value: GameStatus; label: string }[] = [
  { value: GAME_STATUS.BACKLOG, label: 'Backlog' },
  { value: GAME_STATUS.PLAYING, label: 'Playing' },
  { value: GAME_STATUS.COMPLETED, label: 'Completed' },
  { value: GAME_STATUS.DROPPED, label: 'Dropped' },
];

export interface Game {
  id: string;
  title: string;
  platform: string;
  status: GameStatus;
  rating: number;
  notes: string;
  purchaseDate: string;
}

export const DEFAULT_GAME: Omit<Game, 'id'> & { id: '' } = {
  id: '',
  title: '',
  platform: '',
  status: GAME_STATUS.BACKLOG,
  rating: 0,
  notes: '',
  purchaseDate: '',
};

export function createGame(overrides: Partial<Game> = {}): Game {
  return {
    ...DEFAULT_GAME,
    id: crypto.randomUUID(),
    ...overrides,
  };
}
