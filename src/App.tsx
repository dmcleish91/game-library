import { useState } from 'react';
import { useGameLibrary } from './hooks/useGameLibrary';
import { SearchBox } from './components/SearchBox';
import { AddEditGameForm } from './components/AddEditGameForm';
import { GameList } from './components/GameList';
import { Game, GAME_STATUS, type GameStatus } from './lib/gameModel';
import { Button } from './components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './components/ui/drawer';
import { Gamepad2, Plus } from 'lucide-react';

const FILTER_OPTIONS: { value: 'all' | GameStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: GAME_STATUS.BACKLOG, label: 'Backlog' },
  { value: GAME_STATUS.PLAYING, label: 'Playing' },
  { value: GAME_STATUS.COMPLETED, label: 'Completed' },
  { value: GAME_STATUS.DROPPED, label: 'Dropped' },
];

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

  const counts = {
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
      <header className="sticky top-0 z-10 border-b border-border bg-background shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Gamepad2 className="size-5" strokeWidth={2} />
            </div>
            <div>
              <h1 className="m-0 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Game Library
              </h1>
              <p className="m-0 text-sm text-muted-foreground">Track your collection</p>
            </div>
          </div>
          <Drawer
            open={drawerOpen}
            onOpenChange={(open) => {
              setDrawerOpen(open);
              if (!open) setEditingGame(null);
            }}
            direction="bottom"
          >
            <DrawerTrigger asChild>
              <Button
                size="icon"
                className="size-12 rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
                onClick={handleAddClick}
                aria-label="Add game"
              >
                <Plus className="size-6" strokeWidth={2.5} />
              </Button>
            </DrawerTrigger>
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
        </div>
      </header>
      <main className="flex-1 py-6 pb-8 sm:py-8 sm:pb-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 sm:px-6">
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map(({ value, label }) => {
              const count = value === 'all' ? counts.all : counts[value];
              const isActive = statusFilter === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatusFilter(value)}
                  className={
                    isActive
                      ? 'rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-600'
                      : 'rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted/80'
                  }
                >
                  {label} <span className="ml-1 opacity-80">{count}</span>
                </button>
              );
            })}
          </div>
          <GameList games={filteredGames} onEdit={handleEdit} onRemove={removeGame} />
        </div>
      </main>
    </div>
  );
}

export default App;
