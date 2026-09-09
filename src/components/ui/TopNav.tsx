import React from 'react';
import {
  RotateCcw,
  Bone,
  Layers,
  Sparkles,
  Dumbbell,
  Crosshair,
  Info,
} from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';
import { WorkoutSplit } from '../../types/muscle';

const SPLIT_OPTIONS: { key: WorkoutSplit; label: string; count: string }[] = [
  { key: 'all', label: '全部部位', count: 'ALL' },
  { key: 'push', label: '推類 (Push)', count: '胸/肩/三頭' },
  { key: 'pull', label: '拉類 (Pull)', count: '背/二頭' },
  { key: 'legs', label: '下肢 (Legs)', count: '四頭/腿後/內收/臀/小腿' },
  { key: 'core', label: '核心 (Core)', count: '上腹/下腹/腹斜肌/前鋸肌' },
];

interface TopNavProps {
  onOpenInfoModal: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenInfoModal }) => {
  const activeSplit = useGymStore((state) => state.activeSplit);
  const setActiveSplit = useGymStore((state) => state.setActiveSplit);
  const showSkeleton = useGymStore((state) => state.showSkeleton);
  const toggleSkeleton = useGymStore((state) => state.toggleSkeleton);
  const viewMode = useGymStore((state) => state.viewMode);
  const setViewMode = useGymStore((state) => state.setViewMode);
  const resetCamera = useGymStore((state) => state.resetCamera);

  const cycleViewMode = () => {
    if (viewMode === 'standard') setViewMode('xray');
    else if (viewMode === 'xray') setViewMode('wireframe');
    else setViewMode('standard');
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* 品牌與標題 */}
      <div className="pointer-events-auto flex items-center gap-3 glass-panel px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Dumbbell className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-base tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
              IRONMESH 3D
            </h1>
            <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              PRO
            </span>
          </div>
          <p className="text-[11px] text-slate-400">人體解剖肌群與動作互動可視化平台</p>
        </div>
      </div>

      {/* 推 / 拉 / 腿 / 核心 分類快速切換 */}
      <div className="pointer-events-auto glass-panel p-1.5 rounded-2xl shadow-xl border border-slate-700/50 flex items-center gap-1 overflow-x-auto max-w-full">
        {SPLIT_OPTIONS.map((item) => {
          const isActive = activeSplit === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveSplit(item.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{item.label}</span>
              <span className={`text-[10px] opacity-70 hidden sm:inline ${isActive ? 'text-cyan-100' : 'text-slate-400'}`}>
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 右側工具欄：視角重置、骨骼透視、視覺渲染模式 */}
      <div className="pointer-events-auto flex items-center gap-2 glass-panel p-1.5 rounded-2xl shadow-xl border border-slate-700/50">
        {/* 骨骼層切換 */}
        <button
          onClick={toggleSkeleton}
          title="切換透視骨骼架構"
          className={`p-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 ${
            showSkeleton
              ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Bone className="w-4 h-4" />
          <span className="hidden lg:inline text-xs">骨骼基底</span>
        </button>

        {/* 視覺模式 (標準 / X光 / 網格) */}
        <button
          onClick={cycleViewMode}
          title={`目前模式: ${viewMode}`}
          className="p-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-1.5"
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="hidden lg:inline text-xs capitalize">{viewMode}</span>
        </button>

        {/* 重置視角 */}
        <button
          onClick={resetCamera}
          title="重置 3D 視角中心"
          className="p-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">重置視角</span>
        </button>

        <div className="w-[1px] h-5 bg-slate-700 mx-0.5" />

        {/* 平台資訊 / 模型來源 */}
        <button
          onClick={onOpenInfoModal}
          title="關於平台與 3D 模型來源"
          className="p-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
