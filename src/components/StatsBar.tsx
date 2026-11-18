import React from 'react';
import { Leaf, Box, Printer } from 'lucide-react';

export const StatsBar: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-sky-500/10 border border-slate-800 p-6 sm:p-8">
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <Leaf className="w-3.5 h-3.5" />
            <span>Mouvement Éco-Responsable & Zéro Déchet</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            72% des jeux abandonnés le sont pour une seule pièce perdue.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Grâce à l'impression 3D et aux archives numériques, redonnez vie à vos classiques.
            Fini les boîtes qui dorment au grenier ou finissent en déchetterie !
          </p>
        </div>

        {/* 3 STEP FLOW */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0 text-center">
          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto mb-1.5">
              <span className="font-extrabold text-sm">1</span>
            </div>
            <div className="text-xs font-bold text-slate-200">Recherchez</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Votre jeu de société</div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mx-auto mb-1.5">
              <Box className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-200">Prévisualisez</div>
            <div className="text-[10px] text-slate-400 mt-0.5">En 3D ou en PDF</div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto mb-1.5">
              <Printer className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-200">Imprimez</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Et rejouez de suite !</div>
          </div>
        </div>
      </div>
    </div>
  );
};
