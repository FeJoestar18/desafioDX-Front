import { Search, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="h-[80px] bg-transparent flex items-center justify-between px-xl">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Overview</h1>
      </div>

      <div className="flex items-center gap-lg">
        <div className="relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-secondary group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-b border-border pl-8 pr-4 py-2 text-[14px] text-text-primary placeholder:text-text-secondary outline-none focus:border-secondary transition-all w-[240px]"
          />
        </div>

        <div className="flex items-center gap-md">
          <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-background"></span>
          </button>
          
          <div className="h-6 w-px bg-border"></div>
          
          <div className="flex items-center gap-sm cursor-pointer hover:opacity-80 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-border object-cover"
            />
            <div className="hidden md:block">
              <p className="text-[14px] font-semibold text-text-primary leading-tight">Élin Duxus</p>
              <p className="text-[12px] text-text-secondary">Product Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
