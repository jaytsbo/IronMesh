import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, Database, Sliders, RefreshCw } from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const modelSource = useGymStore((state) => state.modelSource);
  const setModelSource = useGymStore((state) => state.setModelSource);
  const [customUrl, setCustomUrl] = useState(modelSource);

  if (!isOpen) return null;

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setModelSource(customUrl.trim());
      onClose();
    }
  };

  const handleResetDefault = () => {
    setModelSource('/models/human_muscles.glb');
    setCustomUrl('/models/human_muscles.glb');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-6 relative">
        {/* 頂部標題 */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">平台架構與 3D 模型設定</h3>
              <p className="text-xs text-slate-400">IronMesh 3D 解剖學網格映射機制</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 模型授權與來源說明 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>開源解剖資料集 (Open-Source 3D Dataset)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            本系統預設搭載經 Draco 高壓縮之完整人體肌肉解剖模型（包含逾 1,100 個分件解剖網格器官），衍生自 
            <span className="text-cyan-300 font-semibold"> Z-Anatomy</span> 與 
            <span className="text-cyan-300 font-semibold"> BodyParts3D (DBCLS)</span>，遵循 
            <span className="text-slate-200 underline"> Creative Commons BY-SA 4.0</span> 開源授權。
          </p>
        </div>

        {/* 動態網格適配器說明 */}
        <div className="space-y-2 text-xs text-slate-300">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>動態網格匹配字典 (Mesh Traversal & Regex)</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-normal">
            載入 GLB 時使用 <code className="text-cyan-300 font-mono">scene.traverse</code> 遍歷節點，依據正則表達式自動映射胸大肌 (Pectoralis)、背闊肌 (Latissimus)、三角肌 (Deltoid)、手臂與下肢肌群至推/拉/腿動作庫。
          </p>
        </div>

        {/* 自訂模型 GLB URL 載入 */}
        <form onSubmit={handleApplyUrl} className="space-y-3 pt-2 border-t border-slate-800">
          <label className="text-xs font-semibold text-slate-300 block">
            自訂 3D 模型 URL (GLB / CDN 路徑)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://.../model.glb 或 /models/human_muscles.glb"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all"
            >
              載入
            </button>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-400">
            <span>當前載入路徑: <span className="text-slate-200 font-mono">{modelSource}</span></span>
            <button
              type="button"
              onClick={handleResetDefault}
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              恢復預設模型
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
