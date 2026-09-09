import React, { useEffect } from 'react';
import { Scene } from './components/canvas/Scene';
import { useGymStore } from './store/useGymStore';
import { MUSCLES_DATA } from './data/musclesData';

export const App: React.FC = () => {
  const selectedMuscle = useGymStore((state) => state.selectedMuscle);
  const hoveredMuscle = useGymStore((state) => state.hoveredMuscle);
  const hoveredLabel = useGymStore((state) => state.hoveredLabel);
  const selectMuscle = useGymStore((state) => state.selectMuscle);
  const resetCamera = useGymStore((state) => state.resetCamera);

  const activeKey = selectedMuscle || hoveredMuscle;
  const activeInfo = activeKey ? MUSCLES_DATA[activeKey] : null;
  const displayName = activeInfo ? activeInfo.name : hoveredLabel;
  const displaySub = activeInfo ? activeInfo.nameEn : (hoveredLabel ? '解剖結構' : null);

  // 鍵盤快捷鍵：Escape 取消選取，R 鍵重置視角
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectMuscle(null);
      } else if (e.key === 'r' || e.key === 'R') {
        if (document.activeElement?.tagName !== 'INPUT') {
          resetCamera();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectMuscle, resetCamera]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* 3D 渲染畫布主舞台 */}
      <main className="w-full h-full">
        <Scene />
      </main>

      {/* 極簡微型 HUD：專注於 3D 肌肉觀察與細分部位確認 */}
      <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-1.5">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 px-3.5 py-2 rounded-lg text-white shadow-xl">
          <div className="text-xs text-slate-400 font-medium tracking-wide flex items-center gap-2">
            <span>3D 肌肉解剖模型</span>
            <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
              R 重置視角 / ESC 取消
            </span>
          </div>
          {displayName ? (
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-semibold text-base text-rose-400">{displayName}</span>
              {displaySub && <span className="text-xs text-slate-400">{displaySub}</span>}
              {selectedMuscle && (
                <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 rounded">
                  已選中
                </span>
              )}
            </div>
          ) : (
            <div className="mt-1 text-xs text-slate-500 italic">
              移動滑鼠至任意肌肉即時亮起，點擊可鎖定視角
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
