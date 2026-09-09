import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import { Activity } from 'lucide-react';

export const ModelLoader: React.FC = () => {
  const { progress, active, item } = useProgress();

  return (
    <Html center>
      <div className="glass-panel p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 min-w-[280px] border border-cyan-500/30 text-white backdrop-blur-xl">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <Activity className="w-6 h-6 text-cyan-400 absolute animate-pulse" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xl font-bold tracking-wider text-cyan-300">
            {progress.toFixed(0)}%
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
            3D 解剖網格載入中...
          </span>
        </div>

        {/* 進度條 */}
        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
          <div
            className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-200 ease-out shadow-[0_0_10px_rgba(6,182,212,0.6)]"
            style={{ width: `${Math.max(progress, 5)}%` }}
          />
        </div>

        <p className="text-[10px] text-slate-500 font-mono truncate max-w-[240px]">
          {item ? item.split('/').pop() : '正在解析解剖結構...'}
        </p>
      </div>
    </Html>
  );
};
