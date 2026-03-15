import { useState } from 'react';
import type { Game } from '@/lib/gameModel';
import { GAME_STATUS, type GameStatus } from '@/lib/gameModel';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Gamepad2, MoreHorizontal, Star, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig: Record<GameStatus, { label: string; className: string }> = {
  [GAME_STATUS.BACKLOG]: {
    label: 'Backlog',
    className: 'bg-secondary text-secondary-foreground',
  },
  [GAME_STATUS.PLAYING]: {
    label: 'Playing',
    className: 'bg-primary/20 text-primary',
  },
  [GAME_STATUS.COMPLETED]: {
    label: 'Completed',
    className: 'bg-primary text-primary-foreground',
  },
  [GAME_STATUS.DROPPED]: {
    label: 'Dropped',
    className: 'bg-destructive/20 text-destructive',
  },
};

type GameCardProps = {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
};

function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const status = statusConfig[game.status];

  return (
    <>
      <div className='group relative overflow-hidden rounded-2xl bg-card p-4 transition-all active:scale-[0.98]'>
        <div className='flex items-start justify-between gap-3'>
          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-baseline gap-x-2 gap-y-0'>
              <h3 className='truncate text-base font-semibold text-foreground'>{game.title}</h3>
              <span className='shrink-0 text-sm text-muted-foreground'>{game.platform}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-0 bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
              aria-label='Open menu'>
              <MoreHorizontal className='h-4 w-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
              <DropdownMenuItem onClick={() => onEdit(game)}>
                <Pencil className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className='text-destructive focus:text-destructive'>
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='mt-2 flex flex-wrap items-center gap-x-2 gap-y-1'>
          <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', status.className)}>{status.label}</span>
          {game.rating > 0 && (
            <div className='flex items-center gap-1 text-primary'>
              <Star className='h-3.5 w-3.5 fill-current' />
              <span className='text-xs font-medium'>{game.rating}</span>
            </div>
          )}
          {game.notes && (
            <span className='min-w-0 flex-1 truncate text-sm text-primary'>{game.notes}</span>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className='max-w-sm'>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete game?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently remove &quot;{game.title}&quot; from your library.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(game.id)}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

type GameListProps = {
  games: Game[];
  onEdit: (game: Game) => void;
  onRemove: (id: string) => void;
};

export function GameList({ games, onEdit, onRemove }: GameListProps) {
  if (games.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-center'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-card'>
          <Gamepad2 className='h-8 w-8 text-muted-foreground' />
        </div>
        <h3 className='mb-1 text-lg font-medium text-foreground'>No games found</h3>
        <p className='text-sm text-muted-foreground'>Add your first game to start tracking</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      {games.map((game) => (
        <GameCard key={game.id} game={game} onEdit={() => onEdit(game)} onDelete={() => onRemove(game.id)} />
      ))}
    </div>
  );
}
