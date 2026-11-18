import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Box, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PieceRequestModalProps {
  onClose: () => void;
  initialGameName?: string;
}

export const PieceRequestModal: React.FC<PieceRequestModalProps> = ({
  onClose,
  initialGameName = '',
}) => {
  const [gameName, setGameName] = useState(initialGameName);
  const [pieceName, setPieceName] = useState('');
  const [pieceType, setPieceType] = useState<'3d' | 'pdf'>('3d');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameName.trim() || !pieceName.trim()) return;

    setIsSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Demander une pièce manquante
              </h3>
              <p className="text-xs text-slate-400">
                La communauté 3D & archivistes GameRevive s'en charge !
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM OR SUCCESS */}
        {isSubmitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Demande enregistrée !</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Notre équipe va modéliser ou numériser cette pièce sous 48h. Vous recevrez une
              notification par e-mail.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nom du jeu *
              </label>
              <input
                type="text"
                required
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Ex: Les Loups-Garous, 7 Wonders, HeroQuest..."
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Type d'élément manquant
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPieceType('3d')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    pieceType === '3d'
                      ? 'bg-amber-500/15 border-amber-500/60 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  <span>Pièce 3D (STL)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPieceType('pdf')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    pieceType === 'pdf'
                      ? 'bg-rose-500/15 border-rose-500/60 text-rose-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Document PDF</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description de la pièce *
              </label>
              <input
                type="text"
                required
                value={pieceName}
                onChange={(e) => setPieceName(e.target.value)}
                placeholder="Ex: Pion sablier, dé 8 faces, carte personnage rouge..."
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Détails supplémentaires ou dimensions (optionnel)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Dimensions approximatives, couleur d'origine, forme..."
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Votre e-mail (pour être prévenu dès disponibilité)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.fr"
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Envoyer la demande</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
