import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useGymStore } from '../../store/useGymStore';
import { MUSCLES_DATA } from '../../data/musclesData';

interface CameraControllerProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 0.2, 2.6);
const DEFAULT_TARGET_POS = new THREE.Vector3(0, 0, 0);

export const CameraController: React.FC<CameraControllerProps> = ({ controlsRef }) => {
  const { camera } = useThree();
  const selectedMuscle = useGymStore((state) => state.selectedMuscle);
  const cameraResetSignal = useGymStore((state) => state.cameraResetSignal);

  const targetCameraPos = useRef(DEFAULT_CAMERA_POS.clone());
  const targetControlTarget = useRef(DEFAULT_TARGET_POS.clone());
  const isTransitioning = useRef(false);

  // 當選中肌群變更時，設定相機目標聚焦位置
  useEffect(() => {
    if (selectedMuscle) {
      const info = MUSCLES_DATA[selectedMuscle];
      if (info && info.cameraFocus) {
        targetCameraPos.current.set(...info.cameraFocus.position);
        targetControlTarget.current.set(...info.cameraFocus.target);
        isTransitioning.current = true;
      }
    } else {
      targetCameraPos.current.copy(DEFAULT_CAMERA_POS);
      targetControlTarget.current.copy(DEFAULT_TARGET_POS);
      isTransitioning.current = true;
    }
  }, [selectedMuscle]);

  // 當收到重置信號時，平滑回彈回起始視角
  useEffect(() => {
    if (cameraResetSignal > 0) {
      targetCameraPos.current.copy(DEFAULT_CAMERA_POS);
      targetControlTarget.current.copy(DEFAULT_TARGET_POS);
      isTransitioning.current = true;
    }
  }, [cameraResetSignal]);

  // 每幀平滑 Lerp 插值過渡
  useFrame((_, delta) => {
    if (!isTransitioning.current) return;

    const lerpFactor = Math.min(delta * 3.5, 0.2);

    camera.position.lerp(targetCameraPos.current, lerpFactor);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetControlTarget.current, lerpFactor);
      controlsRef.current.update();
    }

    // 當距離足夠接近時終止插值，釋放讓使用者可自由拖拽旋轉
    const posDist = camera.position.distanceTo(targetCameraPos.current);
    const targetDist = controlsRef.current
      ? controlsRef.current.target.distanceTo(targetControlTarget.current)
      : 0;

    if (posDist < 0.02 && targetDist < 0.02) {
      isTransitioning.current = false;
    }
  });

  return null;
};
