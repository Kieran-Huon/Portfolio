import * as THREE from 'three';
import { Colors } from './colors.js';

export class Laptop {
  constructor() {
    this.mesh = new THREE.Group();

    // Matériaux
    const matBody = new THREE.MeshStandardMaterial({
      color: Colors.blue,
      roughness: 0.6,
      metalness: 0.3,
      flatShading: true,
    });

    const matScreen = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.1,
      metalness: 0.7,
      flatShading: false,
    });

    const matKeys = new THREE.MeshStandardMaterial({
      color: 0x333333,
      flatShading: true,
    });

    // Base clavier
    const base = new THREE.Mesh(new THREE.BoxGeometry(5, 0.4, 3.5), matBody);
    base.castShadow = true;
    base.receiveShadow = true;
    this.mesh.add(base);

    // Écran
    // const screen = new THREE.Mesh(new THREE.BoxGeometry(5, 3, 0.2), matScreen);
    // screen.position.set(0, 1.7, -1.75);
    // screen.rotation.x = -Math.PI / 4;
    // screen.castShadow = true;
    // this.mesh.add(screen);
    // Écran
    const screen = new THREE.Mesh(new THREE.BoxGeometry(5, 3, 0.2), matScreen);
    screen.rotation.x = -Math.PI / 6; // 📐 inclinaison plus douce (~30°)
    screen.position.set(0, 1.6, -2.5); // 📍 abaissé et avancé pour coller la charnière
    screen.castShadow = true;
    this.mesh.add(screen);


    // Charnière
    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 5, 12), matBody);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0.2, -1.75);
    this.mesh.add(hinge);

    // Touches
    for (let x = -1.8; x <= 1.8; x += 0.4) {
      for (let z = -1.2; z <= 1.2; z += 0.4) {
        const key = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 0.35), matKeys);
        key.position.set(x, 0.25, z);
        key.castShadow = true;
        this.mesh.add(key);
      }
    }

    // 🎯 Échelle et position (à la fin !)
    this.mesh.scale.set(8, 8, 8); // taille réaliste dans ta scène
    this.mesh.position.set(0, 100, 0); // adapte si besoin
  }

  addToScene(scene) {
    scene.add(this.mesh);
  }
}
