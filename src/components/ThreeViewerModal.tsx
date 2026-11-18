import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  X,
  Download,
  RotateCw,
  Box,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Scale,
  Maximize2,
  Palette
} from 'lucide-react';
import type { Game, MissingPiece } from '../types/game';
import { createPieceMesh } from '../utils/threeGeometryGenerators';
import { downloadStl } from '../utils/stlDownloader';

interface ThreeViewerModalProps {
  game: Game;
  piece: MissingPiece;
  onClose: () => void;
}

const COLOR_PRESETS = [
  { name: 'Rouge Écarlate', hex: '#dc2626' },
  { name: 'Bleu Royal', hex: '#2563eb' },
  { name: 'Vert Forêt', hex: '#16a34a' },
  { name: 'Jaune Soleil', hex: '#eab308' },
  { name: 'Blanc Ivoire', hex: '#f8fafc' },
  { name: 'Noir Carbone', hex: '#18181b' },
  { name: 'Bois Clair', hex: '#b45309' },
  { name: 'Soie Argentée', hex: '#94a3b8' },
];

export const ThreeViewerModal: React.FC<ThreeViewerModalProps> = ({
  game,
  piece,
  onClose,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState(
    piece.metadata3d?.defaultColor || '#dc2626'
  );
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // References for three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const currentMeshRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x090d16);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(30, 26, 36);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.replaceChildren(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.01; // Don't go below ground
    controls.minDistance = 15;
    controls.maxDistance = 120;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(40, 60, 40);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.6); // subtle cyan rim
    dirLight2.position.set(-40, 20, -30);
    scene.add(dirLight2);

    // 6. Ground & 3D Print Bed Grid
    const grid = new THREE.GridHelper(80, 40, 0x38bdf8, 0x1e293b);
    grid.position.y = 0;
    scene.add(grid);
    gridHelperRef.current = grid;

    // Circular bed highlight
    const bedGeo = new THREE.CircleGeometry(40, 32);
    const bedMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.rotation.x = -Math.PI / 2;
    bed.position.y = -0.05;
    scene.add(bed);

    // 7. Piece mesh
    const modelId = piece.metadata3d?.modelId || 'meeple';
    const mesh = createPieceMesh(modelId, currentColor, isWireframe);
    scene.add(mesh);
    currentMeshRef.current = mesh;

    // Focus camera on model bounds
    controls.target.set(0, 6, 0);

    // 8. Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      controls.dispose();
    };
  }, [piece.id]);

  // Update color / wireframe on the fly
  useEffect(() => {
    if (!sceneRef.current || !piece.metadata3d) return;
    const scene = sceneRef.current;

    if (currentMeshRef.current) {
      scene.remove(currentMeshRef.current);
    }

    const modelId = piece.metadata3d.modelId;
    const newMesh = createPieceMesh(modelId, currentColor, isWireframe);
    scene.add(newMesh);
    currentMeshRef.current = newMesh;
  }, [currentColor, isWireframe, piece.metadata3d]);

  // Toggle auto-rotation
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Toggle grid
  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
  }, [showGrid]);

  const handleDownloadStl = () => {
    if (!currentMeshRef.current) return;
    downloadStl(
      currentMeshRef.current,
      `${game.name}_${piece.name}`,
      () => {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    );
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(0, 6, 0);
    }
  };

  const meta = piece.metadata3d;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Box className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100">{piece.name}</h3>
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Modèle 3D STL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {game.name} • Prêt pour Cura, PrusaSlicer, Bambu Studio
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

        {/* MODAL CONTENT */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          {/* 3D VIEWPORT (Left/Center) */}
          <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col">
            <div ref={mountRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

            {/* FLOATING 3D TOOLBAR */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg backdrop-blur-md transition-all ${
                  autoRotate
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
                title="Activer/Désactiver la rotation automatique"
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                360°
              </button>

              <button
                onClick={() => setIsWireframe(!isWireframe)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg backdrop-blur-md transition-all ${
                  isWireframe
                    ? 'bg-sky-500 text-slate-950 font-semibold shadow-lg shadow-sky-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
                title="Afficher le maillage fil de fer"
              >
                <Layers className="w-3.5 h-3.5" />
                Maillage
              </button>

              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg backdrop-blur-md transition-all ${
                  showGrid
                    ? 'bg-slate-700 text-slate-100'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 border border-slate-700/60'
                }`}
                title="Afficher/Masquer le plateau d'impression"
              >
                <Box className="w-3.5 h-3.5" />
                Plateau
              </button>

              <button
                onClick={resetCamera}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60 transition-all"
                title="Recentrer la caméra"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* COLOR PALETTE PRESETS */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  Couleur du joueur :
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.hex}
                    onClick={() => setCurrentColor(p.hex)}
                    style={{ backgroundColor: p.hex }}
                    className={`w-6 h-6 rounded-full transition-all border ${
                      currentColor.toLowerCase() === p.hex.toLowerCase()
                        ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-110 border-white'
                        : 'border-slate-600 hover:scale-105'
                    }`}
                    title={p.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* SLICER & PRINT SPECS (Right) */}
          <div className="lg:col-span-5 p-6 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between bg-slate-900/60">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                  Paramètres d'impression 3D
                </h4>
              </div>

              <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                {piece.description}
              </p>

              {/* SPEC GRID */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Temps estimé</span>
                  </div>
                  <span className="text-base font-bold text-slate-100">
                    {meta?.estimatedPrintTime || '~15 min'}
                  </span>
                </div>

                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>Consommation</span>
                  </div>
                  <span className="text-base font-bold text-slate-100">
                    {meta?.filamentWeight || '~3 g'}
                  </span>
                </div>

                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                  <div className="text-slate-400 text-xs mb-1">Dimensions réelles</div>
                  <span className="text-sm font-semibold text-slate-200">
                    {meta?.dimensions || 'Standard'}
                  </span>
                </div>

                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                  <div className="text-slate-400 text-xs mb-1">Supports requis ?</div>
                  <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {meta?.supportsNeeded ? 'Oui' : 'Non (Sans support)'}
                  </span>
                </div>
              </div>

              {/* SLICER ADVICE */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl mb-6">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Conseils pour votre slicer
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Hauteur de couche : <strong className="text-slate-200">{meta?.layerHeight || '0.16mm'}</strong></li>
                  <li>Remplissage (infill) : <strong className="text-slate-200">{meta?.infill || '20%'}</strong> (Gyroïde)</li>
                  <li>Matière conseillée : <strong className="text-slate-200">{meta?.recommendedMaterial || 'PLA'}</strong></li>
                  <li>Adhérence au plateau : Bordure (Brim) optionnelle</li>
                </ul>
              </div>
            </div>

            {/* DOWNLOAD ACTION */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleDownloadStl}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all transform active:scale-98"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-slate-950" />
                    <span>Fichier STL Téléchargé !</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Télécharger le modèle 3D (.STL)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>Fichier STL binaire universel</span>
                <span>Usage personnel et non-commercial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
