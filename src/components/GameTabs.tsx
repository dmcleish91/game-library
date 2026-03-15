import { cn } from '@/lib/utils';
import { GAME_STATUS, type GameStatus } from '@/lib/gameModel';

export type TabValue = GameStatus | 'all';

type GameTabsProps = {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  counts: Record<TabValue, number>;
};

const tabs: { value: TabValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: GAME_STATUS.BACKLOG, label: 'Backlog' },
  { value: GAME_STATUS.PLAYING, label: 'Playing' },
  { value: GAME_STATUS.COMPLETED, label: 'Done' },
  { value: GAME_STATUS.DROPPED, label: 'Dropped' },
];

export function GameTabs({ activeTab, onTabChange, counts }: GameTabsProps) {
  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
            activeTab === tab.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground'
          )}
        >
          {tab.label}
          <span
            className={cn(
              'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs',
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
