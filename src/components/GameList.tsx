import type { Game } from '@/lib/gameModel';
import { GAME_STATUS } from '@/lib/gameModel';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Star, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameListProps = {
  games: Game[];
  onEdit: (game: Game) => void;
  onRemove: (id: string) => void;
};

function StatusBadge({ status }: { status: Game['status'] }) {
  const isHighlight = status === GAME_STATUS.PLAYING || status === GAME_STATUS.COMPLETED;
  const label =
    status === GAME_STATUS.COMPLETED
      ? 'Completed'
      : status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium',
        isHighlight
          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
          : 'bg-muted text-muted-foreground'
      )}
    >
      {label}
    </span>
  );
}

export function GameList({ games, onEdit, onRemove }: GameListProps) {
  if (games.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">No games in your library.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {games.map((game) => (
        <li key={game.id}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-foreground">{game.title}</h3>
                <p className="text-sm text-muted-foreground">{game.platform}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-accent hover:text-accent-foreground"
                  aria-label="Options"
                >
                  <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(game)}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onRemove(game.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-1.5 pt-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={game.status} />
                {game.rating > 0 && (
                  <span className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                    <Star className="size-4 fill-current" />
                    {game.rating}
                  </span>
                )}
              </div>
              {game.notes ? (
                <p className="text-sm text-muted-foreground">{game.notes}</p>
              ) : null}
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
