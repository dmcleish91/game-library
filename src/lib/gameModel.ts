export const GAME_STATUS = {
  PLAYING: 'playing',
  COMPLETED: 'completed',
  BACKLOG: 'backlog',
  DROPPED: 'dropped',
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

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
