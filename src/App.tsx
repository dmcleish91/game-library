import { useState } from 'react';
import { useGameLibrary } from './hooks/useGameLibrary';
import { GameHeader } from './components/GameHeader';
import { SearchBox } from './components/SearchBox';
import { GameTabs } from './components/GameTabs';
import { AddEditGameForm } from './components/AddEditGameForm';
import { GameList } from './components/GameList';
import { Game, GAME_STATUS, type GameStatus } from './lib/gameModel';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from './components/ui/drawer';

function App() {
  const { games, addGame, updateGame, removeGame } = useGameLibrary();
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | GameStatus>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredBySearch = games.filter((e) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return e.title.toLowerCase().includes(q) || e.platform.toLowerCase().includes(q);
  });

  const filteredGames =
    statusFilter === 'all'
      ? filteredBySearch
      : filteredBySearch.filter((g) => g.status === statusFilter);

  const tabCounts = {
    all: games.length,
    [GAME_STATUS.BACKLOG]: games.filter((g) => g.status === GAME_STATUS.BACKLOG).length,
    [GAME_STATUS.PLAYING]: games.filter((g) => g.status === GAME_STATUS.PLAYING).length,
    [GAME_STATUS.COMPLETED]: games.filter((g) => g.status === GAME_STATUS.COMPLETED).length,
    [GAME_STATUS.DROPPED]: games.filter((g) => g.status === GAME_STATUS.DROPPED).length,
  };

  function handleSave(game: Game) {
    if (editingGame) {
      updateGame(game.id, game);
      setEditingGame(null);
    } else {
      addGame(game);
    }
    setDrawerOpen(false);
  }

  function handleCancel() {
    setEditingGame(null);
    setDrawerOpen(false);
  }

  function handleEdit(game: Game) {
    setEditingGame(game);
    setDrawerOpen(true);
  }

  function handleAddClick() {
    setEditingGame(null);
    setDrawerOpen(true);
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <GameHeader onAddClick={handleAddClick} />
      </div>
      <Drawer
        open={drawerOpen}
        onOpenChange={(open) => {
          setDrawerOpen(open);
          if (!open) setEditingGame(null);
        }}
        direction="bottom"
      >
        <DrawerContent className="h-[85vh] rounded-t-3xl border-t bg-card px-4 pb-8">
          <DrawerHeader className="pb-4">
            <DrawerTitle className="text-foreground">
              {editingGame ? 'Edit Game' : 'Add Game'}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <AddEditGameForm
              game={editingGame}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </DrawerContent>
      </Drawer>
      <main className="flex-1 py-6 pb-8 sm:py-8 sm:pb-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 sm:px-6">
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
          <GameTabs
            activeTab={statusFilter}
            onTabChange={setStatusFilter}
            counts={tabCounts}
          />
          <GameList games={filteredGames} onEdit={handleEdit} onRemove={removeGame} />
        </div>
      </main>
    </div>
  );
}

export default App;
