import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGLTF, Center } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useGymStore } from '../../store/useGymStore';
import {
  identifyMuscleGroup,
  isFasciaNode,
  isBursaNode,
} from '../../data/meshDictionary';
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
  const viewMode = useGymStore((state) => state.viewMode);
  const showSkeleton = useGymStore((state) => state.showSkeleton);

  const selectMuscle = useGymStore((state) => state.selectMuscle);
  const setHoveredMuscle = useGymStore((state) => state.setHoveredMuscle);

  // 當前指針直接懸停的單一 Mesh UUID（確保即使未歸類節點也能精準亮起）
  const [hoveredMeshUuid, setHoveredMeshUuid] = useState<string | null>(null);

  const meshListRef = useRef<{
    mesh: THREE.Mesh;
    key: MuscleGroupKey | null;
  }[]>([]);

  // 取得高擬真肌肉纖維條紋與立體 Bump 貼圖
  const { diffuseMap, bumpMap } = useMemo(() => getMuscleTextures(), []);

  // 複製並初始化場景節點：所有肌肉一開始均為統一的解剖暗紅色
  const parsedScene = useMemo(() => {
    const cloned = scene.clone(true);
    const meshes: {
      mesh: THREE.Mesh;
      key: MuscleGroupKey | null;
    }[] = [];

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const cleanName = mesh.name.trim();

        // 隱藏遮擋肌腹的表層筋膜與滑囊，露出底下條紋肌肉
        if (isFasciaNode(cleanName) || isBursaNode(cleanName)) {
          mesh.visible = false;
          return;
        }

        const key = identifyMuscleGroup(cleanName);
        mesh.userData.muscleKey = key;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // 初始狀態：深沉暗紅底色 + 肌肉條紋 Bump 質感
        mesh.material = new THREE.MeshStandardMaterial({
          map: diffuseMap,
          bumpMap: bumpMap,
          bumpScale: 0.022,
          color: '#360c0c',
          emissive: '#080101',
          emissiveIntensity: 0.02,
          roughness: 0.5,
          metalness: 0.06,
          transparent: false,
          opacity: 1.0,
        });

        meshes.push({ mesh, key });
      }
    });

    meshListRef.current = meshes;
    return cloned;
  }, [scene, diffuseMap, bumpMap]);

  // 動態更新材質：未懸停為更暗的深紅，滑鼠移到上面該肌肉即時變為鮮明肌肉紅
  useEffect(() => {
    meshListRef.current.forEach(({ mesh, key }) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat) return;

      mat.wireframe = viewMode === 'wireframe';
      mat.map = diffuseMap;
      mat.bumpMap = bumpMap;
      mat.bumpScale = 0.022;

      // 判定是否處於懸停或選中狀態
      const isHovered =
        (key && hoveredMuscle === key) || mesh.uuid === hoveredMeshUuid;
      const isSelected = key && selectedMuscle === key;
      const isHighlighted = isHovered || isSelected;

      if (isHighlighted) {
        // 游標移到上面 / 選中：呈現鮮明肌肉紅色
        mat.color.set('#822020');
        mat.emissive.set('#260606');
        mat.emissiveIntensity = 0.16;
        mat.roughness = 0.4;
        mat.metalness = 0.08;
        mat.transparent = false;
        mat.opacity = 1.0;
      } else {
        // 預設常態：更暗的暗紅底色
        mat.color.set('#360c0c');
        mat.emissive.set('#080101');
        mat.emissiveIntensity = 0.02;
        mat.roughness = 0.5;
        mat.metalness = 0.06;
        mat.transparent = false;
        mat.opacity = 1.0;
      }
    });
  }, [selectedMuscle, hoveredMuscle, hoveredMeshUuid, viewMode, diffuseMap, bumpMap]);

  // 指針懸停事件處理
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    setHoveredMeshUuid(mesh.uuid);
    const key = mesh.userData?.muscleKey as MuscleGroupKey | undefined;

    if (key) {
      setHoveredMuscle(key);
    } else {
      setHoveredMuscle(null);
    }
    document.body.style.cursor = 'pointer';
  };

  // 指針移出事件處理
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredMeshUuid(null);
    setHoveredMuscle(null);
    document.body.style.cursor = 'auto';
  };

  // 點擊選中 / 取消選中肌群
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    const key = mesh.userData?.muscleKey as MuscleGroupKey | undefined;

    if (key) {
      selectMuscle(selectedMuscle === key ? null : key);
    } else {
      selectMuscle(null);
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
