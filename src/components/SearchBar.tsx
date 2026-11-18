import React from 'react';
import { Search, X, Sparkles, Flame } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  onSelectGameName: (name: string) => void;
}

const QUICK_GAMES = [
  { label: 'Catan', query: 'Catan' },
  { label: 'Monopoly', query: 'Monopoly' },
  { label: 'Carcassonne', query: 'Carcassonne' },
  { label: 'Puissance 4', query: 'Puissance 4' },
  { label: 'Aventuriers du Rail', query: 'Aventuriers' },
  { label: 'Cluedo', query: 'Cluedo' },
  { label: 'Scrabble', query: 'Scrabble' },
  { label: 'Échecs', query: 'Échecs' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onSelectGameName,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* SEARCH INPUT BAR */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none" />

        <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-xl overflow-hidden focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all">
          <div className="pl-5 text-slate-400">
            <Search className="w-6 h-6 text-amber-400" />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tapez le nom d'un jeu (ex: Catan, Monopoly, Carcassonne, Puissance 4...)"
            className="w-full py-4.5 px-4 bg-transparent text-slate-100 placeholder-slate-400 text-base sm:text-lg focus:outline-none"
            autoFocus
          />

          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="mr-3 p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
              title="Effacer la recherche"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 mr-4 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Recherche instantanée</span>
          </div>
        </div>
      </div>

      {/* QUICK SUGGESTION PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400 no-scrollbar">
        <div className="flex items-center gap-1 text-amber-400 font-semibold shrink-0">
          <Flame className="w-3.5 h-3.5" />
          <span>Populaires :</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {QUICK_GAMES.map((item) => (
            <button
              key={item.query}
              onClick={() => onSelectGameName(item.query)}
              className="px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700/60 hover:border-amber-500/40 transition-all text-xs"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY FILTER CHIPS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
        <button
          onClick={() => onCategoryChange('Tous')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'Tous'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/50'
          }`}
        >
          Tous les genres
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
