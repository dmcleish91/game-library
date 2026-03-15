import { Input } from '@/components/ui/input';

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBox({ value, onChange, placeholder = 'Search games...' }: SearchBoxProps) {
  return (
    <Input
      type="search"
      aria-label="Search games"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
