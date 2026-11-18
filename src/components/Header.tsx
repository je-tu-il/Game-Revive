import React from 'react';
import { Dices, PlusCircle, Leaf, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onRequestClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRequestClick, onLogoClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Dices className="w-6 h-6 stroke-[2.2]" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white font-bold ring-2 ring-slate-950">
              <Leaf className="w-2.5 h-2.5" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Game<span className="text-amber-400">Revive</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Anti-Gaspillage
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Pièces 3D manquantes & règles PDF pour jeux de société
            </p>
          </div>
        </div>

        {/* STATS & COMMUNITY REQUEST */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-white">68 400+</strong> jeux sauvés
            </div>
            <span className="text-slate-700">|</span>
            <div className="text-slate-400">
              <strong className="text-amber-400">100%</strong> gratuit & libre
            </div>
          </div>

          <button
            onClick={onRequestClick}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all shadow-sm active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Demander une pièce</span>
            <span className="sm:hidden">Demander</span>
          </button>
        </div>
      </div>
    </header>
  );
};
