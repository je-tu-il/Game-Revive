import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  Layers,
  BookOpen,
} from 'lucide-react';
import type { Game, MissingPiece } from '../types/game';
import { generateGamePdf } from '../utils/pdfGenerators';

interface PdfPreviewModalProps {
  game: Game;
  piece: MissingPiece;
  onClose: () => void;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  game,
  piece,
  onClose,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const meta = piece.metadataPdf;

  const handleDownload = () => {
    generateGamePdf(game, piece, () => {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100">{piece.name}</h3>
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Document PDF
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {game.name} • Prêt à imprimer à l'échelle 100%
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
          {/* VISUAL PAPER PREVIEW (Left) */}
          <div className="md:col-span-7 p-6 bg-slate-950 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800">
            {/* Sheet of Paper Simulation */}
            <div className="w-full max-w-sm aspect-[1/1.414] bg-white text-slate-900 rounded-lg shadow-2xl p-5 flex flex-col justify-between border border-slate-300 transform transition-transform hover:scale-[1.02]">
              <div>
                {/* Paper Header */}
                <div className="border-b-2 border-slate-900 pb-2 mb-3">
                  <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                    GAMEREVIVE ARCHIVES
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 uppercase">
                    {game.name}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700">
                    {piece.name}
                  </div>
                </div>

                {/* Simulated Content based on type */}
                {meta?.documentType === 'scoresheet' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] text-slate-600 border-b border-slate-200 pb-1">
                      <span>Date: ___/___/___</span>
                      <span>Partie N° ___</span>
                    </div>
                    {/* Simulated score grid */}
                    <div className="border border-slate-400 rounded text-[8px]">
                      <div className="grid grid-cols-5 bg-slate-100 font-bold border-b border-slate-400 p-1">
                        <span>Critères</span>
                        <span>J1</span>
                        <span>J2</span>
                        <span>J3</span>
                        <span>J4</span>
                      </div>
                      {[1, 2, 3, 4, 5].map((row) => (
                        <div key={row} className="grid grid-cols-5 border-b border-slate-200 p-1">
                          <span className="text-slate-600">Points Tour {row}</span>
                          <span className="text-slate-300">...</span>
                          <span className="text-slate-300">...</span>
                          <span className="text-slate-300">...</span>
                          <span className="text-slate-300">...</span>
                        </div>
                      ))}
                      <div className="grid grid-cols-5 bg-amber-50 font-bold p-1 text-amber-900">
                        <span>TOTAL</span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                ) : meta?.documentType === 'cards' ? (
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((c) => (
                      <div
                        key={c}
                        className="border-2 border-dashed border-slate-400 rounded p-1.5 flex flex-col justify-between h-20 bg-slate-50"
                      >
                        <div className="text-[8px] font-bold text-slate-800">
                          CARTE N° {c}
                        </div>
                        <div className="text-[7px] text-slate-500 line-clamp-2">
                          Instructions de jeu officielles et bonus...
                        </div>
                        <div className="text-[6px] text-slate-400">✂ Découper</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 text-[8px] text-slate-700">
                    <div className="p-1.5 bg-slate-100 rounded font-semibold text-slate-900">
                      1. MISE EN PLACE ET BUT DU JEU
                    </div>
                    <p className="line-clamp-3 text-slate-600 leading-snug">
                      Disposez le plateau au centre. Chaque joueur reçoit son équipement. Le
                      premier joueur lance les dés ou pose la première tuile...
                    </p>
                    <div className="p-1.5 bg-slate-100 rounded font-semibold text-slate-900">
                      2. DÉROULEMENT DU TOUR
                    </div>
                    <p className="line-clamp-4 text-slate-600 leading-snug">
                      Effectuez les actions suivantes : tirage, négociation, déplacement et
                      achat de ressources. Passez au joueur à votre gauche.
                    </p>
                  </div>
                )}
              </div>

              {/* Paper Footer */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[7px] text-slate-500">
                <span>Échelle 100% • Ne pas ajuster</span>
                <span>Page 1 / {meta?.pageCount || 1}</span>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Aperçu du rendu final d'impression</span>
            </div>
          </div>

          {/* DETAILS & PRINT RECOMMENDATIONS (Right) */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between bg-slate-900/60">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-400">
                  Caractéristiques du document
                </h4>
              </div>

              <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                {piece.description}
              </p>

              {/* SPEC GRID */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>Format</span>
                  </div>
                  <span className="text-base font-bold text-slate-100">
                    {meta?.format || 'A4 standard'}
                  </span>
                </div>

                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pages</span>
                  </div>
                  <span className="text-base font-bold text-slate-100">
                    {meta?.pageCount ? `${meta.pageCount} page(s)` : '1 page'}
                  </span>
                </div>

                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                  <div className="text-slate-400 text-xs mb-1">Impression conseillée</div>
                  <span className="text-sm font-semibold text-slate-200">
                    {meta?.printSide || 'Recto'}
                  </span>
                </div>

                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                  <div className="text-slate-400 text-xs mb-1">Mode d'encre</div>
                  <span className="text-sm font-semibold text-amber-400">
                    {meta?.colorMode || 'Couleur'}
                  </span>
                </div>
              </div>

              {/* PRINTING TIPS */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl mb-6">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Printer className="w-3.5 h-3.5 text-rose-400" />
                  Conseils d'impression & Finition
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>
                    Papier recommandé : <strong className="text-slate-200">{meta?.recommendedPaper || 'Papier standard 80g'}</strong>
                  </li>
                  <li>
                    Échelle d'impression : <strong className="text-slate-200">100% (Taille réelle)</strong>, désactiver « Adapter à la page »
                  </li>
                  <li>
                    Plastification conseillée pour les cartes et fiches de scores réutilisables avec feutre effaçable
                  </li>
                </ul>
              </div>
            </div>

            {/* DOWNLOAD ACTION */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold rounded-xl shadow-lg shadow-rose-500/25 transition-all transform active:scale-98"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>PDF Téléchargé avec Succès !</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Télécharger le Document (.PDF)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>Fichier PDF vectoriel haute résolution</span>
                <span>Téléchargement direct et gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
