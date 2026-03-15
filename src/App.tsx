import { useState } from 'react';
import { useGameLibrary } from './hooks/useGameLibrary';
import { SearchBox } from './components/SearchBox';
import { AddEditGameForm } from './components/AddEditGameForm';
import { GameList } from './components/GameList';
import { Game } from './lib/gameModel';
import { Button } from './components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './components/ui/drawer';

function App() {
  const { games, addGame, updateGame, removeGame } = useGameLibrary();
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="m-0 text-2xl font-semibold tracking-tight text-foreground">Game Library</h1>
        </div>
      </header>
      <main className="flex-1 bg-muted py-6 pb-8 sm:py-8 sm:pb-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:gap-10 sm:px-6">
          <section className="flex max-w-96 items-center gap-3">
            <SearchBox value={searchQuery} onChange={setSearchQuery} />
            <Drawer
              open={drawerOpen}
              onOpenChange={(open) => {
                setDrawerOpen(open);
                if (!open) setEditingGame(null);
              }}
              direction="bottom"
            >
              <DrawerTrigger asChild>
                <Button onClick={handleAddClick}>Add game</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{editingGame ? 'Edit game' : 'Add game'}</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-y-auto px-4 pb-6">
                  <AddEditGameForm
                    game={editingGame}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </section>
          <section className="flex min-h-48 flex-col gap-3">
            <h2 className="m-0 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Your library
            </h2>
            <GameList games={filteredGames} onEdit={handleEdit} onRemove={removeGame} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
