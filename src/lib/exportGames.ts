import type { Game, GameStatus } from './gameModel';
import { GAME_STATUS } from './gameModel';

const VALID_STATUSES = new Set<string>(Object.values(GAME_STATUS));

export function getExportContent(games: Game[]): string {
  return JSON.stringify(games, null, 2);
}

export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function normalizeGame(raw: unknown): Game | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const title = typeof o.title === 'string' ? o.title : '';
  const platform = typeof o.platform === 'string' ? o.platform : '';
  const status: GameStatus = typeof o.status === 'string' && VALID_STATUSES.has(o.status) ? (o.status as GameStatus) : GAME_STATUS.BACKLOG;
  const rating = typeof o.rating === 'number' && o.rating >= 0 && o.rating <= 5 ? o.rating : 0;
  const notes = typeof o.notes === 'string' ? o.notes : '';
  const id = typeof o.id === 'string' && o.id ? o.id : crypto.randomUUID();
  return { id, title, platform, status, rating, notes };
}

export function parseExportedFile(text: string): Game[] | null {
  try {
    const parsed = JSON.parse(text) as unknown;
    if (!Array.isArray(parsed)) return null;
    const games: Game[] = [];
    for (const item of parsed) {
      const game = normalizeGame(item);
      if (game && game.title) games.push(game);
    }
    return games;
  } catch {
    return null;
  }
}
