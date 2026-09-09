import { MuscleGroupKey, MeshMatchRule } from '../types/muscle';

/**
 * 判斷節點是否為筋膜 (Fascia)
 * 筋膜在解剖模型中會包覆肌肉外層，若直接填上純色會遮蔽肌纖維與肌肉線條
 */
export function isFasciaNode(nodeName: string): boolean {
  if (!nodeName) return false;
  return /fascia/i.test(nodeName);
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
    regex: /biceps\s*femoris|semitendinosus|semimembranosus|hamstring/i,
    label: '腿後肌群 (Hamstrings)',
  },
  {
    key: 'calves',
    regex: /gastrocnemius|soleus|triceps\s*surae|tibialis|plantaris|calf|calves/i,
    label: '小腿肌群 (Calves)',
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
    regex: /deltoid|deltoideus|shoulder/i,
    label: '三角肌複合 (Shoulders)',
  },

  // -------------------------
  // 3. 核心細分 (腹直肌 / 腹外斜肌 / 腹內斜肌 / 腹橫肌)
  // -------------------------
  {
    key: 'rectus_abdominis',
    regex: /rectus\s*abdominis/i,
    label: '腹直肌 (Rectus Abdominis)',
  },
  {
    key: 'external_oblique',
    regex: /external\s*abdominal\s*oblique/i,
    label: '腹外斜肌 (External Oblique)',
  },
  {
    key: 'internal_oblique',
    regex: /internal\s*abdominal\s*oblique/i,
    label: '腹內斜肌 (Internal Oblique)',
  },
  {
    key: 'transversus_abdominis',
    regex: /transversus\s*abdominis|transverse\s*abdominal/i,
    label: '腹橫肌與深層核心 (Transversus Abdominis)',
  },
  {
    key: 'abs',
    regex: /pyramidalis|linea\s*alba|abdominis|abdom|core/i,
    label: '核心肌群 (Core & Abs)',
  },

  // -------------------------
  // 4. 胸部肌群細分 (上胸 / 中下胸 / 胸小肌)
  // -------------------------
  {
    key: 'chest_clavicular',
    regex: /clavicular.*head.*pectoral|clavicular.*pectoral/i,
    label: '胸大肌上束/鎖骨端 (Upper Chest)',
  },
  {
    key: 'chest_sternocostal',
    regex: /sternocostal.*pectoral|abdominal.*pectoral/i,
    label: '胸大肌胸肋與下緣 (Mid & Lower Chest)',
  },
  {
    key: 'chest_minor',
    regex: /pectoralis\s*minor/i,
    label: '胸小肌 (Pectoralis Minor)',
  },
  {
    key: 'chest',
    regex: /pectoralis|pectoral|chest/i,
    label: '胸大肌整體 (Chest)',
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
    regex: /latissimus\s*dorsi|latissimus/i,
    label: '背闊肌 (Latissimus Dorsi)',
  },
  {
    key: 'back',
    regex: /trapezius|infraspinatus|teres\s*major|teres\s*minor|erector\s*spinae|thoracolumbar|lats|back/i,
    label: '背部肌群 (Back)',
  },

  // -------------------------
  // 6. 手臂肌群細分 (二頭 / 三頭)
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
    regex: /brachialis|brachioradialis|coracobrachialis/i,
    label: '肱肌與前臂肌群 (Brachialis)',
  },
  {
    key: 'biceps',
    regex: /biceps\s*brachii|bicep/i,
    label: '肱二頭肌 (Biceps)',
  },
  {
    key: 'triceps_long_head',
    regex: /long\s*head.*triceps/i,
    label: '肱三頭肌長頭 (Triceps Long Head)',
  },
  {
    key: 'triceps_lateral_head',
    regex: /lateral\s*head.*triceps/i,
    label: '肱三頭肌外側頭 (Triceps Lateral Head)',
  },
  {
    key: 'triceps_medial_head',
    regex: /medial\s*head.*triceps/i,
    label: '肱三頭肌內側頭 (Triceps Medial Head)',
  },
  {
    key: 'triceps',
    regex: /triceps\s*brachii|tricep|anconeus/i,
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
    regex: /glute|buttock/i,
    label: '臀部肌群 (Glutes)',
  },
  {
    key: 'quads_rectus_femoris',
    regex: /rectus\s*femoris/i,
    label: '股直肌 (Rectus Femoris)',
  },
  {
    key: 'quads_vastus_lateralis',
    regex: /vastus\s*lateralis/i,
    label: '股外側肌 (Vastus Lateralis)',
  },
  {
    key: 'quads_vastus_medialis',
    regex: /vastus\s*medialis/i,
    label: '股內側肌 (Vastus Medialis)',
  },
  {
    key: 'quads',
    regex: /vastus\s*intermedius|quadriceps|sartorius|quad/i,
    label: '股四頭肌 (Quads)',
  },
];

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
