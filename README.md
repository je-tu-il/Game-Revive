# 🎲 GameRevive — Sauvegarde & Réparation de Jeux de Société

> **Ne jetez plus vos jeux de société incomplets !**  
> GameRevive est une application web moderne permettant de rechercher n'importe quel jeu, de visualiser et de télécharger directement les **fichiers 3D (.STL)** pour impression 3D et les **documents & livrets de règles (.PDF)** prêts à imprimer à l'échelle 100%.

---

## 🚀 Démarrage Rapide

Le serveur de développement est actuellement lancé :
```bash
# Accéder à l'application dans votre navigateur :
http://localhost:5173/
```

Pour relancer le serveur à tout moment :
```bash
npm run dev
# ou
npx vite --port 5173
```

Pour compiler la version de production :
```bash
npm run build
```

---

## ✨ Fonctionnalités Clés

### 1. 🔍 Recherche Intelligente & Instantanée
- Tapez le nom d'un jeu (ex: *Catan*, *Monopoly*, *Carcassonne*, *Puissance 4*, *Cluedo*, *Scrabble*, *Aventuriers du Rail*, *Échecs*).
- Recherche étendue qui indexe également les **noms de pièces** (ex: taper *"meeple"* ou *"colonie"* propose directement le bon jeu).
- Filtres par catégories (*Stratégie*, *Familial*, *Classique*, *Pose de tuiles*, *Enquête*, *Lettres*).
- Raccourcis de sélection rapide en un clic.

### 2. 🧊 Visualiseur 3D Interactif Temps Réel (Three.js)
- Rendu 3D temps réel avec éclairage dynamique, ombres et plateau d'impression virtuel gradué.
- **Contrôles complets** : rotation libre à la souris, zoom, auto-rotation 360°, recentrage caméra.
- **Mode Maillage (Wireframe)** : visualisez le maillage 3D comme dans un logiciel de slicing (Cura / PrusaSlicer).
- **Nuancier de couleurs** : changez instantanément la couleur du pion pour correspondre à celle de votre joueur (Bleu, Rouge, Vert, Jaune, Bois, Métal...).
- **Fiches techniques d'impression 3D** :
  - Dimensions réelles au millimètre
  - Temps d'impression estimé
  - Consommation de matière en grammes
  - Remplissage recommandé (infill) & hauteur de couche
  - Nécessité de supports (Oui / Non)

### 3. 💾 Téléchargement STL Binaire Réel
- Export automatique via `STLExporter` au format **STL binaire standard**.
- Les fichiers téléchargés sont 100% exploitables et s'ouvrent directement dans **Cura**, **PrusaSlicer**, **Bambu Studio** ou la **Visionneuse 3D Windows**.

### 4. 📄 Générateur & Visualiseur de Documents PDF Vectoriels
- Génération dynamique via `jsPDF` selon le type de document :
  - **Livrets de règles officiels** restaurés avec typographie soignée et mise en page lisible.
  - **Feuilles de score illimitées** avec tableaux, colonnes joueurs, sous-totaux et zones de notes.
  - **Planches de cartes et billets à découper** (Print & Play) avec repères de coupe pointillés.
- **Mire de calibration 100% intégrée** (carré de test pour vérifier que l'imprimante n'a pas réduit l'échelle).
- Téléchargement direct en un clic du fichier `.pdf`.

### 5. 🤝 Module Communautaire "Demander une pièce"
- Permet de soumettre un jeu non répertorié ou une pièce spécifique manquante.

---

## 🛠️ Stack Technique

- **Framework** : React 19 + TypeScript + Vite
- **Styling** : Tailwind CSS v4
- **3D & Rendu** : Three.js + STLExporter + OrbitControls
- **Documents & PDF** : jsPDF
- **Icônes** : Lucide React
- **Animations & FX** : Canvas-confetti
