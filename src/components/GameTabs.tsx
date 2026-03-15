import { cn } from '@/lib/utils';
import { GAME_STATUS, type GameStatus } from '@/lib/gameModel';

export type TabValue = GameStatus | 'all';

type GameTabsProps = {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  counts: Record<TabValue, number>;
};

const tabs: { value: TabValue; label: string; labelShort?: string }[] = [
  { value: 'all', label: 'All' },
  { value: GAME_STATUS.BACKLOG, label: 'Backlog' },
  { value: GAME_STATUS.PLAYING, label: 'Playing', labelShort: 'Play' },
  { value: GAME_STATUS.COMPLETED, label: 'Done' },
  { value: GAME_STATUS.DROPPED, label: 'Dropped', labelShort: 'Drop' },
];

export function GameTabs({ activeTab, onTabChange, counts }: GameTabsProps) {
  return (
    <div
      className="mb-4 flex gap-1.5 overflow-x-auto pb-2 pr-1 scrollbar-hide"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:gap-2 sm:px-4 sm:py-2 sm:text-sm',
            activeTab === tab.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground'
          )}
        >
          <span className="sm:hidden">{tab.labelShort ?? tab.label}</span>
          <span className="hidden sm:inline">{tab.label}</span>
          <span
            className={cn(
              'flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs',
              activeTab === tab.value
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {counts[tab.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
