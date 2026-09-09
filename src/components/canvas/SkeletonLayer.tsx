import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

interface SkeletonLayerProps {
  visible: boolean;
}

export const SkeletonLayer: React.FC<SkeletonLayerProps> = ({ visible }) => {
  const { scene } = useGLTF('/models/skeletal_male.glb', '/draco/');

  const skeletonScene = useMemo(() => {
    const cloned = scene.clone(true);
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#94a3b8'),
      roughness: 0.55,
      metalness: 0.1,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = boneMaterial;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });

    return cloned;
  }, [scene]);

  if (!visible) return null;

  return <primitive object={skeletonScene} />;
};

useGLTF.preload('/models/skeletal_male.glb', '/draco/');
