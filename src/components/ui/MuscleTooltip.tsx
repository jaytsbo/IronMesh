import React from 'react';
import { MousePointerClick, HelpCircle } from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';
import { MUSCLES_DATA } from '../../data/musclesData';

export const MuscleTooltip: React.FC = () => {
  const hoveredMuscle = useGymStore((state) => state.hoveredMuscle);
  const selectedMuscle = useGymStore((state) => state.selectedMuscle);

  const activeKey = hoveredMuscle || selectedMuscle;
  const activeData = activeKey ? MUSCLES_DATA[activeKey] : null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2">
      {/* 懸停肌群 HUD 提示卡片 */}
      {activeData ? (
        <div className="glass-panel px-4 py-2 rounded-2xl shadow-2xl border border-cyan-500/40 flex items-center gap-3 animate-in fade-in zoom-in-95 backdrop-blur-xl">
          <span
            className="w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: activeData.themeColor }}
          />
          <div className="flex items-baseline gap-2">
            <span className="font-black text-sm text-white tracking-wide">
              {activeData.name}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {activeData.nameEn}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono uppercase">
              {activeData.split}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-cyan-400 font-medium pl-2 border-l border-slate-700">
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>點選聚焦動作詳情</span>
          </div>
        </div>
      ) : (
        <div className="glass-panel-subtle px-3 py-1.5 rounded-full shadow-lg border border-slate-800/80 flex items-center gap-2 text-slate-400 text-xs">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>左鍵旋轉 · 滾輪縮放 · 右鍵平移 · 懸停/點擊肌群互動</span>
        </div>
      )}
    </div>
  );
};
