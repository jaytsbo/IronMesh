import { MuscleGroupKey, MeshMatchRule } from '../types/muscle';

/**
 * 判斷節點是否為筋膜 (Fascia)
 * 筋膜在解剖模型中會包覆肌肉外層，若直接填上純色會遮蔽肌纖維與肌肉線條
 */
export function isFasciaNode(nodeName: string): boolean {
  if (!nodeName) return false;
  return /fascia|aponeurosis/i.test(nodeName);
}

/**
 * 判斷節點是否為肌腱、腱劃、止點腱膜或滑囊
 */
export function isTendonNode(nodeName: string): boolean {
  if (!nodeName) return false;
  return /tendon|tendin|aponeurosis|ligament|linea\s*alba|\.e\d*[lr]$|\.o\d*[lr]$|\.el$|\.er$|\.ol$|\.or$/i.test(nodeName);
}

/**
 * 判斷節點是否為滑囊
 */
export function isBursaNode(nodeName: string): boolean {
  if (!nodeName) return false;
  return /bursa/i.test(nodeName);
}

/**
 * 解剖學節點名稱模糊匹配字典
 * 支援細分肌群 (三角肌前中後束、腹直肌、腹斜肌等)
 * 注意順序：特定肌束優先於通用大肌群判定
 */
export const MESH_MATCH_RULES: MeshMatchRule[] = [
  // -------------------------
  // 1. 下肢後側 (腿後與小腿優先，避免 biceps / triceps 命名衝突)
  // -------------------------
  {
    key: 'hamstrings',
    regex: /biceps\s*femoris|semitendinosus|semimembranosus/i,
    label: '腿後肌群 / 膕繩肌 (Hamstrings)',
  },
  {
    key: 'tibialis_anterior',
    regex: /tibialis\s*anterior|extensor\s*digitorum.*(?:longus|brevis)|extensor\s*hallucis|extensor\s*retinaculum.*ankle/i,
    label: '小腿前側肌群 (脛前肌 / 趾長伸肌)',
  },
  {
    key: 'gastrocnemius',
    regex: /gastrocnemius/i,
    label: '腓腸肌 (Gastrocnemius)',
  },
  {
    key: 'soleus',
    regex: /soleus|calcaneal\s*tendon|achilles/i,
    label: '比目魚肌 (Soleus)',
  },
  {
    key: 'fibularis',
    regex: /fibular|perone/i,
    label: '腓骨肌群 (Fibularis Group)',
  },

  // -------------------------
  // 2. 三角肌細分 (前束 / 中束 / 後束)
  // -------------------------
  {
    key: 'deltoid_anterior',
    regex: /clavicular.*deltoid|anterior.*deltoid/i,
    label: '三角肌前束 (Anterior Deltoid)',
  },
  {
    key: 'deltoid_lateral',
    regex: /acromial.*deltoid|lateral.*deltoid|middle.*deltoid/i,
    label: '三角肌中束 (Lateral Deltoid)',
  },
  {
    key: 'deltoid_posterior',
    regex: /scapular.*deltoid|spinal.*deltoid|posterior.*deltoid/i,
    label: '三角肌後束 (Posterior Deltoid)',
  },
  {
    key: 'shoulders',
    regex: /\bdeltoid/i,
    label: '三角肌複合 (Shoulders)',
  },

  // -------------------------
  // 3. 胸部肌群細分 (優先於腹部，避免 abdominal part of pectoral 被核心截胡)
  // -------------------------
  {
    key: 'chest_clavicular',
    regex: /clavicular.*(head|part).*pectoral/i,
    label: '胸大肌上束/鎖骨端 (Upper Chest)',
  },
  {
    key: 'chest_minor',
    regex: /pectoralis\s*minor/i,
    label: '胸小肌 (Pectoralis Minor)',
  },
  {
    key: 'chest_sternocostal',
    regex: /sternocostal.*pectoral|abdominal.*part.*pectoral/i,
    label: '胸大肌胸肋與下緣 (Mid & Lower Chest)',
  },
  {
    key: 'chest',
    regex: /pectoralis\s*major|\bpectoral\b/i,
    label: '胸大肌整體 (Chest)',
  },

  // -------------------------
  // 4. 核心細分 (上腹 / 下腹 / 腹外斜肌人魚線 / 腹內斜肌 / 腹橫肌 / 前鋸肌鯊魚線)
  // -------------------------
  {
    key: 'rectus_abdominis_upper',
    regex: /rectus\s*abdominis.*upper/i,
    label: '上腹直肌 (Upper Rectus Abdominis)',
  },
  {
    key: 'rectus_abdominis_lower',
    regex: /rectus\s*abdominis.*lower|pyramidalis/i,
    label: '下腹直肌 (Lower Rectus Abdominis)',
  },
  {
    key: 'rectus_abdominis',
    regex: /rectus\s*abdominis/i,
    label: '腹直肌 (Rectus Abdominis)',
  },
  {
    key: 'external_oblique',
    regex: /external\s*(abdominal\s*)?oblique/i,
    label: '腹外斜肌 (External Oblique)',
  },
  {
    key: 'internal_oblique',
    regex: /internal\s*(abdominal\s*)?oblique/i,
    label: '腹內斜肌 (Internal Oblique)',
  },
  {
    key: 'transversus_abdominis',
    regex: /transversus\s*abdominis|transverse\s*abdominal/i,
    label: '腹橫肌與深層核心 (Transversus Abdominis)',
  },
  {
    key: 'serratus_anterior',
    regex: /serratus\s*anterior/i,
    label: '前鋸肌/鯊魚線 (Serratus Anterior)',
  },
  {
    key: 'abs',
    regex: /\b(linea\s*alba|abdominal\s*wall)\b/i,
    label: '核心肌群 (Core & Abs)',
  },

  // -------------------------
  // 5. 背部與斜方肌細分
  // -------------------------
  {
    key: 'trapezius_upper',
    regex: /descending.*trapezius|upper.*trapezius/i,
    label: '上斜方肌 (Upper Trapezius)',
  },
  {
    key: 'trapezius_middle_lower',
    regex: /transverse.*trapezius|ascending.*trapezius|rhomboid/i,
    label: '中下斜方肌與菱形肌 (Mid/Lower Traps & Rhomboids)',
  },
  {
    key: 'lats',
    regex: /latissimus\s*dorsi/i,
    label: '背闊肌 (Latissimus Dorsi)',
  },
  {
    key: 'back',
    regex: /infraspinatus|teres\s*major|teres\s*minor|longissimus|iliocostalis|semispinalis|spinalis|erector\s*spinae|thoracolumbar/i,
    label: '背部與豎脊肌群 (Back & Spine)',
  },

  // -------------------------
  // 6. 手臂肌群細分 (二頭 / 三頭 / 肱肌 / 前臂肌群)
  // -------------------------
  {
    key: 'biceps_long_head',
    regex: /long\s*head.*biceps\s*brachii/i,
    label: '肱二頭肌長頭 (Biceps Long Head)',
  },
  {
    key: 'biceps_short_head',
    regex: /short\s*head.*biceps\s*brachii/i,
    label: '肱二頭肌短頭 (Biceps Short Head)',
  },
  {
    key: 'brachialis',
    regex: /\bbrachialis\b|coracobrachialis/i,
    label: '肱肌 (Brachialis)',
  },
  {
    key: 'biceps',
    regex: /biceps\s*brachii/i,
    label: '肱二頭肌 (Biceps)',
  },

  // -------------------------
  // 6.1 前臂四分化肌群
  // -------------------------
  {
    key: 'brachioradialis',
    regex: /brachioradialis/i,
    label: '肱橈肌 (Brachioradialis)',
  },
  {
    key: 'forearm_pronators_supinators',
    regex: /pronator|supinator/i,
    label: '旋前與旋後肌群 (Pronators & Supinators)',
  },
  {
    key: 'forearm_flexors',
    regex: /flexor\s*carpi|flexor\s*digitorum(?!\s*(?:longus|brevis))|flexor\s*pollicis|palmaris\s*longus|palmaris/i,
    label: '前臂屈肌群 (Forearm Flexors)',
  },
  {
    key: 'forearm_extensors',
    regex: /extensor\s*carpi|extensor\s*digitorum(?!\s*(?:longus|brevis))|extensor\s*pollicis|extensor\s*indicis|extensor\s*digiti(?!\s*pedis)|abductor\s*pollicis\s*longus/i,
    label: '前臂伸肌群 (Forearm Extensors)',
  },
  {
    key: 'forearms',
    regex: /antebrachial|forearm|lumbrical|interossei|abductor\s*digiti\s*minimi\s*of\s*hand|abductor\s*pollicis\s*brevis/i,
    label: '前臂肌群整體 (Forearms)',
  },
  {
    key: 'triceps_long_head',
    regex: /long\s*head.*triceps\s*brachii/i,
    label: '肱三頭肌長頭 (Triceps Long Head)',
  },
  {
    key: 'triceps_lateral_head',
    regex: /lateral\s*head.*triceps\s*brachii/i,
    label: '肱三頭肌外側頭 (Triceps Lateral Head)',
  },
  {
    key: 'triceps_medial_head',
    regex: /medial\s*head.*triceps\s*brachii/i,
    label: '肱三頭肌內側頭 (Triceps Medial Head)',
  },
  {
    key: 'triceps',
    regex: /triceps\s*brachii|anconeus/i,
    label: '肱三頭肌 (Triceps)',
  },

  // -------------------------
  // 7. 臀部與股四頭肌細分
  // -------------------------
  {
    key: 'glutes_maximus',
    regex: /gluteus\s*maximus/i,
    label: '臀大肌 (Gluteus Maximus)',
  },
  {
    key: 'glutes_medius',
    regex: /gluteus\s*medius|gluteus\s*minimus|tensor\s*fasciae\s*latae/i,
    label: '臀中肌與外展群 (Gluteus Medius)',
  },
  {
    key: 'glutes',
    regex: /gluteus/i,
    label: '臀部肌群 (Glutes)',
  },
  {
    key: 'adductors',
    regex: /adductor\s*(longus|brevis|magnus|minimus)|gracilis|pectineus/i,
    label: '內收肌群 (Adductor Group)',
  },
  {
    key: 'quads',
    regex: /rectus\s*femoris|vastus\s*(lateralis|medialis|intermedius)|quadriceps|sartorius/i,
    label: '股四頭肌群 (Quadriceps)',
  },
];

/**
 * 肌群階層與關聯字典
 * 用於點選/懸停大肌群時連帶高亮所有子肌束，以及點選子肌束時連帶高亮整體節點
 */
export const MUSCLE_PARENT_MAP: Record<string, MuscleGroupKey[]> = {
  chest: ['chest', 'chest_clavicular', 'chest_sternocostal', 'chest_minor'],
  back: ['back', 'trapezius_upper', 'trapezius_middle_lower', 'lats'],
  shoulders: ['shoulders', 'deltoid_anterior', 'deltoid_lateral', 'deltoid_posterior'],
  biceps: ['biceps', 'biceps_long_head', 'biceps_short_head', 'brachialis'],
  triceps: ['triceps', 'triceps_long_head', 'triceps_lateral_head', 'triceps_medial_head'],
  forearms: [
    'forearms',
    'brachioradialis',
    'forearm_flexors',
    'forearm_extensors',
    'forearm_pronators_supinators',
  ],
  abs: [
    'abs',
    'rectus_abdominis',
    'rectus_abdominis_upper',
    'rectus_abdominis_lower',
    'external_oblique',
    'internal_oblique',
    'transversus_abdominis',
    'serratus_anterior',
  ],
  quads: ['quads'],
  adductors: ['adductors'],
  glutes: ['glutes', 'glutes_maximus', 'glutes_medius'],
  hamstrings: ['hamstrings'],
  tibialis_anterior: ['tibialis_anterior'],
  gastrocnemius: ['gastrocnemius'],
  soleus: ['soleus'],
  fibularis: ['fibularis'],
};

/**
 * 檢查 Mesh 的肌群 Key 是否與當前激活用戶狀態 (選中/懸停) 匹配
 */
export function isMuscleGroupMatched(
  meshKey: MuscleGroupKey | null,
  activeKey: MuscleGroupKey | null
): boolean {
  if (!meshKey || !activeKey) return false;
  if (meshKey === activeKey) return true;

  // 1. 若當前激活為大肌群（如 chest），則該大肌群底下的細分子束皆高亮
  const subKeys = MUSCLE_PARENT_MAP[activeKey];
  if (subKeys && subKeys.includes(meshKey)) {
    return true;
  }

  // 2. 若 Mesh 自身為大肌群整體節點（如 chest），而當前激活為其細分子束（如 chest_clavicular）
  for (const [parent, children] of Object.entries(MUSCLE_PARENT_MAP)) {
    if (children.includes(activeKey) && meshKey === parent) {
      return true;
    }
  }

  return false;
}

/**
 * 依據網格名稱進行模糊解析
 * @param meshName 3D 模型中的 Mesh / Node 名稱
 * @returns 對應之 MuscleGroupKey 或 null
 */
export function identifyMuscleGroup(meshName: string): MuscleGroupKey | null {
  if (!meshName) return null;
  const cleanName = meshName.trim();

  // 若為單純包覆筋膜，不當作主發力肌群本體
  if (isFasciaNode(cleanName)) {
    return null;
  }

  for (const rule of MESH_MATCH_RULES) {
    if (rule.regex.test(cleanName)) {
      return rule.key;
    }
  }

  return null;
}
