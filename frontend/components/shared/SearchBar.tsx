import { Search, X } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps {
  search: string;
  setSearch: (q: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  search,
  setSearch,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        className="pl-9 bg-background border-border"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
