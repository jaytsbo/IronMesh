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
import { MUSCLES_DATA } from '../../data/musclesData';
import { MuscleGroupKey } from '../../types/muscle';
import { SkeletonLayer } from './SkeletonLayer';
import { getMuscleTextures } from '../../utils/muscleTexture';

interface HumanModelProps {
  modelUrl?: string;
}

/**
 * 從原始節點名稱中清理出基礎肌肉名稱 (去除 .l, .r, .ol, .or, .el, .er 等前綴/後綴)
 */
function getBaseMuscleName(name: string): string {
  let clean = name.replace(/_/g, ' ').trim();
  clean = clean.replace(/\.(o\d*|e\d*|[olr])*[lr]?$/i, '');
  clean = clean.replace(/muscle(?:o\d*|e\d*|[olr])*[lr]?$/i, 'muscle');
  clean = clean.replace(/[_\s]+(?:o\d*|e\d*|[olr])*[lr]?$/i, '');
  clean = clean.replace(/^[_\s(]+|[_\s)]+$/g, '');
  return clean.trim() || name;
}

/**
 * 依據世界座標 Y 軸水平面將網格幾何體切分為上下兩部分 (用於將整條腹直肌細分為上腹與下腹)
 */
function splitGeometryByWorldY(
  mesh: THREE.Mesh,
  splitRatio: number = 0.48
): { upperGeom: THREE.BufferGeometry; lowerGeom: THREE.BufferGeometry } | null {
  mesh.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(mesh);
  const splitY = box.min.y + (box.max.y - box.min.y) * splitRatio;

  const geom = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
  const pos = geom.attributes.position;
  if (!pos || pos.count === 0) return null;

  const upperIndices: number[] = [];
  const lowerIndices: number[] = [];
  const v1 = new THREE.Vector3(), v2 = new THREE.Vector3(), v3 = new THREE.Vector3();

  for (let i = 0; i < pos.count; i += 3) {
    v1.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
    v2.fromBufferAttribute(pos, i + 1).applyMatrix4(mesh.matrixWorld);
    v3.fromBufferAttribute(pos, i + 2).applyMatrix4(mesh.matrixWorld);
    const centerY = (v1.y + v2.y + v3.y) / 3;

    const target = centerY >= splitY ? upperIndices : lowerIndices;
    target.push(i, i + 1, i + 2);
  }

  if (upperIndices.length === 0 || lowerIndices.length === 0) return null;

  function buildGeom(indices: number[]) {
    const subGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(indices.length * 3);
    const normals = geom.attributes.normal ? new Float32Array(indices.length * 3) : null;
    const uvs = geom.attributes.uv ? new Float32Array(indices.length * 2) : null;

    for (let k = 0; k < indices.length; k++) {
      const idx = indices[k];
      positions[k * 3] = pos.getX(idx);
      positions[k * 3 + 1] = pos.getY(idx);
      positions[k * 3 + 2] = pos.getZ(idx);

      if (normals && geom.attributes.normal) {
        normals[k * 3] = geom.attributes.normal.getX(idx);
        normals[k * 3 + 1] = geom.attributes.normal.getY(idx);
        normals[k * 3 + 2] = geom.attributes.normal.getZ(idx);
      }
      if (uvs && geom.attributes.uv) {
        uvs[k * 2] = geom.attributes.uv.getX(idx);
        uvs[k * 2 + 1] = geom.attributes.uv.getY(idx);
      }
    }

    subGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    if (normals) {
      subGeom.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    } else {
      subGeom.computeVertexNormals();
    }
    if (uvs) {
      subGeom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    }

    subGeom.computeBoundingBox();
    subGeom.computeBoundingSphere();
    return subGeom;
  }

  return {
    upperGeom: buildGeom(upperIndices),
    lowerGeom: buildGeom(lowerIndices),
  };
}

/**
 * 依據世界座標 |X| (距中線水平距離) 將網格切分為「外側肌腹 (Flank)」與「前側腱膜 (Aponeurosis)」
 */
function splitGeometryByWorldAbsX(
  mesh: THREE.Mesh,
  thresholdAbsX: number = 0.070
): { flankGeom: THREE.BufferGeometry; aponeurosisGeom: THREE.BufferGeometry } | null {
  mesh.updateMatrixWorld(true);
  const geom = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
  const pos = geom.attributes.position;
  if (!pos || pos.count === 0) return null;

  const flankIndices: number[] = [];
  const aponeurosisIndices: number[] = [];
  const v1 = new THREE.Vector3(),
    v2 = new THREE.Vector3(),
    v3 = new THREE.Vector3();

  for (let i = 0; i < pos.count; i += 3) {
    v1.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
    v2.fromBufferAttribute(pos, i + 1).applyMatrix4(mesh.matrixWorld);
    v3.fromBufferAttribute(pos, i + 2).applyMatrix4(mesh.matrixWorld);
    const centerAbsX = (Math.abs(v1.x) + Math.abs(v2.x) + Math.abs(v3.x)) / 3;

    const target = centerAbsX >= thresholdAbsX ? flankIndices : aponeurosisIndices;
    target.push(i, i + 1, i + 2);
  }

  if (flankIndices.length === 0 || aponeurosisIndices.length === 0) return null;

  function buildGeom(indices: number[]) {
    const subGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(indices.length * 3);
    const normals = geom.attributes.normal ? new Float32Array(indices.length * 3) : null;
    const uvs = geom.attributes.uv ? new Float32Array(indices.length * 2) : null;

    for (let k = 0; k < indices.length; k++) {
      const idx = indices[k];
      positions[k * 3] = pos.getX(idx);
      positions[k * 3 + 1] = pos.getY(idx);
      positions[k * 3 + 2] = pos.getZ(idx);

      if (normals && geom.attributes.normal) {
        normals[k * 3] = geom.attributes.normal.getX(idx);
        normals[k * 3 + 1] = geom.attributes.normal.getY(idx);
        normals[k * 3 + 2] = geom.attributes.normal.getZ(idx);
      }
      if (uvs && geom.attributes.uv) {
        uvs[k * 2] = geom.attributes.uv.getX(idx);
        uvs[k * 2 + 1] = geom.attributes.uv.getY(idx);
      }
    }

    subGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    if (normals) {
      subGeom.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    } else {
      subGeom.computeVertexNormals();
    }
    if (uvs) {
      subGeom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    }

    subGeom.computeBoundingBox();
    subGeom.computeBoundingSphere();
    return subGeom;
  }

  return {
    flankGeom: buildGeom(flankIndices),
    aponeurosisGeom: buildGeom(aponeurosisIndices),
  };
}

export const HumanModel: React.FC<HumanModelProps> = ({ modelUrl }) => {
  const defaultSource = useGymStore((state) => state.modelSource);
  const targetUrl = modelUrl || defaultSource;

  const { scene } = useGLTF(targetUrl, '/draco/');

  const selectedMuscle = useGymStore((state) => state.selectedMuscle);
  const viewMode = useGymStore((state) => state.viewMode);
  const showSkeleton = useGymStore((state) => state.showSkeleton);

  const selectMuscle = useGymStore((state) => state.selectMuscle);
  const setHoveredMuscle = useGymStore((state) => state.setHoveredMuscle);
  const setHoveredLabel = useGymStore((state) => state.setHoveredLabel);

  // 當前懸停目標（兼顧 key、解剖基礎名稱 baseName 與 mesh.uuid）
  const [hoveredTarget, setHoveredTarget] = useState<{
    key: MuscleGroupKey | null;
    baseName: string;
    uuid: string;
  } | null>(null);

  const meshListRef = useRef<{
    mesh: THREE.Mesh;
    key: MuscleGroupKey | null;
    baseName: string;
  }[]>([]);

  // 取得高擬真肌肉纖維條紋與立體 Bump 貼圖
  const { diffuseMap, bumpMap } = useMemo(() => getMuscleTextures(), []);

  // 輔助函式：建立預設暗紅材質
  const createDefaultMaterial = () =>
    new THREE.MeshStandardMaterial({
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

  // 複製並初始化場景節點：所有肌肉一開始均為統一的深暗紅
  const parsedScene = useMemo(() => {
    const cloned = scene.clone(true);
    const meshes: {
      mesh: THREE.Mesh;
      key: MuscleGroupKey | null;
      baseName: string;
    }[] = [];

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const cleanName = mesh.name.replace(/_/g, ' ').trim();

        // 1. 隱藏遮蔽性筋膜與滑囊
        if (isFasciaNode(cleanName) || isBursaNode(cleanName)) {
          mesh.visible = false;
          mesh.raycast = () => {};
          return;
        }

        // 2. 白線 (Linea Alba)：切分為上腹與下腹，防止射線穿透至後背並提供流暢正面拾取
        if (/^linea\s*alba/i.test(cleanName)) {
          const splitResult = splitGeometryByWorldY(mesh, 0.48);
          if (splitResult) {
            mesh.visible = false;
            mesh.raycast = () => {};

            const upperMesh = new THREE.Mesh(splitResult.upperGeom, createDefaultMaterial());
            upperMesh.position.copy(mesh.position);
            upperMesh.rotation.copy(mesh.rotation);
            upperMesh.scale.copy(mesh.scale);
            upperMesh.castShadow = true;
            upperMesh.name = cleanName + '.upper';
            upperMesh.userData.muscleKey = 'rectus_abdominis_upper';
            upperMesh.userData.baseMuscleName = '上腹直肌 (Upper Abs)';
            mesh.parent?.add(upperMesh);
            meshes.push({
              mesh: upperMesh,
              key: 'rectus_abdominis_upper',
              baseName: '上腹直肌 (Upper Abs)',
            });

            const lowerMesh = new THREE.Mesh(splitResult.lowerGeom, createDefaultMaterial());
            lowerMesh.position.copy(mesh.position);
            lowerMesh.rotation.copy(mesh.rotation);
            lowerMesh.scale.copy(mesh.scale);
            lowerMesh.castShadow = true;
            lowerMesh.name = cleanName + '.lower';
            lowerMesh.userData.muscleKey = 'rectus_abdominis_lower';
            lowerMesh.userData.baseMuscleName = '下腹直肌 (Lower Abs)';
            mesh.parent?.add(lowerMesh);
            meshes.push({
              mesh: lowerMesh,
              key: 'rectus_abdominis_lower',
              baseName: '下腹直肌 (Lower Abs)',
            });
            return;
          }
        }

        // 3. 腹外斜肌幾何細分：保留「側腰人魚線肌腹 (可射線選取)」，移除前側腱膜遮罩以完整呈現底層六塊肌
        if (/^external\s+abdominal\s+oblique\s+muscle\.?[lr]$/i.test(cleanName)) {
          const splitResult = splitGeometryByWorldAbsX(mesh, 0.070);
          if (splitResult) {
            mesh.visible = false;
            mesh.raycast = () => {};

            // 側腰人魚線肌腹
            const flankMesh = new THREE.Mesh(splitResult.flankGeom, createDefaultMaterial());
            flankMesh.position.copy(mesh.position);
            flankMesh.rotation.copy(mesh.rotation);
            flankMesh.scale.copy(mesh.scale);
            flankMesh.castShadow = true;
            flankMesh.receiveShadow = true;
            flankMesh.name = cleanName + '.flank';
            flankMesh.userData.muscleKey = 'external_oblique';
            flankMesh.userData.baseMuscleName = '腹外斜肌 (人魚線)';
            mesh.parent?.add(flankMesh);
            meshes.push({
              mesh: flankMesh,
              key: 'external_oblique',
              baseName: '腹外斜肌 (人魚線)',
            });

            // 前側腱膜層完全移除/不加入場景，避免遮擋底下的六塊肌肌腹
            return;
          }
        }

        // 4. 腹內斜肌幾何細分：同樣保留側腰肌腹，移除前側腱膜
        if (/^internal\s+abdominal\s+oblique\s+muscle\.?[lr]$/i.test(cleanName)) {
          const splitResult = splitGeometryByWorldAbsX(mesh, 0.070);
          if (splitResult) {
            mesh.visible = false;
            mesh.raycast = () => {};

            const flankMesh = new THREE.Mesh(splitResult.flankGeom, createDefaultMaterial());
            flankMesh.position.copy(mesh.position);
            flankMesh.rotation.copy(mesh.rotation);
            flankMesh.scale.copy(mesh.scale);
            flankMesh.castShadow = true;
            flankMesh.receiveShadow = true;
            flankMesh.name = cleanName + '.flank';
            flankMesh.userData.muscleKey = 'internal_oblique';
            flankMesh.userData.baseMuscleName = '腹內斜肌 (Internal Oblique)';
            mesh.parent?.add(flankMesh);
            meshes.push({
              mesh: flankMesh,
              key: 'internal_oblique',
              baseName: '腹內斜肌 (Internal Oblique)',
            });

            // 前側腱膜不加入場景
            return;
          }
        }

        // 5. 腹直肌幾何細分：將整條腹直肌肌腹（肚臍水平）精準切分為「上腹」與「下腹」
        if (/^rectus\s+abdominis\s+muscle\.?[lr]$/i.test(cleanName)) {
          const splitResult = splitGeometryByWorldY(mesh, 0.48);
          if (splitResult) {
            // 停用原本的整條網格
            mesh.visible = false;
            mesh.raycast = () => {};

            // 上腹網格
            const upperMesh = new THREE.Mesh(splitResult.upperGeom, createDefaultMaterial());
            upperMesh.position.copy(mesh.position);
            upperMesh.rotation.copy(mesh.rotation);
            upperMesh.scale.copy(mesh.scale);
            upperMesh.castShadow = true;
            upperMesh.receiveShadow = true;
            upperMesh.name = cleanName + '.upper';
            upperMesh.userData.muscleKey = 'rectus_abdominis_upper';
            upperMesh.userData.baseMuscleName = '上腹直肌 (Upper Abs)';
            mesh.parent?.add(upperMesh);
            meshes.push({
              mesh: upperMesh,
              key: 'rectus_abdominis_upper',
              baseName: '上腹直肌 (Upper Abs)',
            });

            // 下腹網格
            const lowerMesh = new THREE.Mesh(splitResult.lowerGeom, createDefaultMaterial());
            lowerMesh.position.copy(mesh.position);
            lowerMesh.rotation.copy(mesh.rotation);
            lowerMesh.scale.copy(mesh.scale);
            lowerMesh.castShadow = true;
            lowerMesh.receiveShadow = true;
            lowerMesh.name = cleanName + '.lower';
            lowerMesh.userData.muscleKey = 'rectus_abdominis_lower';
            lowerMesh.userData.baseMuscleName = '下腹直肌 (Lower Abs)';
            mesh.parent?.add(lowerMesh);
            meshes.push({
              mesh: lowerMesh,
              key: 'rectus_abdominis_lower',
              baseName: '下腹直肌 (Lower Abs)',
            });

            return;
          }
        }

        // 6. 腹直肌腱劃與附著點 (.ol, .or 上端肋骨起點歸為上腹；.el, .er 腱劃穿透射線)
        if (/^rectus\s+abdominis\s+muscle\.?o[lr]$/i.test(cleanName)) {
          mesh.userData.muscleKey = 'rectus_abdominis_upper';
          mesh.userData.baseMuscleName = '上腹直肌 (Upper Abs)';
          mesh.castShadow = true;
          mesh.material = createDefaultMaterial();
          meshes.push({ mesh, key: 'rectus_abdominis_upper', baseName: '上腹直肌 (Upper Abs)' });
          return;
        }

        if (/^rectus\s+abdominis\s+muscle\.?e[lr]$/i.test(cleanName)) {
          mesh.castShadow = true;
          mesh.material = createDefaultMaterial();
          mesh.raycast = () => {};
          return;
        }

        // 7. 錐狀肌 (Pyramidalis) 歸屬於下腹直肌
        if (/^pyramidalis\s+muscle/i.test(cleanName)) {
          mesh.userData.muscleKey = 'rectus_abdominis_lower';
          mesh.userData.baseMuscleName = '下腹直肌 (Lower Abs)';
          mesh.castShadow = true;
          mesh.material = createDefaultMaterial();
          meshes.push({ mesh, key: 'rectus_abdominis_lower', baseName: '下腹直肌 (Lower Abs)' });
          return;
        }

        const key = identifyMuscleGroup(cleanName);
        const baseName = getBaseMuscleName(cleanName);

        mesh.userData.muscleKey = key;
        mesh.userData.baseMuscleName = baseName;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = createDefaultMaterial();

        meshes.push({ mesh, key, baseName });
      }
    });

    meshListRef.current = meshes;
    return cloned;
  }, [scene, diffuseMap, bumpMap]);

  // 動態更新材質：未懸停為更暗的深紅，滑鼠移到上面該肌肉即時變為鮮明肌肉紅
  useEffect(() => {
    meshListRef.current.forEach(({ mesh, key, baseName }) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat) return;

      mat.wireframe = viewMode === 'wireframe';
      mat.map = diffuseMap;
      mat.bumpMap = bumpMap;
      mat.bumpScale = 0.022;

      // 判定是否高亮：
      // 1. 若該部件被點選鎖定 (selectedMuscle === key)
      // 2. 指針懸停中：key 匹配優先，無 key 時才回退到 baseName，徹底防止跨部件串聯高亮
      const isSelected = !!(key && selectedMuscle === key);
      const isHovered = !!(
        hoveredTarget &&
        ((key && hoveredTarget.key ? key === hoveredTarget.key : false) ||
          (!key && !hoveredTarget.key && baseName && hoveredTarget.baseName === baseName) ||
          mesh.uuid === hoveredTarget.uuid)
      );

      if (isSelected || isHovered) {
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
  }, [selectedMuscle, hoveredTarget, viewMode, diffuseMap, bumpMap]);

  // 指針即時移動處理：以最前層可見物件為準，無射線競爭與閃爍問題
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const topIntersection = e.intersections.find((i) => i.object.visible);
    const mesh = topIntersection?.object as THREE.Mesh | undefined;

    if (!mesh) {
      setHoveredTarget(null);
      setHoveredMuscle(null);
      setHoveredLabel(null);
      document.body.style.cursor = 'auto';
      return;
    }

    const key = mesh.userData?.muscleKey as MuscleGroupKey | undefined;
    const baseName = (mesh.userData?.baseMuscleName as string) || '';

    setHoveredTarget({
      key: key || null,
      baseName,
      uuid: mesh.uuid,
    });

    if (key) {
      setHoveredMuscle(key);
      const info = MUSCLES_DATA[key];
      setHoveredLabel(info ? info.name : baseName);
    } else {
      setHoveredMuscle(null);
      setHoveredLabel(baseName);
    }

    document.body.style.cursor = 'pointer';
  };

  // 指針離開模型
  const handlePointerLeave = () => {
    setHoveredTarget(null);
    setHoveredMuscle(null);
    setHoveredLabel(null);
    document.body.style.cursor = 'auto';
  };

  // 點擊選中 / 取消選中肌群
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const topIntersection = e.intersections.find((i) => i.object.visible);
    const mesh = topIntersection?.object as THREE.Mesh | undefined;

    if (!mesh) {
      selectMuscle(null);
      return;
    }

    const key = mesh.userData?.muscleKey as MuscleGroupKey | undefined;
    if (key) {
      selectMuscle(selectedMuscle === key ? null : key);
    } else {
      selectMuscle(null);
    }
  };

  return (
    <group
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
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
