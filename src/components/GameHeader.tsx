import { Gamepad2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type GameHeaderProps = {
  onAddClick: () => void;
};

export function GameHeader({ onAddClick }: GameHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 pt-6 pb-4 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Gamepad2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Game Library</h1>
            <p className="text-xs text-muted-foreground">Track your collection</p>
          </div>
        </div>
        <Button
          size="icon"
          className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90"
          onClick={onAddClick}
          aria-label="Add game"
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add game</span>
        </Button>
      </div>
    </header>
  );
}
