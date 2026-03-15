import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBox({
  value,
  onChange,
  placeholder = 'Search games...',
}: SearchBoxProps) {
  return (
    <div className="relative mb-4">
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-xl border-border bg-card pl-10 pr-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
        aria-label="Search games"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
  );
}
