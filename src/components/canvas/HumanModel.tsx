import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, Center } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useGymStore } from '../../store/useGymStore';
import {
  identifyMuscleGroup,
  isFasciaNode,
  isTendonNode,
  isBursaNode,
} from '../../data/meshDictionary';
import { MUSCLES_DATA } from '../../data/musclesData';
import { MuscleGroupKey } from '../../types/muscle';
import { SkeletonLayer } from './SkeletonLayer';
import { getMuscleTextures } from '../../utils/muscleTexture';

interface HumanModelProps {
  modelUrl?: string;
}

export const HumanModel: React.FC<HumanModelProps> = ({ modelUrl }) => {
  const defaultSource = useGymStore((state) => state.modelSource);
  const targetUrl = modelUrl || defaultSource;

  const { scene } = useGLTF(targetUrl, '/draco/');

  const selectedMuscle = useGymStore((state) => state.selectedMuscle);
  const hoveredMuscle = useGymStore((state) => state.hoveredMuscle);
  const activeSplit = useGymStore((state) => state.activeSplit);
  const viewMode = useGymStore((state) => state.viewMode);
  const showSkeleton = useGymStore((state) => state.showSkeleton);

  const selectMuscle = useGymStore((state) => state.selectMuscle);
  const setHoveredMuscle = useGymStore((state) => state.setHoveredMuscle);

  const meshListRef = useRef<{
    mesh: THREE.Mesh;
    key: MuscleGroupKey | null;
    isTendon: boolean;
  }[]>([]);

  // 取得高擬真肌肉纖維與 Bump 凹凸紋理
  const { diffuseMap, bumpMap } = useMemo(() => getMuscleTextures(), []);

  // 複製並初始化場景節點材質與標籤
  const parsedScene = useMemo(() => {
    const cloned = scene.clone(true);
    const meshes: {
      mesh: THREE.Mesh;
      key: MuscleGroupKey | null;
      isTendon: boolean;
    }[] = [];

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const cleanName = mesh.name.trim();

        // 1. 隱藏遮蔽肌肉的表層筋膜與滑囊 (例如遮蔽腹直肌六塊肌與三角肌的 Investing Fascia)
        if (isFasciaNode(cleanName) || isBursaNode(cleanName)) {
          mesh.visible = false;
          return;
        }

        const isTendon = isTendonNode(cleanName);
        const key = identifyMuscleGroup(cleanName);

        mesh.userData.muscleKey = key;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (isTendon) {
          // 肌腱、腱劃、白線等結締組織：珍珠白微纖維質感
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#e2e8f0',
            roughness: 0.5,
            metalness: 0.08,
            transparent: true,
            opacity: 0.9,
          });
        } else {
          // 肌肉肌腹：套用具備縱向纖維條紋與立體 Bump 凹凸的解剖材質
          mesh.material = new THREE.MeshStandardMaterial({
            map: diffuseMap,
            bumpMap: bumpMap,
            bumpScale: 0.022,
            roughness: 0.42,
            metalness: 0.08,
            transparent: false,
            opacity: 1.0,
          });
        }

        meshes.push({ mesh, key, isTendon });
      }
    });

    meshListRef.current = meshes;
    return cloned;
  }, [scene, diffuseMap, bumpMap]);

  // 當選中、懸停、課表篩選或視覺模式變更時，動態更新材質樣式
  useEffect(() => {
    meshListRef.current.forEach(({ mesh, key, isTendon }) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat) return;

      // 線框模式
      mat.wireframe = viewMode === 'wireframe';

      // 結締組織 / 肌腱 (腱劃、白線等) 的動態樣式
      if (isTendon) {
        if (selectedMuscle !== null) {
          mat.color.set('#cbd5e1');
          mat.opacity = 0.45;
        } else {
          mat.color.set('#f1f5f9');
          mat.opacity = 0.92;
        }
        return;
      }

      // 肌肉肌腹的動態渲染
      if (key) {
        const info = MUSCLES_DATA[key];
        const isMatchSplit = activeSplit === 'all' || (info && info.split === activeSplit);
        const isSelected = selectedMuscle === key;
        const isHovered = hoveredMuscle === key;

        // 始終保留紋理與凹凸條紋
        mat.map = diffuseMap;
        mat.bumpMap = bumpMap;
        mat.bumpScale = 0.022;

        if (isSelected) {
          // 選中狀態：鮮活深紅肌理 + 輪廓微光，完整保留表面肌纖維條紋與腱劃！
          mat.color.set('#f87171');
          mat.emissive.set(info ? info.themeColor : '#f87171');
          mat.emissiveIntensity = 0.25;
          mat.roughness = 0.35;
          mat.metalness = 0.12;
          mat.transparent = false;
          mat.opacity = 1.0;
        } else if (isHovered) {
          // 懸停反饋：高亮提示
          mat.color.set('#fb7185');
          mat.emissive.set(info ? info.themeColor : '#fb7185');
          mat.emissiveIntensity = 0.16;
          mat.roughness = 0.38;
          mat.transparent = false;
          mat.opacity = 1.0;
        } else if (selectedMuscle !== null) {
          // 當其他特定細分部位被選中時：維持解剖肌紋，適度淡出半透明以凸顯選中部位
          mat.color.set('#5c1e1e');
          mat.emissive.set('#000000');
          mat.emissiveIntensity = 0;
          mat.roughness = 0.55;
          mat.metalness = 0.05;
          mat.transparent = true;
          mat.opacity = 0.35;
        } else if (!isMatchSplit) {
          // 不符合當前課表篩選
          mat.color.set('#2d1515');
          mat.emissive.set('#000000');
          mat.emissiveIntensity = 0;
          mat.transparent = true;
          mat.opacity = 0.18;
        } else {
          // 常態：自然解剖肌纖維條紋質感，光澤飽滿
          if (viewMode === 'xray') {
            mat.color.set(info ? info.themeColor : '#882525');
            mat.emissive.set(info ? info.themeColor : '#882525');
            mat.emissiveIntensity = 0.18;
            mat.transparent = true;
            mat.opacity = 0.45;
          } else {
            mat.color.set('#8c2424');
            mat.emissive.set('#1a0505');
            mat.emissiveIntensity = 0.05;
            mat.roughness = 0.42;
            mat.metalness = 0.08;
            mat.transparent = false;
            mat.opacity = 1.0;
          }
        }
      } else {
        // 未匹配或輔助肌群結構
        mat.color.set('#451a1a');
        mat.emissive.set('#000000');
        mat.emissiveIntensity = 0;
        mat.transparent = true;
        mat.opacity = selectedMuscle ? 0.15 : 0.4;
      }
    });
  }, [selectedMuscle, hoveredMuscle, activeSplit, viewMode, diffuseMap, bumpMap]);

  // 指針懸停事件處理
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    const key = mesh.userData?.muscleKey as MuscleGroupKey | undefined;

    if (key) {
      setHoveredMuscle(key);
      document.body.style.cursor = 'pointer';
    }
  };

  // 指針移出事件處理
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredMuscle(null);
    document.body.style.cursor = 'auto';
  };

  // 點擊選中肌群
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    const key = mesh.userData?.muscleKey as MuscleGroupKey | undefined;

    if (key) {
      selectMuscle(key);
    }
  };

  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <Center top={false} bottom={false}>
        <primitive object={parsedScene} />
        <SkeletonLayer visible={showSkeleton} />
      </Center>
    </group>
  );
};

useGLTF.preload('/models/human_muscles.glb', '/draco/');
