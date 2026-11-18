import type { Game } from '../types/game';

export const GAMES_DATABASE: Game[] = [
  {
    id: 'catan',
    name: 'Les Colons de Catane',
    subtitle: 'Catan - Le jeu de commerce et d\'aménagement',
    publisher: 'Kosmos / Studio Play / Asmodee',
    year: 1995,
    category: 'Stratégie',
    players: '3 - 4 joueurs',
    playtime: '60 - 90 min',
    minAge: '10 ans +',
    coverImage: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    bannerColor: 'from-amber-600 to-orange-800',
    description: 'Bâtissez des routes, fondez des colonies et faites-les prospérer en échangeant vos ressources minières, céréalières et pastorales. Une pièce perdue bloque une couleur complète !',
    totalSavedGames: 14200,
    pieces: [
      {
        id: 'catan-settlement-piece',
        name: 'Colonie Catan (Maison)',
        subtitle: 'Bâtiment standard 1 point de victoire',
        type: '3d',
        description: 'La petite maison en bois emblématique qui s\'installe sur les intersections d\'hexagones. Remplaçable en 4 couleurs.',
        downloadsCount: 18450,
        rating: 4.9,
        tags: ['Pion joueur', 'Essentiel', 'Rapide à imprimer'],
        metadata3d: {
          dimensions: '11 x 11 x 14 mm',
          estimatedPrintTime: '11 min',
          filamentWeight: '1.8 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Bois ou standard',
          infill: '20%',
          layerHeight: '0.16 mm',
          modelId: 'catan-settlement',
          defaultColor: '#dc2626'
        }
      },
      {
        id: 'catan-city-piece',
        name: 'Ville Fortifiée Catan',
        subtitle: 'Bâtiment majeur 2 points de victoire',
        type: '3d',
        description: 'Bâtiment avec remparts et tour carrée, représentant l\'évolution de la colonie.',
        downloadsCount: 12900,
        rating: 4.8,
        tags: ['Pion joueur', 'Bâtiment', 'Sans support'],
        metadata3d: {
          dimensions: '15 x 12 x 18 mm',
          estimatedPrintTime: '18 min',
          filamentWeight: '3.2 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA standard',
          infill: '20%',
          layerHeight: '0.16 mm',
          modelId: 'catan-city',
          defaultColor: '#2563eb'
        }
      },
      {
        id: 'catan-road-piece',
        name: 'Route de liaison',
        subtitle: 'Segment de voie 25 mm',
        type: '3d',
        description: 'Bâtonnet de route reliant deux intersections. Imprimez un lot de 5 en moins d\'une heure.',
        downloadsCount: 9320,
        rating: 4.9,
        tags: ['Segment', 'Ultra rapide'],
        metadata3d: {
          dimensions: '25 x 5 x 5 mm',
          estimatedPrintTime: '7 min',
          filamentWeight: '0.9 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA',
          infill: '25%',
          layerHeight: '0.20 mm',
          modelId: 'catan-road',
          defaultColor: '#16a34a'
        }
      },
      {
        id: 'catan-robber-piece',
        name: 'Le Voleur (Pillard du désert)',
        subtitle: 'Figurine neutre du pion noir',
        type: '3d',
        description: 'Le pion voleur placé sur le chiffre 7 qui bloque la production des hexagones ciblés.',
        downloadsCount: 8150,
        rating: 4.7,
        tags: ['Figurine neutre', 'Antagoniste'],
        metadata3d: {
          dimensions: '14 x 14 x 32 mm',
          estimatedPrintTime: '26 min',
          filamentWeight: '4.5 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Noir ou Gris ardoise',
          infill: '15%',
          layerHeight: '0.16 mm',
          modelId: 'catan-robber',
          defaultColor: '#1e293b'
        }
      },
      {
        id: 'catan-rules-pdf',
        name: 'Livret des Règles Officielles & Guide d\'Installation',
        subtitle: 'Format A4 haute lisibilité - 12 pages',
        type: 'pdf',
        description: 'Le règlement complet officiel en français : mise en place de l\'île, échanges maritimes, cartes de développement et décompte final.',
        downloadsCount: 22100,
        rating: 4.9,
        tags: ['Règles officielles', 'A4', 'Recto-Verso'],
        metadataPdf: {
          pageCount: 12,
          format: 'A4',
          printSide: 'Recto-verso',
          recommendedPaper: 'Papier standard 80g à 90g',
          colorMode: 'Couleur recommandée',
          documentType: 'rules'
        }
      },
      {
        id: 'catan-cost-card-pdf',
        name: 'Fiches Coûts de Construction & Aide de Jeu',
        subtitle: 'Planche de 4 fiches joueur à découper',
        type: 'pdf',
        description: 'Les fiches indispensables résumant les recettes de matières premières nécessaires pour chaque bâtiment, route et carte.',
        downloadsCount: 15400,
        rating: 4.9,
        tags: ['Aide de jeu', 'Fiches à découper', 'Cartonné recommandé'],
        metadataPdf: {
          pageCount: 2,
          format: 'A4',
          printSide: 'Recto seul',
          recommendedPaper: 'Papier bristol / fort 200g - 250g',
          colorMode: 'Couleur recommandée',
          documentType: 'aid'
        }
      }
    ]
  },
  {
    id: 'monopoly',
    name: 'Monopoly Classique',
    subtitle: 'Le célèbre jeu des transactions immobilières',
    publisher: 'Hasbro / Parker Brothers',
    year: 1935,
    category: 'Familial',
    players: '2 - 8 joueurs',
    playtime: '60 - 180 min',
    minAge: '8 ans +',
    coverImage: 'https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=800&q=80',
    bannerColor: 'from-emerald-700 to-teal-900',
    description: 'Achetez, louez et construisez des maisons et hôtels dans les rues les plus prisées. Ne laissez plus une boîte incomplète gâcher vos soirées en famille !',
    totalSavedGames: 28900,
    pieces: [
      {
        id: 'monopoly-green-house',
        name: 'Maison Verte Monopoly',
        subtitle: 'Petite maison avec cheminée (12 x 10 mm)',
        type: '3d',
        description: 'La maisonnette verte traditionnelle avec son toit à double pente et son petit conduit de cheminée. Réplique exacte du jeu vintage et moderne.',
        downloadsCount: 34100,
        rating: 4.9,
        tags: ['Immobilier', 'Maison verte', 'Lot facile'],
        metadata3d: {
          dimensions: '12 x 10 x 9 mm',
          estimatedPrintTime: '8 min',
          filamentWeight: '1.2 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Vert émeraude',
          infill: '20%',
          layerHeight: '0.16 mm',
          modelId: 'monopoly-house',
          defaultColor: '#15803d'
        }
      },
      {
        id: 'monopoly-red-hotel',
        name: 'Hôtel Rouge Monopoly',
        subtitle: 'Grand hôtel de luxe (18 x 12 mm)',
        type: '3d',
        description: 'Le grand bâtiment rouge qui remplace 4 maisons vertes pour maximiser les loyers.',
        downloadsCount: 21300,
        rating: 4.8,
        tags: ['Immobilier', 'Hôtel rouge'],
        metadata3d: {
          dimensions: '18 x 12 x 14 mm',
          estimatedPrintTime: '15 min',
          filamentWeight: '2.4 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Rouge vif',
          infill: '20%',
          layerHeight: '0.16 mm',
          modelId: 'monopoly-hotel',
          defaultColor: '#b91c1c'
        }
      },
      {
        id: 'monopoly-top-hat',
        name: 'Pion Chapeau Haut-de-Forme',
        subtitle: 'Pion joueur vintage en métal / 3D',
        type: '3d',
        description: 'Le couvre-chef emblématique du riche banquier de Monopoly. Imprimable en filament métallique (soie grise ou bronze).',
        downloadsCount: 16800,
        rating: 4.9,
        tags: ['Pion joueur', 'Classique', 'Métallique conseillé'],
        metadata3d: {
          dimensions: '15 x 15 x 20 mm',
          estimatedPrintTime: '19 min',
          filamentWeight: '3.0 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Soie Argent ou Noir',
          infill: '20%',
          layerHeight: '0.12 mm',
          modelId: 'monopoly-hat',
          defaultColor: '#334155'
        }
      },
      {
        id: 'monopoly-money-pdf',
        name: 'Planche Complète de Billets de Banque',
        subtitle: 'Coupures de 1€, 5€, 10€, 20€, 50€, 100€ et 500€',
        type: 'pdf',
        description: 'Planches A4 prêtes à imprimer avec repères de découpe pour refaire toute la banque de billets de votre Monopoly.',
        downloadsCount: 42000,
        rating: 4.9,
        tags: ['Billets', 'Banque', 'Print & Cut'],
        metadataPdf: {
          pageCount: 7,
          format: 'A4',
          printSide: 'Recto seul',
          recommendedPaper: 'Papier standard 80g couleur ou blanc',
          colorMode: 'Couleur recommandée',
          documentType: 'cards'
        }
      },
      {
        id: 'monopoly-chance-cards-pdf',
        name: 'Cartes Chance & Caisse de Communauté',
        subtitle: 'Paquet complet de 32 cartes avec dos imprimable',
        type: 'pdf',
        description: 'Ne cherchez plus les cartes manquantes ! Toutes les cartes de tirage avec les textes classiques (Erreur de la banque, Allez en prison, etc.).',
        downloadsCount: 29500,
        rating: 4.8,
        tags: ['Cartes à jouer', 'Chance', 'Cartonné'],
        metadataPdf: {
          pageCount: 4,
          format: 'Cartes découpables',
          printSide: 'Recto-verso',
          recommendedPaper: 'Papier photo ou bristol 250g',
          colorMode: 'Couleur recommandée',
          documentType: 'cards'
        }
      },
      {
        id: 'monopoly-rules-pdf',
        name: 'Livret de Règles Officielles & Variantes Rapides',
        subtitle: 'Règles standard et règles officielles tournoi',
        type: 'pdf',
        description: 'Clarifiez enfin les vraies règles (enchères obligatoires, parc gratuit, sortie de prison) pour éviter les disputes familiales !',
        downloadsCount: 31200,
        rating: 4.9,
        tags: ['Règles officielles', 'Arbitrage'],
        metadataPdf: {
          pageCount: 6,
          format: 'A4',
          printSide: 'Recto-verso',
          recommendedPaper: 'Papier standard 80g',
          colorMode: 'Noir & Blanc optimisé',
          documentType: 'rules'
        }
      }
    ]
  },
  {
    id: 'carcassonne',
    name: 'Carcassonne',
    subtitle: 'Pose de tuiles médiévales dans le pays cathare',
    publisher: 'Hans im Glück / Z-Man Games',
    year: 2000,
    category: 'Pose de tuiles',
    players: '2 - 5 joueurs',
    playtime: '35 - 45 min',
    minAge: '7 ans +',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    bannerColor: 'from-blue-700 to-indigo-950',
    description: 'Piochez et posez des tuiles pour créer des routes, des cités fortifiées, des monastères et des prés. Placez judicieusement vos partisans (les fameux Meeples).',
    totalSavedGames: 19400,
    pieces: [
      {
        id: 'carcassonne-meeple-piece',
        name: 'Meeple Partisan Classique (16 mm)',
        subtitle: 'Le bonhomme en bois emblématique des jeux modernes',
        type: '3d',
        description: 'La pièce universelle de Carcassonne. Dimensions fidèles au millimètre près pour s\'accorder avec les meeples en bois originaux.',
        downloadsCount: 48900,
        rating: 5.0,
        tags: ['Meeple iconique', 'Fidèle origine', 'Tous coloris'],
        metadata3d: {
          dimensions: '16 x 16 x 10 mm',
          estimatedPrintTime: '13 min',
          filamentWeight: '2.1 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA ou Woodfill',
          infill: '25%',
          layerHeight: '0.16 mm',
          modelId: 'meeple',
          defaultColor: '#f59e0b'
        }
      },
      {
        id: 'carcassonne-dice-piece',
        name: 'Dé de comptage & Marqueur 50/100',
        subtitle: 'Accessoire de score spécial Carcassonne',
        type: '3d',
        description: 'Dé à faces gravées pour indiquer les tours de piste supplémentaires (50 ou 100 points).',
        downloadsCount: 5600,
        rating: 4.8,
        tags: ['Accessoire', 'Score'],
        metadata3d: {
          dimensions: '16 x 16 x 16 mm',
          estimatedPrintTime: '14 min',
          filamentWeight: '3.1 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA',
          infill: '20%',
          layerHeight: '0.16 mm',
          modelId: 'dice-d6',
          defaultColor: '#e11d48'
        }
      },
      {
        id: 'carcassonne-scoreboard-pdf',
        name: 'Piste de Marque des Scores (0 à 50)',
        subtitle: 'Grand format haute résolution avec illustrations cathares',
        type: 'pdf',
        description: 'La piste de décompte des points pour y faire avancer vos meeples. Idéale à imprimer sur du carton ou à plastifier.',
        downloadsCount: 17800,
        rating: 4.9,
        tags: ['Piste de score', 'A4', 'Prêt à plastifier'],
        metadataPdf: {
          pageCount: 2,
          format: 'A4',
          printSide: 'Recto seul',
          recommendedPaper: 'Papier cartonné 250g',
          colorMode: 'Couleur recommandée',
          documentType: 'scoresheet'
        }
      },
      {
        id: 'carcassonne-rules-pdf',
        name: 'Guide Officiel des Règles & Décompte des Paysans',
        subtitle: 'Explications claires avec schémas de pose',
        type: 'pdf',
        description: 'Les règles complètes et l\'explication sans ambiguïté des prés et des champs pour clore tous les débats de fin de partie.',
        downloadsCount: 24300,
        rating: 4.9,
        tags: ['Règles officielles', 'Schémas illustrés'],
        metadataPdf: {
          pageCount: 8,
          format: 'A4',
          printSide: 'Recto-verso',
          recommendedPaper: 'Papier standard 80g',
          colorMode: 'Couleur recommandée',
          documentType: 'rules'
        }
      }
    ]
  },
  {
    id: 'puissance4',
    name: 'Puissance 4 (Connect 4)',
    subtitle: 'Le duel vertical d\'alignement à 4 jetons',
    publisher: 'Hasbro / MB Jeux',
    year: 1974,
    category: 'Classique',
    players: '2 joueurs',
    playtime: '10 - 15 min',
    minAge: '6 ans +',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    bannerColor: 'from-blue-600 to-sky-900',
    description: 'Le premier joueur qui aligne 4 jetons de sa couleur gagne la manche. Un seul jeton égaré rend la partie impossible.',
    totalSavedGames: 16700,
    pieces: [
      {
        id: 'puissance4-disc-piece',
        name: 'Jeton Puissance 4 à Rainures',
        subtitle: 'Diamètre officiel 32 mm, épaisseur 4.5 mm',
        type: '3d',
        description: 'Le jeton original avec cercles concentriques et dépression centrale pour une prise en main parfaite et une glisse sans frottement.',
        downloadsCount: 52400,
        rating: 5.0,
        tags: ['Jeton', 'Fidélité 100%', 'Impression par lot'],
        metadata3d: {
          dimensions: '32 x 32 x 4.5 mm',
          estimatedPrintTime: '9 min',
          filamentWeight: '2.8 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Rouge ou Jaune solaire',
          infill: '20%',
          layerHeight: '0.20 mm',
          modelId: 'connect4-disc',
          defaultColor: '#eab308'
        }
      },
      {
        id: 'puissance4-rules-pdf',
        name: 'Règles du Jeu & Grille de Tournoi',
        subtitle: 'Règles officielles et tableau de notation des manches',
        type: 'pdf',
        description: 'Feuille de tournoi avec fiches de match en 3 manches gagnantes et variantes chronométrées.',
        downloadsCount: 8900,
        rating: 4.7,
        tags: ['Feuille de score', 'Règles'],
        metadataPdf: {
          pageCount: 2,
          format: 'A4',
          printSide: 'Recto seul',
          recommendedPaper: 'Papier standard 80g',
          colorMode: 'Couleur recommandée',
          documentType: 'scoresheet'
        }
      }
    ]
  },
  {
    id: 'ticket-to-ride',
    name: 'Les Aventuriers du Rail',
    subtitle: 'Ticket to Ride - Embarquez pour un voyage ferroviaire',
    publisher: 'Days of Wonder',
    year: 2004,
    category: 'Stratégie',
    players: '2 - 5 joueurs',
    playtime: '45 - 75 min',
    minAge: '8 ans +',
    coverImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
    bannerColor: 'from-amber-800 to-rose-950',
    description: 'Prenez le contrôle des voies ferrées à travers l\'Amérique ou l\'Europe. Chaque joueur dispose de 45 wagons dans sa réserve personnelle.',
    totalSavedGames: 11300,
    pieces: [
      {
        id: 'ttr-train-piece',
        name: 'Wagon de Train Miniature',
        subtitle: 'Wagon voyageur avec roues et rainures de toit',
        type: '3d',
        description: 'Le wagon de chemin de fer officiel pour remplacer les wagons égarés d\'un set de couleur (Rouge, Bleu, Vert, Jaune ou Noir).',
        downloadsCount: 31800,
        rating: 4.9,
        tags: ['Wagon miniature', 'Détails fins', 'Parfaitement calibré'],
        metadata3d: {
          dimensions: '24 x 8 x 10 mm',
          estimatedPrintTime: '12 min',
          filamentWeight: '1.9 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA haute précision',
          infill: '20%',
          layerHeight: '0.12 mm',
          modelId: 'ttr-train',
          defaultColor: '#3b82f6'
        }
      },
      {
        id: 'ttr-scorepad-pdf',
        name: 'Feuille de Calcul des Scores Finaux',
        subtitle: 'Grille d\'évaluation détaillée par joueur',
        type: 'pdf',
        description: 'Grille optimisée pour calculer rapidement les points de tronçons, de gares, les billets réussis ou échoués, et le grand prix Transcontinental.',
        downloadsCount: 19400,
        rating: 4.9,
        tags: ['Feuille de score', 'Calcul rapide', 'Format A5 x 2'],
        metadataPdf: {
          pageCount: 2,
          format: 'A4',
          printSide: 'Recto seul',
          recommendedPaper: 'Papier standard 80g',
          colorMode: 'Couleur recommandée',
          documentType: 'scoresheet'
        }
      },
      {
        id: 'ttr-rules-pdf',
        name: 'Livret des Règles Intégrales USA / Europe',
        subtitle: 'Guide complet avec cartes des liaisons et gares',
        type: 'pdf',
        description: 'Le règlement complet avec l\'explication des tunnels, ferries et droits de passage ferroviaires.',
        downloadsCount: 14200,
        rating: 4.8,
        tags: ['Règles officielles', 'A4'],
        metadataPdf: {
          pageCount: 10,
          format: 'A4',
          printSide: 'Recto-verso',
          recommendedPaper: 'Papier standard 80g',
          colorMode: 'Couleur recommandée',
          documentType: 'rules'
        }
      }
    ]
  },
  {
    id: 'cluedo',
    name: 'Cluedo',
    subtitle: 'Le grand jeu des détectives et de déduction criminelle',
    publisher: 'Hasbro',
    year: 1949,
    category: 'Enquête & Déduction',
    players: '2 - 6 joueurs',
    playtime: '45 - 60 min',
    minAge: '8 ans +',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    bannerColor: 'from-violet-900 to-zinc-950',
    description: 'Résolvez le mystère du manoir Tudor : qui a commis le crime, avec quelle arme et dans quelle pièce du manoir ?',
    totalSavedGames: 22400,
    pieces: [
      {
        id: 'cluedo-candlestick-piece',
        name: 'Arme du crime : Le Chandelier',
        subtitle: 'Candelabre à trois branches miniature',
        type: '3d',
        description: 'L\'une des armes les plus célèbres de Cluedo. Réplique élégante pour remplacer le pion métallique perdu.',
        downloadsCount: 14700,
        rating: 4.8,
        tags: ['Arme du crime', 'Accessoire culte'],
        metadata3d: {
          dimensions: '14 x 14 x 24 mm',
          estimatedPrintTime: '16 min',
          filamentWeight: '2.5 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Soie Or ou Cuivre',
          infill: '25%',
          layerHeight: '0.12 mm',
          modelId: 'cluedo-candlestick',
          defaultColor: '#eab308'
        }
      },
      {
        id: 'cluedo-detective-notes-pdf',
        name: 'Carnet de Détective & Feuilles d\'Enquête Illimitées',
        subtitle: 'Pack de 4 grilles par page A4 haute définition',
        type: 'pdf',
        description: 'La recharge indispensable quand le carnet d\'origine est vide ! Permet de cocher suspects, armes et pièces en toute discrétion.',
        downloadsCount: 68000,
        rating: 5.0,
        tags: ['Carnet d\'enquête', 'Incontournable', 'Economique'],
        metadataPdf: {
          pageCount: 3,
          format: 'A4',
          printSide: 'Recto-verso',
          recommendedPaper: 'Papier standard 80g',
          colorMode: 'Noir & Blanc optimisé',
          documentType: 'scoresheet'
        }
      },
      {
        id: 'cluedo-rules-pdf',
        name: 'Livret des Règles & Hypothèses Officielles',
        subtitle: 'Protocole d\'accusation et règles des passages secrets',
        type: 'pdf',
        description: 'Règles officielles détaillées pour mener l\'enquête selon les standards.',
        downloadsCount: 16100,
        rating: 4.8,
        tags: ['Règles officielles'],
        metadataPdf: {
          pageCount: 6,
          format: 'A4',
          printSide: 'Recto-verso',
          recommendedPaper: 'Papier standard 80g',
          colorMode: 'Couleur recommandée',
          documentType: 'rules'
        }
      }
    ]
  },
  {
    id: 'scrabble',
    name: 'Scrabble Classique',
    subtitle: 'Le jeu de lettres le plus populaire au monde',
    publisher: 'Mattel / Spear',
    year: 1948,
    category: 'Lettres & Mots',
    players: '2 - 4 joueurs',
    playtime: '60 - 90 min',
    minAge: '10 ans +',
    coverImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
    bannerColor: 'from-amber-700 to-stone-900',
    description: 'Composez des mots croisés sur le plateau pour franchir les cases mot compte double et mot compte triple.',
    totalSavedGames: 18200,
    pieces: [
      {
        id: 'scrabble-rack-piece',
        name: 'Chevalet de Scrabble (Support 7 lettres)',
        subtitle: 'Profil ergonomique incliné 18 cm',
        type: '3d',
        description: 'Chevalet de remplacement avec rainure de retenue pour maintenir vos 7 lettres cachées de vos adversaires.',
        downloadsCount: 19200,
        rating: 4.9,
        tags: ['Chevalet', 'Robuste', 'Ergonomique'],
        metadata3d: {
          dimensions: '180 x 22 x 18 mm',
          estimatedPrintTime: '55 min',
          filamentWeight: '22 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Bois ou Noir mat',
          infill: '15%',
          layerHeight: '0.20 mm',
          modelId: 'scrabble-rack',
          defaultColor: '#78350f'
        }
      },
      {
        id: 'scrabble-tile-piece',
        name: 'Tuile Lettre Scrabble (19 x 19 mm)',
        subtitle: 'Jeton carré biseauté avec lettre et valeur',
        type: '3d',
        description: 'Tuile standard remplaçant une lettre perdue ou un joker égaré. Lettrage gravé en creux pour remplissage acrylique.',
        downloadsCount: 27400,
        rating: 4.8,
        tags: ['Lettre individuelle', 'Rapide'],
        metadata3d: {
          dimensions: '19 x 19 x 4.2 mm',
          estimatedPrintTime: '9 min',
          filamentWeight: '1.6 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Ivoire ou Bois clair',
          infill: '30%',
          layerHeight: '0.16 mm',
          modelId: 'scrabble-tile',
          defaultColor: '#fef3c7'
        }
      },
      {
        id: 'scrabble-scorepad-pdf',
        name: 'Feuille de Marque Scrabble & Mots de 2 Lettres',
        subtitle: 'Grille de calcul avec l\'indispensable mémo des mots courts ODS',
        type: 'pdf',
        description: 'Le tableau officiel de calcul de scores avec le mémo officiel de tous les mots de 2 et 3 lettres valides au Scrabble francophone.',
        downloadsCount: 45600,
        rating: 5.0,
        tags: ['Feuille de marque', 'Aide de jeu', 'ODS officiel'],
        metadataPdf: {
          pageCount: 2,
          format: 'A4',
          printSide: 'Recto-verso',
          recommendedPaper: 'Papier standard 80g',
          colorMode: 'Noir & Blanc optimisé',
          documentType: 'scoresheet'
        }
      }
    ]
  },
  {
    id: 'echecs',
    name: 'Jeu d\'Échecs (Chess)',
    subtitle: 'Le classique universel de stratégie royale',
    publisher: 'Domaine Public / Staunton',
    year: 1475,
    category: 'Classique',
    players: '2 joueurs',
    playtime: '15 - 90 min',
    minAge: '6 ans +',
    coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80',
    bannerColor: 'from-zinc-700 to-neutral-950',
    description: 'Échec et Mat ! Ne laissez pas un jeu de prestige incomplet à cause d\'un seul pion ou d\'une tour égarée.',
    totalSavedGames: 31500,
    pieces: [
      {
        id: 'chess-pawn-piece',
        name: 'Pion Staunton N°5 (45 mm)',
        subtitle: 'Pion traditionnel avec collerette et sphère',
        type: '3d',
        description: 'Modèle Staunton équilibré, compatible avec les jeux d\'échecs de taille réglementaire 4 et 5.',
        downloadsCount: 38200,
        rating: 4.9,
        tags: ['Pion Staunton', 'Universel', 'Élégant'],
        metadata3d: {
          dimensions: '22 x 22 x 45 mm',
          estimatedPrintTime: '24 min',
          filamentWeight: '5.2 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA Blanc nacré ou Noir ébène',
          infill: '25%',
          layerHeight: '0.12 mm',
          modelId: 'chess-pawn',
          defaultColor: '#f8fafc'
        }
      },
      {
        id: 'chess-rook-piece',
        name: 'Tour Crénelée Staunton (50 mm)',
        subtitle: 'Tour avec 4 créneaux biseautés',
        type: '3d',
        description: 'La tour de défense avec créneaux nets pour remplacer la pièce maîtresse manquante.',
        downloadsCount: 24100,
        rating: 4.9,
        tags: ['Tour', 'Staunton'],
        metadata3d: {
          dimensions: '24 x 24 x 50 mm',
          estimatedPrintTime: '32 min',
          filamentWeight: '7.1 g',
          supportsNeeded: false,
          recommendedMaterial: 'PLA',
          infill: '20%',
          layerHeight: '0.12 mm',
          modelId: 'chess-rook',
          defaultColor: '#18181b'
        }
      },
      {
        id: 'chess-board-print-pdf',
        name: 'Échiquier de Poche 64 Cases & Coordonnées A-H',
        subtitle: 'Plateau A4 haute définition avec repères de pliage',
        type: 'pdf',
        description: 'Échiquier de secours ou de voyage, prêt à coller sur un support rigide avec coordonnées algébriques.',
        downloadsCount: 21000,
        rating: 4.9,
        tags: ['Plateau de jeu', 'A4', 'Prêt à plastifier'],
        metadataPdf: {
          pageCount: 1,
          format: 'A4',
          printSide: 'Recto seul',
          recommendedPaper: 'Papier photo ou cartonné 250g',
          colorMode: 'Noir & Blanc optimisé',
          documentType: 'aid'
        }
      },
      {
        id: 'chess-scoresheet-pdf',
        name: 'Feuille de Notation de Partie (60 coups FIDE)',
        subtitle: 'Feuille officielle de tournoi pour 2 joueurs',
        type: 'pdf',
        description: 'Fiche standard pour enregistrer les coups joués, pendule, date, ronde et résultat final.',
        downloadsCount: 18500,
        rating: 4.8,
        tags: ['Feuille de notation', 'FIDE standard'],
        metadataPdf: {
          pageCount: 2,
          format: 'A4',
          printSide: 'Recto-verso',
          recommendedPaper: 'Papier standard 80g',
          colorMode: 'Noir & Blanc optimisé',
          documentType: 'scoresheet'
        }
      }
    ]
  }
];
