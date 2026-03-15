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
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">Game Library</h1>
        </div>
      </header>
      <main className="app-main">
        <div className="app-container">
          <section className="app-section app-search">
            <h2 className="app-section-title">Search</h2>
            <SearchBox value={searchQuery} onChange={setSearchQuery} />
          </section>
          <section className="app-section app-form-wrapper">
            <h2 className="app-section-title">{editingGame ? 'Edit game' : 'Add game'}</h2>
            <AddEditGameForm
              game={editingGame}
              onSave={handleSave}
              onCancel={() => setEditingGame(null)}
            />
          </section>
          <section className="app-section app-list-section">
            <h2 className="app-section-title">Your library</h2>
            <GameList
              games={filteredGames}
              onEdit={setEditingGame}
              onRemove={removeGame}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
