import * as THREE from 'three';

/**
 * Creates a distinct procedural 3D Mesh / Group for each game piece modelId.
 */
export function createPieceMesh(modelId: string, color: string, wireframe = false): THREE.Object3D {
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.35,
    metalness: 0.15,
    wireframe: wireframe,
  });

  const group = new THREE.Group();

  switch (modelId) {
    case 'meeple': {
      // Classic Carcassonne Meeple outline
      const shape = new THREE.Shape();
      // Start at bottom left foot
      shape.moveTo(-6, -8);
      shape.lineTo(-2, -8);
      // Crotch
      shape.lineTo(0, -3);
      // Right foot
      shape.lineTo(2, -8);
      shape.lineTo(6, -8);
      // Right leg to waist
      shape.lineTo(5, -1);
      // Right arm bottom
      shape.lineTo(9, 1);
      // Right hand
      shape.lineTo(8, 4);
      // Right arm top
      shape.lineTo(3.5, 3.5);
      // Right shoulder / neck
      shape.lineTo(2.5, 4.5);
      // Head
      shape.lineTo(2.5, 8);
      shape.lineTo(-2.5, 8);
      // Left neck / shoulder
      shape.lineTo(-2.5, 4.5);
      // Left arm top
      shape.lineTo(-3.5, 3.5);
      // Left hand
      shape.lineTo(-8, 4);
      // Left arm bottom
      shape.lineTo(-9, 1);
      // Left waist
      shape.lineTo(-5, -1);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: 4,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: 0,
        bevelSegments: 3,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      break;
    }

    case 'catan-settlement': {
      // Small village house with pitched roof
      const baseGeo = new THREE.BoxGeometry(8, 6, 8);
      const base = new THREE.Mesh(baseGeo, material);
      base.position.y = 3;

      // Roof: cylinder with 3 segments = triangular prism
      const roofGeo = new THREE.CylinderGeometry(5.8, 5.8, 8.2, 3);
      const roof = new THREE.Mesh(roofGeo, material);
      roof.rotation.z = Math.PI / 2;
      roof.rotation.x = -Math.PI / 6;
      roof.position.y = 8;

      // Chimney
      const chimneyGeo = new THREE.CylinderGeometry(0.8, 0.8, 3, 8);
      const chimney = new THREE.Mesh(chimneyGeo, material);
      chimney.position.set(2, 9, 1.5);

      group.add(base, roof, chimney);
      break;
    }

    case 'catan-city': {
      // Major city with castle tower and fortified wall
      const wallGeo = new THREE.BoxGeometry(12, 7, 7);
      const wall = new THREE.Mesh(wallGeo, material);
      wall.position.set(0, 3.5, 0);

      // Tower
      const towerGeo = new THREE.CylinderGeometry(3.5, 4, 13, 8);
      const tower = new THREE.Mesh(towerGeo, material);
      tower.position.set(4, 6.5, 0);

      // Tower cone roof
      const coneGeo = new THREE.ConeGeometry(4.2, 5, 8);
      const cone = new THREE.Mesh(coneGeo, material);
      cone.position.set(4, 15, 0);

      // Wall roof (slanted)
      const roofGeo = new THREE.CylinderGeometry(4.2, 4.2, 8, 3);
      const roof = new THREE.Mesh(roofGeo, material);
      roof.rotation.z = Math.PI / 2;
      roof.position.set(-2, 8.5, 0);

      group.add(wall, tower, cone, roof);
      break;
    }

    case 'catan-road': {
      const roadGeo = new THREE.BoxGeometry(20, 3.5, 3.5);
      const road = new THREE.Mesh(roadGeo, material);
      road.position.y = 1.75;
      group.add(road);
      break;
    }

    case 'catan-robber': {
      // Robber figurine
      const baseGeo = new THREE.CylinderGeometry(4, 4.5, 4, 16);
      const base = new THREE.Mesh(baseGeo, material);
      base.position.y = 2;

      const bodyGeo = new THREE.CylinderGeometry(2.5, 4, 12, 16);
      const body = new THREE.Mesh(bodyGeo, material);
      body.position.y = 9;

      const cloakGeo = new THREE.ConeGeometry(4, 8, 16);
      const cloak = new THREE.Mesh(cloakGeo, material);
      cloak.position.y = 14;

      const headGeo = new THREE.SphereGeometry(3, 16, 16);
      const head = new THREE.Mesh(headGeo, material);
      head.position.y = 18;

      group.add(base, body, cloak, head);
      break;
    }

    case 'monopoly-house': {
      const baseGeo = new THREE.BoxGeometry(7, 5, 6);
      const base = new THREE.Mesh(baseGeo, material);
      base.position.y = 2.5;

      const roofGeo = new THREE.CylinderGeometry(4.5, 4.5, 7.2, 3);
      const roof = new THREE.Mesh(roofGeo, material);
      roof.rotation.z = Math.PI / 2;
      roof.position.y = 6.5;

      const chimneyGeo = new THREE.BoxGeometry(1.2, 2.5, 1.2);
      const chimney = new THREE.Mesh(chimneyGeo, material);
      chimney.position.set(1.5, 7.5, 0.8);

      group.add(base, roof, chimney);
      break;
    }

    case 'monopoly-hotel': {
      const baseGeo = new THREE.BoxGeometry(13, 8, 8);
      const base = new THREE.Mesh(baseGeo, material);
      base.position.y = 4;

      const roofGeo = new THREE.CylinderGeometry(6, 6, 13.2, 3);
      const roof = new THREE.Mesh(roofGeo, material);
      roof.rotation.z = Math.PI / 2;
      roof.position.y = 10;

      const chimney1 = new THREE.BoxGeometry(1.5, 3, 1.5);
      const ch1 = new THREE.Mesh(chimney1, material);
      ch1.position.set(4, 11, 1.2);

      const chimney2 = new THREE.BoxGeometry(1.5, 3, 1.5);
      const ch2 = new THREE.Mesh(chimney2, material);
      ch2.position.set(-4, 11, -1.2);

      group.add(base, roof, ch1, ch2);
      break;
    }

    case 'monopoly-hat': {
      // Top hat token
      const brimGeo = new THREE.CylinderGeometry(9, 9, 1.2, 24);
      const brim = new THREE.Mesh(brimGeo, material);
      brim.position.y = 0.6;

      const hatGeo = new THREE.CylinderGeometry(6, 5.5, 11, 24);
      const hat = new THREE.Mesh(hatGeo, material);
      hat.position.y = 6.5;

      const ribbonGeo = new THREE.CylinderGeometry(5.8, 5.8, 1.5, 24);
      const ribbon = new THREE.Mesh(ribbonGeo, material);
      ribbon.position.y = 2;

      group.add(brim, hat, ribbon);
      break;
    }

    case 'connect4-disc': {
      // Connect 4 slotted chip
      const discGeo = new THREE.CylinderGeometry(10, 10, 2.5, 32);
      const disc = new THREE.Mesh(discGeo, material);

      const ringGeo = new THREE.TorusGeometry(6, 0.8, 12, 32);
      const ring1 = new THREE.Mesh(ringGeo, material);
      ring1.rotation.x = Math.PI / 2;
      ring1.position.y = 1.25;

      const ring2 = new THREE.Mesh(ringGeo, material);
      ring2.rotation.x = Math.PI / 2;
      ring2.position.y = -1.25;

      const centerHoleGeo = new THREE.CylinderGeometry(3, 3, 3, 16);
      const centerHole = new THREE.Mesh(centerHoleGeo, material);

      group.add(disc, ring1, ring2, centerHole);
      group.rotation.x = Math.PI / 2;
      group.position.y = 10;
      break;
    }

    case 'ttr-train': {
      // Ticket to ride carriage
      const bodyGeo = new THREE.BoxGeometry(16, 6, 6.5);
      const body = new THREE.Mesh(bodyGeo, material);
      body.position.y = 5;

      const roofGeo = new THREE.CylinderGeometry(3.6, 3.6, 16.2, 16, 1, false, 0, Math.PI);
      const roof = new THREE.Mesh(roofGeo, material);
      roof.rotation.z = Math.PI / 2;
      roof.rotation.x = -Math.PI / 2;
      roof.position.y = 8;

      // 4 wheels
      const wheelGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.8, 12);
      const positions = [
        [-5, 1.6, 3.4],
        [5, 1.6, 3.4],
        [-5, 1.6, -3.4],
        [5, 1.6, -3.4],
      ];
      positions.forEach(([x, y, z]) => {
        const wheel = new THREE.Mesh(wheelGeo, material);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(x, y, z);
        group.add(wheel);
      });

      group.add(body, roof);
      break;
    }

    case 'chess-pawn': {
      // Staunton pawn
      const baseGeo = new THREE.CylinderGeometry(7, 8, 2.5, 24);
      const base = new THREE.Mesh(baseGeo, material);
      base.position.y = 1.25;

      const ringGeo = new THREE.TorusGeometry(6, 1, 12, 24);
      const ring = new THREE.Mesh(ringGeo, material);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 2.5;

      const stemGeo = new THREE.CylinderGeometry(3, 5.5, 12, 24);
      const stem = new THREE.Mesh(stemGeo, material);
      stem.position.y = 8;

      const collarGeo = new THREE.CylinderGeometry(4.5, 3.5, 2, 24);
      const collar = new THREE.Mesh(collarGeo, material);
      collar.position.y = 14.5;

      const headGeo = new THREE.SphereGeometry(4.2, 24, 24);
      const head = new THREE.Mesh(headGeo, material);
      head.position.y = 19;

      group.add(base, ring, stem, collar, head);
      break;
    }

    case 'chess-rook': {
      // Staunton rook (castle)
      const baseGeo = new THREE.CylinderGeometry(7.5, 8.5, 3, 24);
      const base = new THREE.Mesh(baseGeo, material);
      base.position.y = 1.5;

      const stemGeo = new THREE.CylinderGeometry(5, 6.5, 14, 24);
      const stem = new THREE.Mesh(stemGeo, material);
      stem.position.y = 9.5;

      const topPlatformGeo = new THREE.CylinderGeometry(7, 5, 3, 24);
      const topPlatform = new THREE.Mesh(topPlatformGeo, material);
      topPlatform.position.y = 17.5;

      // 4 crenellations
      const crenelAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      crenelAngles.forEach((angle) => {
        const cGeo = new THREE.BoxGeometry(2.5, 3.5, 2.5);
        const cMesh = new THREE.Mesh(cGeo, material);
        cMesh.position.set(Math.cos(angle) * 5.2, 20.5, Math.sin(angle) * 5.2);
        group.add(cMesh);
      });

      group.add(base, stem, topPlatform);
      break;
    }

    case 'scrabble-rack': {
      // Scrabble tile rack
      const rackShape = new THREE.Shape();
      rackShape.moveTo(0, 0);
      rackShape.lineTo(14, 0);
      rackShape.lineTo(14, 4);
      rackShape.lineTo(11, 4);
      rackShape.lineTo(11, 1);
      rackShape.lineTo(3, 11);
      rackShape.lineTo(0, 8);
      rackShape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: 60,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.5,
      };

      const rackGeo = new THREE.ExtrudeGeometry(rackShape, extrudeSettings);
      rackGeo.center();
      const rack = new THREE.Mesh(rackGeo, material);
      group.add(rack);
      break;
    }

    case 'scrabble-tile': {
      const tileGeo = new THREE.BoxGeometry(14, 3, 14);
      const tile = new THREE.Mesh(tileGeo, material);
      tile.position.y = 1.5;

      // Relief letter "A"
      const letterBar1 = new THREE.BoxGeometry(1.2, 0.8, 8);
      const l1 = new THREE.Mesh(letterBar1, material);
      l1.position.set(-2, 3.2, 0);
      l1.rotation.y = 0.2;

      const letterBar2 = new THREE.BoxGeometry(1.2, 0.8, 8);
      const l2 = new THREE.Mesh(letterBar2, material);
      l2.position.set(2, 3.2, 0);
      l2.rotation.y = -0.2;

      const letterCross = new THREE.BoxGeometry(4, 0.8, 1.2);
      const l3 = new THREE.Mesh(letterCross, material);
      l3.position.set(0, 3.2, 0);

      // Score index dot
      const dotGeo = new THREE.SphereGeometry(0.8, 8, 8);
      const dot = new THREE.Mesh(dotGeo, material);
      dot.position.set(4.5, 3.2, 4.5);

      group.add(tile, l1, l2, l3, dot);
      break;
    }

    case 'dice-d6': {
      // 6-sided die
      const cubeGeo = new THREE.BoxGeometry(12, 12, 12);
      const cube = new THREE.Mesh(cubeGeo, material);
      cube.position.y = 6;
      group.add(cube);

      // Add pip impressions
      const pipGeo = new THREE.SphereGeometry(1, 8, 8);
      const pipMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });

      // Face 1 (top)
      const pipTop = new THREE.Mesh(pipGeo, pipMat);
      pipTop.position.set(0, 12, 0);
      group.add(pipTop);

      // Face 6 (bottom)
      for (const [x, z] of [
        [-3, -3],
        [-3, 0],
        [-3, 3],
        [3, -3],
        [3, 0],
        [3, 3],
      ]) {
        const p = new THREE.Mesh(pipGeo, pipMat);
        p.position.set(x, 0, z);
        group.add(p);
      }
      break;
    }

    case 'cluedo-candlestick': {
      // Candlestick weapon
      const baseGeo = new THREE.CylinderGeometry(7, 8, 2, 24);
      const base = new THREE.Mesh(baseGeo, material);
      base.position.y = 1;

      const stemGeo = new THREE.CylinderGeometry(1.5, 2.5, 14, 16);
      const stem = new THREE.Mesh(stemGeo, material);
      stem.position.y = 8;

      // Central cup & candle
      const cupGeo = new THREE.CylinderGeometry(3, 1.5, 3, 16);
      const cup = new THREE.Mesh(cupGeo, material);
      cup.position.y = 15.5;

      const candleGeo = new THREE.CylinderGeometry(1.2, 1.2, 6, 12);
      const candle = new THREE.Mesh(candleGeo, material);
      candle.position.y = 19;

      // Two curved arms
      const arm1Geo = new THREE.TorusGeometry(4, 0.8, 8, 16, Math.PI / 1.5);
      const arm1 = new THREE.Mesh(arm1Geo, material);
      arm1.rotation.z = -Math.PI / 4;
      arm1.position.set(3.5, 12, 0);

      const arm2Geo = new THREE.TorusGeometry(4, 0.8, 8, 16, Math.PI / 1.5);
      const arm2 = new THREE.Mesh(arm2Geo, material);
      arm2.rotation.z = Math.PI + Math.PI / 4;
      arm2.position.set(-3.5, 12, 0);

      group.add(base, stem, cup, candle, arm1, arm2);
      break;
    }

    default: {
      const fallbackGeo = new THREE.CylinderGeometry(5, 7, 14, 16);
      const fallback = new THREE.Mesh(fallbackGeo, material);
      fallback.position.y = 7;
      group.add(fallback);
      break;
    }
  }

  // Ensure all children cast & receive shadows
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}
