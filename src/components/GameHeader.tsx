import { Download, Gamepad2, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

type GameHeaderProps = {
  onAddClick: () => void;
  onExportClick: () => void;
  onImportClick?: () => void;
  showImportButton?: boolean;
};

export function GameHeader({ onAddClick, onExportClick, onImportClick, showImportButton }: GameHeaderProps) {
  return (
    <header className='sticky top-0 z-10 bg-background/80 pt-6 pb-4 backdrop-blur-lg'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary'>
            <Gamepad2 className='h-5 w-5 text-primary-foreground' />
          </div>
          <div>
            <h1 className='text-xl font-semibold text-foreground'>Game Library</h1>
            <p className='text-xs text-muted-foreground'>Track your collection</p>
          </div>
        </div>
        <div className='flex gap-1'>
          {showImportButton && onImportClick && (
            <Button
              size='icon'
              className='h-10 w-10 rounded-xl bg-secondary hover:bg-primary/90'
              onClick={onImportClick}
              aria-label='Import list'>
              <Upload className='h-5 w-5' />
              <span className='sr-only'>Import list</span>
            </Button>
          )}
          <Button
            size='icon'
            className='h-10 w-10 rounded-xl bg-secondary hover:bg-primary/90'
            onClick={onExportClick}
            aria-label='Export list'>
            <Download className='h-5 w-5' />
            <span className='sr-only'>Export List</span>
          </Button>
          <Button size='icon' className='h-10 w-10 rounded-xl bg-primary hover:bg-primary/90' onClick={onAddClick} aria-label='Add game'>
            <Plus className='h-5 w-5' />
            <span className='sr-only'>Add game</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
