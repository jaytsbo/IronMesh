import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { HumanModel } from './HumanModel';
import { ModelLoader } from './ModelLoader';
import { CameraController } from './CameraController';

export const Scene: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className="w-full h-full relative bg-slate-950">
      <Canvas
        camera={{ position: [0, 0.2, 2.6], fov: 45 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* 背景與工作室霧氣效果 */}
        <color attach="background" args={['#090d16']} />
        <fog attach="fog" args={['#090d16', 5, 12]} />

        {/* 光影配置：工作室輪廓光 + 環境光 + 頂光 */}
        <ambientLight intensity={0.65} color="#94a3b8" />
        
        {/* 主要主光 (Key Light) */}
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* 側後方輪廓光 (Rim Light) - 使用中性白光，避免藍光造成肌肉偏色 */}
        <directionalLight
          position={[-3, 2, -3]}
          intensity={0.7}
          color="#ffffff"
        />

        {/* 補光 (Fill Light) */}
        <directionalLight
          position={[0, -2, 2]}
          intensity={0.4}
          color="#e2e8f0"
        />

        {/* 頂部半球光：中性均勻天光 */}
        <hemisphereLight
          args={['#f8fafc', '#1e293b', 0.45]}
        />

        {/* 控制相機平滑平移與聚焦 */}
        <CameraController controlsRef={controlsRef} />

        {/* OrbitControls: 360 度旋轉，限制俯仰角防翻轉與穿底 */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.8}
          zoomSpeed={0.9}
          minDistance={0.8}
          maxDistance={4.2}
          minPolarAngle={Math.PI * 0.15} // 約 27 度，防止直視頭頂翻轉
          maxPolarAngle={Math.PI * 0.85} // 約 153 度，防止穿入腳底底板
          target={[0, 0, 0]}
        />

        {/* 3D 解剖模型懸吊載入 */}
        <Suspense fallback={<ModelLoader />}>
          <HumanModel />
          
          {/* 腳底柔和接觸陰影 */}
          <ContactShadows
            position={[0, -1.02, 0]}
            opacity={0.65}
            scale={3.5}
            blur={2.2}
            far={1.8}
            color="#020617"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
