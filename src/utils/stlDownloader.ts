import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import confetti from 'canvas-confetti';

/**
 * Exports a THREE.Object3D to a real binary STL file and downloads it.
 */
export function downloadStl(
  meshOrGroup: THREE.Object3D,
  fileName: string,
  onSuccess?: () => void
): void {
  try {
    const exporter = new STLExporter();
    // Parse as binary STL for compact and standard slicer compatibility
    const result = exporter.parse(meshOrGroup, { binary: true });

    const blob = new Blob([result], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = fileName
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_')
      .replace(/_+/g, '_');

    link.href = url;
    link.download = `${safeName}.stl`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
    });

    if (onSuccess) onSuccess();
  } catch (error) {
    console.error('Failed to export STL:', error);
    alert('Erreur lors de la génération du fichier STL.');
  }
}
