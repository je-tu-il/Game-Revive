import React, { useState } from 'react';
import {
  ArrowLeft,
  Box,
  FileText,
  Users,
  Clock,
  Calendar,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import type { Game, MissingPiece } from '../types/game';
import { PieceCard } from './PieceCard';

interface GameDetailProps {
  game: Game;
  onBack: () => void;
  onOpenViewer: (piece: MissingPiece) => void;
  onRequestPiece: () => void;
}

export const GameDetail: React.FC<GameDetailProps> = ({
  game,
  onBack,
  onOpenViewer,
  onRequestPiece,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | '3d' | 'pdf'>('all');

  const count3d = game.pieces.filter((p) => p.type === '3d').length;
  const countPdf = game.pieces.filter((p) => p.type === 'pdf').length;

  const filteredPieces = game.pieces.filter((piece) => {
    if (activeTab === '3d') return piece.type === '3d';
    if (activeTab === 'pdf') return piece.type === 'pdf';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* BACK NAVIGATION */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all group"
      >
        <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
        <span>Retourner à la recherche des jeux</span>
      </button>

      {/* GAME HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={game.coverImage}
            alt={game.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />

          {/* BADGES & STATS ON BANNER */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs font-bold rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
              {game.category}
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-xl bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-700/60 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{game.year}</span>
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-xl bg-emerald-500/10 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{game.totalSavedGames.toLocaleString()} boîtes sauvées</span>
            </span>
          </div>

          {/* TITLE & META IN BANNER */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {game.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl">
              {game.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                <span>{game.players}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{game.playtime}</span>
              </div>
              <span>•</span>
              <div className="text-slate-400">
                Âge conseillé : <strong className="text-slate-200">{game.minAge}</strong>
              </div>
              <span>•</span>
              <div className="text-slate-400">
                Éditeur : <strong className="text-slate-200">{game.publisher}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION BAR */}
        <div className="p-4 sm:p-6 bg-slate-900/90 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            {game.description}
          </p>

          <button
            onClick={onRequestPiece}
            className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all hover:border-slate-600"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Pièce introuvable ?</span>
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>Toutes les pièces</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'all' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {game.pieces.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('3d')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === '3d'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>Modèles 3D (STL)</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === '3d' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {count3d}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'pdf'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Documents PDF</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'pdf' ? 'bg-slate-950/20 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {countPdf}
            </span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Fichiers vérifiés par la communauté</span>
        </div>
      </div>

      {/* PIECES GRID */}
      {filteredPieces.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800">
          <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">
            Aucune pièce trouvée dans cette catégorie
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Consultez toutes les pièces ou proposez un nouveau modèle à la communauté.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPieces.map((piece) => (
            <PieceCard
              key={piece.id}
              game={game}
              piece={piece}
              onOpenViewer={onOpenViewer}
            />
          ))}
        </div>
      )}
    </div>
  );
};
