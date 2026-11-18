import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import type { Game, MissingPiece } from '../types/game';

/**
 * Generates and downloads a rich, printable PDF document for a specific game piece/document.
 */
export function generateGamePdf(
  game: Game,
  piece: MissingPiece,
  onSuccess?: () => void
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // --- HEADER BANNER ---
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 36, 'F');

  // Accent line
  doc.setFillColor(245, 158, 11); // amber-500
  doc.rect(0, 35, pageWidth, 1.5, 'F');

  // Brand tag
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('GAMEREVIVE — SAUVEGARDE & RESTAURATION DE JEUX', margin, 12);

  // Game Title & Piece Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(`${game.name} — ${piece.name}`, margin, 21);

  // Metadata subtext
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    `Éditeur: ${game.publisher}  •  Année: ${game.year}  •  Format: A4 Haute Définition  •  Prêt à imprimer`,
    margin,
    28
  );

  // Calibration box (to verify print scale 100%)
  const calibX = pageWidth - margin - 35;
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.4);
  doc.rect(calibX, 6, 35, 22);
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('TEST ÉCHELLE 100%', calibX + 4, 11);
  doc.setTextColor(226, 232, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('Ce carré mesure 35x22mm', calibX + 4, 16);
  doc.text('Imprimez à 100% (sans marge)', calibX + 4, 21);

  let cursorY = 46;

  // --- DOCUMENT BODY BASED ON TYPE ---
  const docType = piece.metadataPdf?.documentType || 'rules';

  if (docType === 'scoresheet') {
    // Score Sheet layout
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('GRILLE DE SCORES ET DÉCOMPTE OFFICIEL', margin, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Feuille réutilisable pour noter les points de vos parties.', margin, cursorY);
    cursorY += 8;

    // Game information box
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, cursorY, contentWidth, 14, 2, 2, 'F');
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(8.5);
    doc.text(`Date de la partie : ___________________`, margin + 6, cursorY + 9);
    doc.text(`Lieu / Événement : ___________________`, margin + 80, cursorY + 9);
    doc.text(`Vainqueur : ___________________`, margin + 140, cursorY + 9);
    cursorY += 20;

    // Draw Score Table
    const tableTop = cursorY;
    const colWidth = (contentWidth - 45) / 5;
    const rowHeight = 9.5;

    // Table Header
    doc.setFillColor(30, 41, 59);
    doc.rect(margin, tableTop, contentWidth, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('Critères de points', margin + 4, tableTop + 6.5);

    for (let p = 0; p < 5; p++) {
      doc.text(`Joueur ${p + 1}`, margin + 48 + p * colWidth, tableTop + 6.5);
    }

    const rowLabels = [
      'Nom du Joueur / Couleur',
      'Points Manche 1 / Territoires',
      'Points Manche 2 / Bâtiments',
      'Cartes bonus & Développements',
      'Objectifs secrets réussis',
      'Bonus de fin de manche',
      'Pénalités éventuelles',
      'Ressources restantes',
      'Manche de départage',
      'Sous-total intermédiaire',
      'Bonus exceptionnel',
      'SCORE FINAL TOTAL',
    ];

    let currentY = tableTop + 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    rowLabels.forEach((label, idx) => {
      const isTotal = idx === rowLabels.length - 1;
      if (isTotal) {
        doc.setFillColor(254, 243, 199); // Amber-100
        doc.rect(margin, currentY, contentWidth, rowHeight, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(180, 83, 9);
      } else if (idx % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, currentY, contentWidth, rowHeight, 'F');
        doc.setTextColor(51, 65, 85);
      } else {
        doc.setTextColor(51, 65, 85);
      }

      // Draw horizontal divider
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.2);
      doc.line(margin, currentY + rowHeight, margin + contentWidth, currentY + rowHeight);

      doc.text(label, margin + 4, currentY + 6);

      // Vertical dividers
      doc.line(margin + 45, currentY, margin + 45, currentY + rowHeight);
      for (let p = 0; p < 5; p++) {
        doc.line(margin + 45 + (p + 1) * colWidth, currentY, margin + 45 + (p + 1) * colWidth, currentY + rowHeight);
      }

      currentY += rowHeight;
    });

    // Notes Box
    currentY += 10;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, currentY, contentWidth, 40, 2, 2, 'FD');
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('Notes d\'arbitrage & Remarques de jeu :', margin + 6, currentY + 8);

    doc.setDrawColor(226, 232, 240);
    for (let l = 1; l <= 3; l++) {
      doc.line(margin + 6, currentY + 8 + l * 8, margin + contentWidth - 6, currentY + 8 + l * 8);
    }
  } else if (docType === 'cards') {
    // Printable Cards & Cutouts
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('PLANCHE DE CARTES & ÉLÉMENTS À DÉCOUPER', margin, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Découpez le long des pointillés avec un cutter et une règle en métal. Papier épais conseillé.', margin, cursorY);
    cursorY += 10;

    // Draw 6 cards in a 2x3 grid
    const cardW = (contentWidth - 10) / 2;
    const cardH = 58;

    const cardsData = [
      { title: 'CHANCE - PRIX IMMOBILIER', text: 'La banque vous verse des dividendes de 50€. Conservez cette carte.' },
      { title: 'CHANCE - VOYAGE EXPRESS', text: 'Avancez jusqu\'à la prochaine gare. Si elle est libre, vous pouvez l\'acheter.' },
      { title: 'CAISSE - ERREUR BANCAIRE', text: 'Erreur de la banque en votre faveur. Recevez 200€ immédiatement.' },
      { title: 'CAISSE - LIBÉRÉ DE PRISON', text: 'Cette carte peut être conservée jusqu\'à utilisation ou vendue.' },
      { title: 'OPPORTUNITÉ - TRAVAUX', text: 'Faites des réparations dans tous vos bâtiments : payez 25€ par maison.' },
      { title: 'BILLET DE DESTINATION', text: 'Reliez les deux capitales pour marquer 12 points de victoire supplémentaires.' },
    ];

    cardsData.forEach((card, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const cardX = margin + col * (cardW + 10);
      const cardY = cursorY + row * (cardH + 8);

      // Dashed cutting border
      doc.setLineDashPattern([2, 2], 0);
      doc.setDrawColor(148, 163, 184);
      doc.rect(cardX, cardY, cardW, cardH);

      // Card inner card
      doc.setLineDashPattern([], 0);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(cardX + 2, cardY + 2, cardW - 4, cardH - 4, 3, 3, 'F');

      // Card header
      doc.setFillColor(30, 41, 59);
      doc.roundedRect(cardX + 2, cardY + 2, cardW - 4, 12, 3, 3, 'F');
      doc.setTextColor(245, 158, 11);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(card.title, cardX + 6, cardY + 9);

      // Card text
      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const splitText = doc.splitTextToSize(card.text, cardW - 12);
      doc.text(splitText, cardX + 6, cardY + 22);

      // Small game signature
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(6.5);
      doc.text(`GameRevive Print & Play  •  ${game.name}`, cardX + 6, cardY + cardH - 6);
    });
  } else {
    // Official Rules & Guide layout
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('LIVRET DE RÈGLES & GUIDE DE JEU COMPLET', margin, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`${game.subtitle}  —  Version officielle restaurée`, margin, cursorY);
    cursorY += 12;

    const sections = [
      {
        title: '1. BUT DU JEU ET CONDITIONS DE VICTOIRE',
        content: `Dans ${game.name}, les participants s'affrontent pour atteindre l'objectif suprême fixé par les règles. La partie prend fin immédiatement dès qu'un joueur atteint le score requis ou remplit les conditions de victoire déterminées. Tous les joueurs terminent le tour en cours si précisé dans les règles spécifiques.`,
      },
      {
        title: '2. MATÉRIEL OFFICIEL ET MISE EN PLACE',
        content: `Vérifiez le contenu complet de votre boîte. Si une pièce est manquante, vous pouvez l'imprimer en 3D ou en format cartonné depuis GameRevive. Disposez le plateau central, mélangez les paquets de cartes respectifs et placez chaque joueur avec sa couleur choisie. Le plus jeune joueur commence ou le premier déterminé par un jet de dé.`,
      },
      {
        title: '3. DÉROULEMENT D\'UN TOUR DE JEU TYPE',
        content: `À son tour, le joueur actif réalise successivement les phases suivantes :
• Phase A : Tirage d'événement, récolte des ressources ou lancement des dés.
• Phase B : Actions principales (achats, constructions, déplacements ou négociations avec les autres joueurs).
• Phase C : Fin de tour et passage des dés ou de la main au joueur situé à sa gauche dans le sens horaire.`,
      },
      {
        title: '4. RÈGLES SPÉCIALES & CONSEILS D\'ARBITRAGE',
        content: `En cas de litige ou de situation non couverte :
- Les négociations entre joueurs sont toujours libres mais les promesses de tours futurs ne sont pas contractuelles.
- En cas d'égalité sur le score final, le joueur ayant conservé le plus de matériel ou ayant réalisé l'objectif en premier est déclaré vainqueur.
- Toutes les règles de variantes rapides officielles peuvent être appliquées d'un commun accord avant le début de la partie.`,
      },
    ];

    sections.forEach((sec) => {
      // Section header
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, cursorY, contentWidth, 7, 'F');
      doc.setFillColor(245, 158, 11);
      doc.rect(margin, cursorY, 2.5, 7, 'F');

      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(sec.title, margin + 6, cursorY + 5);
      cursorY += 10;

      // Section body
      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const splitContent = doc.splitTextToSize(sec.content, contentWidth - 4);
      doc.text(splitContent, margin + 4, cursorY);
      cursorY += splitContent.length * 4.6 + 6;
    });
  }

  // --- FOOTER ---
  const footerY = pageHeight - 14;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'GameRevive Open Initiative  •  Modèle gratuit pour usage personnel  •  Ne jetez plus vos jeux, restaurez-les !',
    margin,
    footerY
  );
  doc.text('Page 1 / 1  •  gamerevive.local', pageWidth - margin - 38, footerY);

  // Trigger file download
  const safeName = `${game.name}_${piece.name}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/_+/g, '_');

  doc.save(`${safeName}.pdf`);

  // Confetti celebration
  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: 0.6 },
    colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
  });

  if (onSuccess) onSuccess();
}
