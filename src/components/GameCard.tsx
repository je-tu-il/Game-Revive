import React from 'react';
import { Box, FileText, Users, Clock, ArrowRight } from 'lucide-react';
import type { Game } from '../types/game';

interface GameCardProps {
  game: Game;
  isSelected: boolean;
  onSelect: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, isSelected, onSelect }) => {
  const count3d = game.pieces.filter((p) => p.type === '3d').length;
  const countPdf = game.pieces.filter((p) => p.type === 'pdf').length;

  return (
    <div
      onClick={() => onSelect(game)}
      className={`group relative flex flex-col justify-between bg-slate-900 border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 ${
        isSelected
          ? 'border-amber-400 ring-2 ring-amber-400/30 bg-slate-850'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* TOP IMAGE BANNER */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-800">
        <img
          src={game.coverImage}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* CATEGORY BADGE */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
            {game.category}
          </span>
        </div>

        {/* YEAR BADGE */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-950/70 backdrop-blur-md text-slate-300">
            {game.year}
          </span>
        </div>

        {/* TITLE OVERLAY */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {game.name}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-1">{game.publisher}</p>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* GAME METAS */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{game.players}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{game.playtime}</span>
          </div>
        </div>

        {/* PIECES AVAILABILITY BADGES */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
          {count3d > 0 && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
              <Box className="w-3.5 h-3.5" />
              <span>{count3d} 3D (STL)</span>
            </span>
          )}

          {countPdf > 0 && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20">
              <FileText className="w-3.5 h-3.5" />
              <span>{countPdf} PDF</span>
            </span>
          )}
        </div>

        {/* ACTION BUTTON */}
        <div className="pt-1 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
          <span>Voir les pièces manquantes</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
