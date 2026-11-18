import React, { useState } from 'react';
import {
  Box,
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  Layers,
  Star,
  Printer
} from 'lucide-react';
import type { Game, MissingPiece } from '../types/game';
import { createPieceMesh } from '../utils/threeGeometryGenerators';
import { downloadStl } from '../utils/stlDownloader';
import { generateGamePdf } from '../utils/pdfGenerators';

interface PieceCardProps {
  game: Game;
  piece: MissingPiece;
  onOpenViewer: (piece: MissingPiece) => void;
}

export const PieceCard: React.FC<PieceCardProps> = ({
  game,
  piece,
  onOpenViewer,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const is3D = piece.type === '3d';
  const meta3d = piece.metadata3d;
  const metaPdf = piece.metadataPdf;

  const handleDirectDownload = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (is3D && meta3d) {
      const mesh = createPieceMesh(meta3d.modelId, meta3d.defaultColor);
      downloadStl(mesh, `${game.name}_${piece.name}`, () => {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      });
    } else {
      generateGamePdf(game, piece, () => {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      });
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/40">
      {/* TOP HEADER */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span
              className={`flex items-center justify-center w-11 h-11 rounded-xl border ${
                is3D
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}
            >
              {is3D ? <Box className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </span>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    is3D
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}
                >
                  {is3D ? 'Modèle 3D STL' : 'Document PDF'}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {piece.rating}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors mt-0.5">
                {piece.name}
              </h4>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
          {piece.description}
        </p>

        {/* METADATA CHIPS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {is3D && meta3d && (
            <>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>{meta3d.estimatedPrintTime}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <Layers className="w-3 h-3 text-amber-400" />
                <span>{meta3d.dimensions}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <span>Poids : {meta3d.filamentWeight}</span>
              </span>
            </>
          )}

          {!is3D && metaPdf && (
            <>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <Printer className="w-3 h-3 text-rose-400" />
                <span>{metaPdf.format}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <span>{metaPdf.pageCount} page(s)</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <span>{metaPdf.printSide}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
        <button
          onClick={() => onOpenViewer(piece)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/70 transition-all hover:border-slate-600"
        >
          <Eye className="w-4 h-4 text-amber-400" />
          <span>{is3D ? 'Aperçu 3D' : 'Aperçu'}</span>
        </button>

        <button
          onClick={handleDirectDownload}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 ${
            downloadSuccess
              ? 'bg-emerald-500 text-slate-950 font-extrabold'
              : is3D
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
              : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white shadow-rose-500/20'
          }`}
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>Téléchargé !</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>{is3D ? 'STL (3D)' : 'PDF'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
