import React from 'react';
import {
  X,
  Dumbbell,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';
import { MUSCLES_DATA } from '../../data/musclesData';
import { Exercise } from '../../types/muscle';

export const MuscleDrawer: React.FC = () => {
  const selectedMuscle = useGymStore((state) => state.selectedMuscle);
  const isDrawerOpen = useGymStore((state) => state.isDrawerOpen);
  const closeDrawer = useGymStore((state) => state.closeDrawer);
  const resetCamera = useGymStore((state) => state.resetCamera);

  if (!selectedMuscle || !isDrawerOpen) return null;

  const data = MUSCLES_DATA[selectedMuscle];
  if (!data) return null;

  return (
    <aside className="fixed top-0 right-0 bottom-0 z-40 w-full sm:w-[480px] md:w-[520px] glass-panel bg-slate-950/90 backdrop-blur-2xl border-l border-slate-700/60 shadow-2xl flex flex-col transition-transform duration-300 ease-out animate-in slide-in-from-right">
      {/* 頂部標題區 */}
      <div className="p-6 border-b border-slate-800/80 flex items-start justify-between relative overflow-hidden">
        {/* 背景光暈 */}
        <div
          className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: data.themeColor }}
        />

        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: data.themeColor }}
            />
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
              {data.nameEn}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-slate-800 border border-slate-700 text-slate-300">
              {data.split}
            </span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-wide flex items-baseline gap-2">
            {data.name}
          </h2>

          <p className="text-xs italic text-slate-400 font-serif">
            {data.latinName}
          </p>
        </div>

        <button
          onClick={closeDrawer}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 內容滾動區域 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* 主要生物力學發力功能 */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>主要發力功能與關節運動</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            {data.functionSummary}
          </p>
          <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 leading-normal">
            <span className="font-semibold text-slate-300">起止點概要：</span>
            {data.originInsertion}
          </div>
        </div>

        {/* 推薦訓練動作清單 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white text-sm font-bold tracking-wider">
              <Dumbbell className="w-4 h-4 text-cyan-400" />
              <span>推薦訓練動作清單</span>
              <span className="px-1.5 py-0.2 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
                {data.exercises.length}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">動作核心要領與避坑守則</span>
          </div>

          <div className="space-y-4">
            {data.exercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} themeColor={data.themeColor} />
            ))}
          </div>
        </div>
      </div>

      {/* 底部按鈕操作 */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between gap-3">
        <button
          onClick={resetCamera}
          className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/60 transition-all flex-1 text-center"
        >
          重置全局視角
        </button>
        <button
          onClick={closeDrawer}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-cyan-600/25 transition-all flex-1 text-center"
        >
          完成檢視
        </button>
      </div>
    </aside>
  );
};

interface ExerciseCardProps {
  exercise: Exercise;
  themeColor: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, themeColor }) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3 group">
      {/* 動作名稱與標籤 */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
            {exercise.name}
          </h4>
          <span className="text-xs text-slate-400 font-mono">{exercise.nameEn}</span>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {exercise.equipment}
          </span>
          <span className="text-[10px] text-slate-400">{exercise.difficulty}</span>
        </div>
      </div>

      {/* 簡要描述 */}
      <p className="text-xs text-slate-300 leading-relaxed">{exercise.description}</p>

      {/* 動作核心要領 */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>核心動作要領 (Cues)</span>
        </div>
        <ul className="space-y-1 pl-1">
          {exercise.cues.map((cue, idx) => (
            <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-normal">
              <span className="text-cyan-500 font-bold">•</span>
              <span>{cue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 常見錯誤與防護守則 */}
      {exercise.precautions.length > 0 && (
        <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>安全防護與常見錯誤</span>
          </div>
          <ul className="space-y-0.5 pl-1">
            {exercise.precautions.map((precaution, idx) => (
              <li key={idx} className="text-[11px] text-amber-200/90 leading-normal">
                • {precaution}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 動作標籤 */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {exercise.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/80 text-slate-400 border border-slate-700/50"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
