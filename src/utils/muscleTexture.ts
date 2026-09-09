import * as THREE from 'three';

let cachedTextures: {
  diffuseMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} | null = null;

/**
 * 生成高擬真肌纖維紋理與表面凹凸 Bump Map
 * 解決原本模型單色平面覆蓋、缺乏肌紋細節的問題
 */
export function getMuscleTextures(): {
  diffuseMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  if (cachedTextures) {
    return cachedTextures;
  }

  const size = 512;

  // 1. 漫反射肌纖維紋理 (Diffuse / Albedo Map)
  const diffuseCanvas = document.createElement('canvas');
  diffuseCanvas.width = size;
  diffuseCanvas.height = size;
  const dCtx = diffuseCanvas.getContext('2d')!;

  // 肌紅底色 (深層肌紅蛋白色調)
  dCtx.fillStyle = '#6a1616';
  dCtx.fillRect(0, 0, size, size);

  // 沿縱向繪製高頻細微肌纖維條紋 (Muscle Fascicle Striations)
  for (let y = 0; y < size; y += 1.5) {
    const wave = Math.sin(y * 0.35) * 18 + Math.sin(y * 0.08) * 12;
    const noise = (Math.random() - 0.5) * 12;
    
    // 紅色階層微變化 (肌紅與微量結締組織微反光)
    const r = Math.min(255, Math.max(80, Math.round(115 + wave + noise)));
    const g = Math.min(255, Math.max(16, Math.round(26 + (wave + noise) * 0.22)));
    const b = Math.min(255, Math.max(16, Math.round(26 + (wave + noise) * 0.22)));

    dCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    dCtx.fillRect(0, y, size, 1.2);
  }

  // 縱橫交錯的肌節橫紋微結構 (Sarcomere cross-striations)
  dCtx.fillStyle = 'rgba(255, 230, 230, 0.035)';
  for (let x = 0; x < size; x += 8) {
    dCtx.fillRect(x, 0, 1.2, size);
  }

  const diffuseMap = new THREE.CanvasTexture(diffuseCanvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.RepeatWrapping;
  diffuseMap.repeat.set(3, 6);
  diffuseMap.needsUpdate = true;

  // 2. 凹凸法線貼圖 (Bump Map) - 產生立體物理肌溝與纖維束高低光影
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y += 2) {
    const wave = Math.sin(y * 0.35) * 65 + (Math.random() - 0.5) * 18;
    const gray = Math.min(255, Math.max(0, Math.round(128 + wave)));
    bCtx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
    bCtx.fillRect(0, y, size, 1.5);
  }

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(3, 6);
  bumpMap.needsUpdate = true;

  cachedTextures = { diffuseMap, bumpMap };
  return cachedTextures;
}
