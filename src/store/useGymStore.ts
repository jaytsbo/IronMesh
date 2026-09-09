import { create } from 'zustand';
import { MuscleGroupKey, WorkoutSplit } from '../types/muscle';
import { MUSCLES_DATA } from '../data/musclesData';

interface GymState {
  selectedMuscle: MuscleGroupKey | null;
  hoveredMuscle: MuscleGroupKey | null;
  activeSplit: WorkoutSplit;
  showSkeleton: boolean;
  viewMode: 'standard' | 'xray' | 'wireframe';
  modelSource: string;
  isDrawerOpen: boolean;
  cameraResetSignal: number;

  // Actions
  selectMuscle: (muscle: MuscleGroupKey | null) => void;
  setHoveredMuscle: (muscle: MuscleGroupKey | null) => void;
  setActiveSplit: (split: WorkoutSplit) => void;
  toggleSkeleton: () => void;
  setShowSkeleton: (show: boolean) => void;
  setViewMode: (mode: 'standard' | 'xray' | 'wireframe') => void;
  resetCamera: () => void;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  openDrawer: () => void;
  setModelSource: (url: string) => void;
}

export const useGymStore = create<GymState>((set) => ({
  selectedMuscle: null,
  hoveredMuscle: null,
  activeSplit: 'all',
  showSkeleton: true,
  viewMode: 'standard',
  modelSource: '/models/human_muscles.glb',
  isDrawerOpen: false,
  cameraResetSignal: 0,

  selectMuscle: (muscle) => {
    set({
      selectedMuscle: muscle,
      isDrawerOpen: !!muscle,
    });
  },

  setHoveredMuscle: (muscle) => set({ hoveredMuscle: muscle }),

  setActiveSplit: (split) => {
    set((state) => {
      // 若當前選中的肌群不屬於新的課表分類，則取消選中並關閉抽屜
      if (split !== 'all' && state.selectedMuscle) {
        const info = MUSCLES_DATA[state.selectedMuscle];
        if (info && info.split !== split) {
          return { activeSplit: split, selectedMuscle: null, isDrawerOpen: false };
        }
      }
      return { activeSplit: split };
    });
  },

  toggleSkeleton: () => set((state) => ({ showSkeleton: !state.showSkeleton })),
  setShowSkeleton: (show) => set({ showSkeleton: show }),
  setViewMode: (mode) => set({ viewMode: mode }),

  resetCamera: () =>
    set((state) => ({
      selectedMuscle: null,
      isDrawerOpen: false,
      cameraResetSignal: state.cameraResetSignal + 1,
    })),

  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  closeDrawer: () => set({ isDrawerOpen: false }),
  openDrawer: () => set({ isDrawerOpen: true }),
  setModelSource: (url) => set({ modelSource: url }),
}));
