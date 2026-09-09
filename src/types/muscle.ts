export type MuscleGroupKey =
  // 三角肌細分
  | 'deltoid_anterior'
  | 'deltoid_lateral'
  | 'deltoid_posterior'
  | 'shoulders'
  // 核心細分 (上腹、下腹、外斜肌人魚線、內斜肌、腹橫肌、前鋸肌鯊魚線)
  | 'rectus_abdominis_upper'
  | 'rectus_abdominis_lower'
  | 'rectus_abdominis'
  | 'external_oblique'
  | 'internal_oblique'
  | 'transversus_abdominis'
  | 'serratus_anterior'
  | 'abs'
  // 胸部細分
  | 'chest_clavicular'
  | 'chest_sternocostal'
  | 'chest_minor'
  | 'chest'
  // 背部與斜方肌細分
  | 'trapezius_upper'
  | 'trapezius_middle_lower'
  | 'lats'
  | 'back'
  // 手臂細分
  | 'biceps_long_head'
  | 'biceps_short_head'
  | 'brachialis'
  | 'biceps'
  | 'triceps_long_head'
  | 'triceps_lateral_head'
  | 'triceps_medial_head'
  | 'triceps'
  // 前臂細分
  | 'brachioradialis'
  | 'forearm_flexors'
  | 'forearm_extensors'
  | 'forearm_pronators_supinators'
  | 'forearms'
  // 下肢細分
  | 'quads'
  | 'adductors'
  | 'hamstrings'
  | 'glutes_maximus'
  | 'glutes_medius'
  | 'glutes'
  | 'tibialis_anterior'
  | 'gastrocnemius'
  | 'soleus'
  | 'fibularis';

export type WorkoutSplit = 'all' | 'push' | 'pull' | 'legs' | 'core';

export interface Exercise {
  id: string;
  name: string;
  nameEn: string;
  type: '複合動作 (Compound)' | '孤立動作 (Isolation)';
  equipment: '槓鈴 Barbell' | '啞鈴 Dumbbell' | '滑輪 Cable' | '自重 Bodyweight' | '器械 Machine';
  difficulty: '入門 Beginner' | '中階 Intermediate' | '進階 Advanced';
  description: string;
  cues: string[];
  precautions: string[];
  tags: string[];
}

export interface CameraViewConfig {
  target: [number, number, number];
  position: [number, number, number];
}

export interface MuscleGroupInfo {
  key: MuscleGroupKey;
  name: string;
  nameEn: string;
  latinName: string;
  split: WorkoutSplit;
  functionSummary: string;
  originInsertion: string;
  cameraFocus: CameraViewConfig;
  themeColor: string;
  exercises: Exercise[];
}

export interface MeshMatchRule {
  key: MuscleGroupKey;
  regex: RegExp;
  label: string;
}
