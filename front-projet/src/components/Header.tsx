import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="h-[80px] bg-transparent flex items-center justify-between px-xl">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Overview</h1>
      </div>

      <div className="flex items-center gap-lg">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#F1F5F9] rounded-full pl-10 pr-4 py-[10px] text-sm text-text-primary placeholder:text-text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all w-[240px]"
          />
        </div>
      </div>
    </header>
  );
}
