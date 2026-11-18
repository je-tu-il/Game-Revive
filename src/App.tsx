import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { GameCard } from './components/GameCard';
import { GameDetail } from './components/GameDetail';
import { ThreeViewerModal } from './components/ThreeViewerModal';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { PieceRequestModal } from './components/PieceRequestModal';
import { StatsBar } from './components/StatsBar';
import { GAMES_DATABASE } from './data/gamesData';
import type { Game, MissingPiece } from './types/game';
import { Dices, AlertCircle, Sparkles } from 'lucide-react';

export function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [active3dPiece, setActive3dPiece] = useState<MissingPiece | null>(null);
  const [activePdfPiece, setActivePdfPiece] = useState<MissingPiece | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    GAMES_DATABASE.forEach((g) => set.add(g.category));
    return Array.from(set);
  }, []);

  // Filtered games based on search and category
  const filteredGames = useMemo(() => {
    return GAMES_DATABASE.filter((game) => {
      // Category filter
      if (selectedCategory !== 'Tous' && game.category !== selectedCategory) {
        return false;
      }

      // Search term filter (searches game name, publisher, category, and piece names!)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesGame =
          game.name.toLowerCase().includes(query) ||
          game.subtitle.toLowerCase().includes(query) ||
          game.publisher.toLowerCase().includes(query) ||
          game.category.toLowerCase().includes(query);

        const matchesPiece = game.pieces.some(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.subtitle.toLowerCase().includes(query) ||
            p.tags.some((t) => t.toLowerCase().includes(query))
        );

        return matchesGame || matchesPiece;
      }

      return true;
    });
  }, [searchTerm, selectedCategory]);

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenViewer = (piece: MissingPiece) => {
    if (piece.type === '3d') {
      setActive3dPiece(piece);
    } else {
      setActivePdfPiece(piece);
    }
  };

  const handleSelectQuickName = (name: string) => {
    setSearchTerm(name);
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* HEADER */}
      <Header
        onRequestClick={() => setIsRequestModalOpen(true)}
        onLogoClick={() => {
          setSelectedGame(null);
          setSearchTerm('');
          setSelectedCategory('Tous');
        }}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {selectedGame ? (
          /* GAME DETAIL VIEW */
          <GameDetail
            game={selectedGame}
            onBack={() => setSelectedGame(null)}
            onOpenViewer={handleOpenViewer}
            onRequestPiece={() => setIsRequestModalOpen(true)}
          />
        ) : (
          /* SEARCH & CATALOG VIEW */
          <div className="space-y-10">
            {/* HERO SECTION */}
            <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 pb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plateforme de restauration de jeux de société</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Une pièce perdue ? <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  Téléchargez-la en 3D ou en PDF.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
                Recherchez votre jeu préféré, sélectionnez les pions 3D (STL) ou les règles &
                feuilles de marque (PDF) manquantes, et redonnez-lui vie en quelques minutes.
              </p>
            </div>

            {/* SEARCH COMPONENT */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={(val) => setSearchTerm(val)}
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
              categories={categories}
              onSelectGameName={handleSelectQuickName}
            />

            {/* STATS & IMPACT BAR */}
            <StatsBar />

            {/* GAMES RESULTS LIST */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Dices className="w-5 h-5 text-amber-400" />
                    <span>
                      {searchTerm
                        ? `Résultats pour « ${searchTerm} »`
                        : selectedCategory !== 'Tous'
                        ? `Jeux de la catégorie « ${selectedCategory} »`
                        : 'Catalogue des jeux supportés'}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    {filteredGames.length} jeu(x) disponible(s) avec pièces 3D et PDF vérifiés
                  </p>
                </div>
              </div>

              {filteredGames.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">
                    Aucun jeu ne correspond à votre recherche
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Nous enrichissons le catalogue chaque semaine. Vous pouvez nous soumettre
                    ce jeu pour que notre équipe le modélise gratuitement !
                  </p>
                  <button
                    onClick={() => setIsRequestModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
                  >
                    <span>Demander l'ajout de ce jeu</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isSelected={false}
                      onSelect={handleSelectGame}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">GameRevive</span>
            <span>— Initiative libre & solidaire pour le réemploi des jeux de société.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>STL universel 3D</span>
            <span>•</span>
            <span>PDF 100% Vectoriel</span>
            <span>•</span>
            <span>Fabriqué avec passion</span>
          </div>
        </div>
      </footer>

      {/* 3D VIEWER MODAL */}
      {active3dPiece && selectedGame && (
        <ThreeViewerModal
          game={selectedGame}
          piece={active3dPiece}
          onClose={() => setActive3dPiece(null)}
        />
      )}

      {/* PDF PREVIEW MODAL */}
      {activePdfPiece && selectedGame && (
        <PdfPreviewModal
          game={selectedGame}
          piece={activePdfPiece}
          onClose={() => setActivePdfPiece(null)}
        />
      )}

      {/* REQUEST PIECE MODAL */}
      {isRequestModalOpen && (
        <PieceRequestModal
          initialGameName={selectedGame?.name || searchTerm}
          onClose={() => setIsRequestModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
