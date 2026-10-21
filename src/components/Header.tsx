import { useState } from 'react';
import { Search, Menu, X, Gem } from 'lucide-react';
import { CATEGORIES } from '@/lib/supabase';

type HeaderProps = {
  onNavigate: (view: { type: 'home' } | { type: 'category'; category: string } | { type: 'search'; query: string }) => void;
  onSearch: (query: string) => void;
};

export default function Header({ onNavigate, onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      onNavigate({ type: 'search', query: searchValue.trim() });
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  const handleNav = (action: Parameters<typeof onNavigate>[0]) => {
    onNavigate(action);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f7f4ee]/95 backdrop-blur-sm border-b border-[#e0d8c8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav({ type: 'home' })}
            className="flex items-center gap-2 group"
          >
            <Gem className="w-7 h-7 md:w-8 md:h-8 text-[#9a7b4f] group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl md:text-2xl font-serif tracking-wide text-[#3a3527]">
              Lumen
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNav({ type: 'home' })}
              className="text-sm font-medium text-[#5a5040] hover:text-[#9a7b4f] transition-colors"
            >
              Inicio
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleNav({ type: 'category', category: cat.key })}
                className="text-sm font-medium text-[#5a5040] hover:text-[#9a7b4f] transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#5a5040] hover:text-[#9a7b4f] transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-[#5a5040] hover:text-[#9a7b4f] transition-colors"
              aria-label="Menú"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a7b4f]" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar collares, aretes, oro, plata..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#e0d8c8] text-sm text-[#3a3527] placeholder:text-[#a99e85] focus:outline-none focus:border-[#9a7b4f] focus:ring-1 focus:ring-[#9a7b4f] transition-colors"
              />
            </div>
          </form>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-1">
            <button
              onClick={() => handleNav({ type: 'home' })}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#5a5040] hover:bg-[#efe9dd] transition-colors"
            >
              Inicio
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleNav({ type: 'category', category: cat.key })}
                className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#5a5040] hover:bg-[#efe9dd] transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
