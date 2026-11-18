export type PieceType = '3d' | 'pdf';

export interface Piece3DMetadata {
  dimensions: string; // e.g., "16 x 16 x 10 mm"
  estimatedPrintTime: string; // e.g., "12 min"
  filamentWeight: string; // e.g., "3.5 g"
  supportsNeeded: boolean;
  recommendedMaterial: string; // e.g., "PLA ou PETG"
  infill: string; // e.g., "20%"
  layerHeight: string; // e.g., "0.16 - 0.20 mm"
  modelId: 'meeple' | 'catan-settlement' | 'catan-city' | 'catan-road' | 'catan-robber' | 'monopoly-house' | 'monopoly-hotel' | 'monopoly-hat' | 'connect4-disc' | 'ttr-train' | 'chess-pawn' | 'chess-rook' | 'scrabble-rack' | 'scrabble-tile' | 'dice-d6' | 'cluedo-candlestick';
  defaultColor: string;
}

export interface PiecePdfMetadata {
  pageCount: number;
  format: 'A4' | 'A5' | 'Cartes découpables';
  printSide: 'Recto seul' | 'Recto-verso';
  recommendedPaper: string; // e.g., "Papier standard 80g" ou "Papier fort 200g-250g"
  colorMode: 'Couleur recommandée' | 'Noir & Blanc optimisé';
  documentType: 'rules' | 'scoresheet' | 'cards' | 'aid';
}

export interface MissingPiece {
  id: string;
  name: string;
  subtitle: string;
  type: PieceType;
  description: string;
  downloadsCount: number;
  rating: number;
  tags: string[];
  metadata3d?: Piece3DMetadata;
  metadataPdf?: PiecePdfMetadata;
}

export interface Game {
  id: string;
  name: string;
  subtitle: string;
  publisher: string;
  year: number;
  category: 'Stratégie' | 'Familial' | 'Enquête & Déduction' | 'Lettres & Mots' | 'Classique' | 'Pose de tuiles';
  players: string;
  playtime: string;
  minAge: string;
  coverImage: string;
  bannerColor: string;
  description: string;
  pieces: MissingPiece[];
  totalSavedGames: number;
}
