import { Game } from '@/lib/gameModel';
import { loadGames, saveGames } from '@/lib/storage';
import { useEffect, useState } from 'react';

export function useGameLibrary() {
  const [games, setGames] = useState<Game[]>(() => loadGames());

  useEffect(() => {
    saveGames(games);
  }, [games]);

  function addGame(game: Game) {
    setGames((prev) => [...prev, game]);
  }
  function updateGame(id: string, updates: Partial<Game>) {
    setGames((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  }
  function removeGame(id: string) {
    setGames((prev) => prev.filter((g) => g.id !== id));
  }
  return { games, addGame, updateGame, removeGame };
}
