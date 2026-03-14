import { useState } from 'react';
import './App.css';
import { useGameLibrary } from './hooks/useGameLibrary';
import { SearchBox } from './components/SearchBox';
import { AddEditGameForm } from './components/AddEditGameForm';
import { GameList } from './components/GameList';
import { Game } from './lib/gameModel';

function App() {
  const { games, addGame, updateGame, removeGame } = useGameLibrary();
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = games.filter((e) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;

    return e.title.toLowerCase().includes(q) || e.platform.toLowerCase().includes(q);
  });

  function handleSave(game: Game) {
    if (editingGame) {
      updateGame(game.id, game);
      setEditingGame(null);
    } else {
      addGame(game);
    }
  }

  return (
    <>
      <SearchBox value={searchQuery} onChange={setSearchQuery} />
      <AddEditGameForm game={editingGame} onSave={handleSave} onCancel={() => setEditingGame(null)} />
      <GameList games={filteredGames} onEdit={setEditingGame} onRemove={removeGame} />
    </>
  );
}

export default App;
