import { MuscleGroupKey, MuscleGroupInfo } from '../types/muscle';

export const MUSCLES_DATA: Record<MuscleGroupKey, MuscleGroupInfo> = {
  chest: {
    key: 'chest',
    name: '胸大肌',
    nameEn: 'Chest',
    latinName: 'Musculus Pectoralis Major',
    split: 'push',
    functionSummary: '負責手臂內收 (Adduction)、水平內收、內旋以及肩關節屈曲（鎖骨端）。為推類動作的主要原動力。',
    originInsertion: '起點：鎖骨內側半、胸骨柄及體部、第 1~6 肋軟骨。止點：肱骨大結節嵴。',
    cameraFocus: {
      target: [0, 1.25, 0],
      position: [0, 1.35, 1.3],
    },
    themeColor: '#06b6d4',
    exercises: [
      {
        id: 'ex-bench-press',
        name: '槓鈴平板臥推',
        nameEn: 'Barbell Bench Press',
        type: '複合動作 (Compound)',
        equipment: '槓鈴 Barbell',
        difficulty: '中階 Intermediate',
        description: '發展胸大肌胸肋部（中下胸）力量與厚度的核心黃金動作，同時高度徵召前三角肌與肱三頭肌。',
        cues: [
          '肩胛骨後收並下沉，鎖定在臥推凳上形成堅實支撐平台',
          '手腕垂直對齊前臂，落點位於乳頭下緣連線',
          '下放時吸氣吸滿胸腔蓄力，推起時呼氣並意念由雙手肘向內夾緊胸大肌',
        ],
        precautions: [
          '避免手肘過度外展達 90 度，應維持與軀幹夾角約 45~75 度以保護旋轉肌袖',
          '槓鈴切忌撞擊胸骨借力彈起，下落需維持離心張力',
        ],
        tags: ['推力基石', '胸肌整體厚度', '神經發力激發'],
      },
      {
        id: 'ex-incline-dumbbell-press',
        name: '上斜啞鈴臥推',
        nameEn: 'Incline Dumbbell Press',
        type: '複合動作 (Compound)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '中階 Intermediate',
        description: '針對胸大肌鎖骨部（上胸）施加高張力刺激，改善胸肌飽滿度與輪廓立體感。',
        cues: [
          '調整椅背角度在 30~45 度之間，角度過高易使三角肌前束過度代償',
          '底端維持深層拉伸感，推舉頂部向內合攏但避免啞鈴撞擊發聲',
          '核心緊繃，雙腳全腳掌踩實地面傳遞地面反作用力',
        ],
        precautions: [
          '過度弓背會使上斜角度趨近於平板，失去上胸孤立效果',
          '重量選擇應優先確保頂部擠壓與底端活動度',
        ],
        tags: ['上胸強化', '肩部穩定', '啞鈴自由度'],
      },
      {
        id: 'ex-cable-crossover',
        name: '滑輪高位夾胸',
        nameEn: 'Cable Fly / Crossover',
        type: '孤立動作 (Isolation)',
        equipment: '滑輪 Cable',
        difficulty: '入門 Beginner',
        description: '利用滑輪繩索的恆定張力，在全程中持續刺激胸大肌內側與下緣線條。',
        cues: [
          '身體微前傾，手肘微屈並維持鎖定角度',
          '以擁抱大樹的環抱軌跡向身體中下方擠壓',
          '頂峰收縮時停頓 1~2 秒，專注胸肌內側中縫發力擠壓',
        ],
        precautions: [
          '避免肩關節過度過伸（超過身體後方平面過多）造成關節前側囊拉扯',
        ],
        tags: ['胸肌泵感', '持續張力', '線條修飾'],
      },
    ],
  },

  back: {
    key: 'back',
    name: '背闊肌與上背群',
    nameEn: 'Back (Lats & Traps)',
    latinName: 'Musculus Latissimus Dorsi & Trapezius',
    split: 'pull',
    functionSummary: '負責肩關節伸展、內收與內旋；肩胛骨後收與下壓。是打造 V 型倒三角身材與脊柱抗屈穩定的關鍵。',
    originInsertion: '背闊肌起於第 7~12 胸椎棘突、胸腰筋膜、髂嵴；止於肱骨小結節嵴。斜方肌覆蓋頸背部。',
    cameraFocus: {
      target: [0, 1.15, 0],
      position: [0, 1.25, -1.6],
    },
    themeColor: '#3b82f6',
    exercises: [
      {
        id: 'ex-pullup',
        name: '引體向上',
        nameEn: 'Pull-up',
        type: '複合動作 (Compound)',
        equipment: '自重 Bodyweight',
        difficulty: '進階 Advanced',
        description: '自重訓練之王，全面建構背闊肌寬度、菱形肌、大圓肌及二頭肌握力。',
        cues: [
          '雙手握距略寬於肩，懸吊時先主動下沉肩胛骨啟動背肌',
          '意念將手肘直接往後腰與髖骨方向驅動，而非死力用手臂拉',
          '挺胸使鎖骨迎向單槓，頂部保持下巴過槓且背部充分縮短',
        ],
        precautions: [
          '避免身體大幅前後擺盪藉力，若肌力不足可使用彈力帶輔助或器械引體',
        ],
        tags: ['V型倒三角', '背闊肌寬度', '引導力量指標'],
      },
      {
        id: 'ex-barbell-row',
        name: '俯身槓鈴划船',
        nameEn: 'Bent-Over Barbell Row',
        type: '複合動作 (Compound)',
        equipment: '槓鈴 Barbell',
        difficulty: '進階 Advanced',
        description: '增厚整體背部厚度、中下斜方肌、菱形肌與豎脊肌靜態支撐的經典槓鈴動作。',
        cues: [
          '鉸鏈髖部後推，脊柱保持自然中立生理彎曲，軀幹約與地面呈 45 度角',
          '沿大腿滑向肚臍與下腹方向拉動，手肘貼近軀幹兩側後收',
          '拉至頂點時用力收縮肩胛骨，離心下放感受背闊肌被拉長',
        ],
        precautions: [
          '下背切勿圓背屈曲，大重量需戴腰帶並確保核心腹壓飽滿',
        ],
        tags: ['背部厚度', '後鏈核心', '全身協調性'],
      },
      {
        id: 'ex-lat-pulldown',
        name: '滑輪下拉',
        nameEn: 'Lat Pulldown',
        type: '複合動作 (Compound)',
        equipment: '滑輪 Cable',
        difficulty: '入門 Beginner',
        description: '精準掌控背闊肌發力的最佳初學者與肌肥大累積動作。',
        cues: [
          '膝蓋卡緊擋墊，身體微後傾 10~15 度',
          '拉動槓桿至鎖骨或上胸，手肘指向地面垂直向下',
          '放回時充分讓背闊肌拉伸展開，但保持肩胛骨控制勿脫位',
        ],
        precautions: [
          '切忌進行頸後下拉，頸後下拉易對頸椎與肩袖造成危險剪切力',
        ],
        tags: ['背肌念動一致', '新手友好', '容量累積'],
      },
    ],
  },

  shoulders: {
    key: 'shoulders',
    name: '三角肌 (前/中/後束)',
    nameEn: 'Shoulders (Deltoids)',
    latinName: 'Musculus Deltoideus',
    split: 'push',
    functionSummary: '前束負責肩屈曲、中束負責肩外展（打造球型肩寬）、後束負責肩水平外展。三束協同主導肩關節全方位運動。',
    originInsertion: '前束起於鎖骨外側 1/3；中束起於肩峰；後束起於肩胛岡。共同止於肱骨三角肌粗隆。',
    cameraFocus: {
      target: [0, 1.35, 0],
      position: [0, 1.45, 1.3],
    },
    themeColor: '#8b5cf6',
    exercises: [
      {
        id: 'ex-overhead-press',
        name: '站姿槓鈴肩推 (OHP)',
        nameEn: 'Overhead Press',
        type: '複合動作 (Compound)',
        equipment: '槓鈴 Barbell',
        difficulty: '進階 Advanced',
        description: '全身性的垂直推力指標動作，鍛鍊三角肌前束、斜方肌、三頭肌與核心穩定。',
        cues: [
          '雙手握距略寬於肩，前臂垂直於地面，槓鈴起始於鎖骨上方',
          '臀部收緊、腹肌繃緊，槓鈴直線推起時頭部微後仰避讓',
          '槓鈴過頭頂後頭部自然回正，於頂部完全鎖定並聳肩保護關節',
        ],
        precautions: [
          '嚴禁過度反弓腰椎借力，核心若無法維持直立應減輕重量',
        ],
        tags: ['垂直推力', '肩部維度', '核心立體支撐'],
      },
      {
        id: 'ex-lateral-raise',
        name: '啞鈴側平舉',
        nameEn: 'Dumbbell Lateral Raise',
        type: '孤立動作 (Isolation)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '中階 Intermediate',
        description: '孤立刺激三角肌中束的最有效動作，打造視覺上最直接的肩部寬度。',
        cues: [
          '軀幹微前傾 5~10 度，手肘微屈呈固定弧度',
          '由手肘引導向身體兩側斜前方 30 度（肩胛骨平面）抬起至水平位置',
          '頂峰下落時強調 2~3 秒慢速離心放落',
        ],
        precautions: [
          '切勿用斜方肌劇烈聳肩或身體擺動甩動啞鈴',
        ],
        tags: ['球形肩部', '肩寬塑造', '頂峰離心'],
      },
      {
        id: 'ex-face-pull',
        name: '繩索面拉',
        nameEn: 'Cable Face Pull',
        type: '孤立動作 (Isolation)',
        equipment: '滑輪 Cable',
        difficulty: '入門 Beginner',
        description: '改善圓肩駝背體態、平衡三角肌後束與旋轉肌袖健康的必練功能性動作。',
        cues: [
          '滑輪設定與眼睛等高，雙手握緊繩索兩端',
          '向面部後拉同時伴隨肩外旋動作，想像展示肱二頭肌姿勢',
          '在額頭兩側展開雙手，專注後束與菱形肌夾緊感',
        ],
        precautions: [
          '避免下巴前凸代償，保持頸椎自然對齊',
        ],
        tags: ['體態校正', '肩袖健康', '三角肌後束'],
      },
    ],
  },

  biceps: {
    key: 'biceps',
    name: '肱二頭肌',
    nameEn: 'Biceps Brachii',
    latinName: 'Musculus Biceps Brachii',
    split: 'pull',
    functionSummary: '主要功能為前臂屈曲（彎舉）與前臂旋後（外旋）。長頭跨越肩關節參與微弱肩屈，短頭主管內側維度。',
    originInsertion: '長頭起於肩胛骨盂上結節；短頭起於喙突。止於橈骨粗隆及前臂筋膜。',
    cameraFocus: {
      target: [0.35, 1.15, 0],
      position: [0.75, 1.2, 1.1],
    },
    themeColor: '#10b981',
    exercises: [
      {
        id: 'ex-barbell-curl',
        name: '站姿槓鈴彎舉',
        nameEn: 'Barbell Curl',
        type: '孤立動作 (Isolation)',
        equipment: '槓鈴 Barbell',
        difficulty: '入門 Beginner',
        description: '累積手臂肌肥大超負荷的最經典彎舉動作，全面覆蓋二頭肌長短頭。',
        cues: [
          '手肘固定於身體兩側肋骨旁，避免大幅向前漂移',
          '手腕保持中立挺直，避免手腕過度屈曲搶走二頭肌張力',
          '彎舉至胸前頂峰時主動向內旋緊二頭肌肌峰',
        ],
        precautions: [
          '軀幹切忌前後猛烈甩動借力，離心下放應充分伸直手臂',
        ],
        tags: ['手臂厚度', '肌峰爆發', '經典彎舉'],
      },
      {
        id: 'ex-incline-dumbbell-curl',
        name: '上斜仰臥啞鈴彎舉',
        nameEn: 'Incline Dumbbell Curl',
        type: '孤立動作 (Isolation)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '中階 Intermediate',
        description: '藉由肩關節過伸角度使二頭肌長頭處於極致被動拉伸位，打破長頭生長平台期。',
        cues: [
          '仰臥於 45~60 度斜凳上，雙臂自然垂直下垂',
          '自最底端開始彎舉，上升過程伴隨前臂向外旋轉',
          '在頂部進行頂峰擠壓，回程慢速感受深層肌纖維拉扯',
        ],
        precautions: [
          '肩前側若有緊繃疼痛，應調高椅背角度縮小肩伸展幅度',
        ],
        tags: ['長頭極限拉伸', '肌峰孤立', '高張力長度'],
      },
    ],
  },

  triceps: {
    key: 'triceps',
    name: '肱三頭肌',
    nameEn: 'Triceps Brachii',
    latinName: 'Musculus Triceps Brachii',
    split: 'push',
    functionSummary: '主要功能為伸展肘關節。長頭跨越肩關節，兼具肩關節內收與伸展輔助功能。佔據大臂 60% 以上體積。',
    originInsertion: '長頭起於肩胛骨盂下結節；外側頭與內側頭起於肱骨背面。止於尺骨鷹嘴。',
    cameraFocus: {
      target: [-0.35, 1.15, 0],
      position: [-0.75, 1.2, -1.1],
    },
    themeColor: '#ec4899',
    exercises: [
      {
        id: 'ex-tricep-pushdown',
        name: '繩索三頭下壓',
        nameEn: 'Cable Tricep Pushdown',
        type: '孤立動作 (Isolation)',
        equipment: '滑輪 Cable',
        difficulty: '入門 Beginner',
        description: '鎖定三頭肌外側頭與內側頭的黃金雕塑動作，提供全程平順恆定的阻力曲線。',
        cues: [
          '大臂緊貼身體兩側如釘死一般，僅以手肘為軸心做屈伸',
          '下壓至底端時將繩索兩端向外撕開分開，最大化收縮外側頭',
          '回放至手肘呈 90 度，保持三頭肌不失張力',
        ],
        precautions: [
          '手肘切勿大幅前後晃動或利用體重下壓借力',
        ],
        tags: ['外側頭刻畫', '手肘健康', '泵感炸裂'],
      },
      {
        id: 'ex-skull-crushers',
        name: '仰臥槓鈴臂屈伸 (碎顱者)',
        nameEn: 'Lying Triceps Extension (Skull Crusher)',
        type: '孤立動作 (Isolation)',
        equipment: '槓鈴 Barbell',
        difficulty: '中階 Intermediate',
        description: '重點發展肱三頭肌長頭質量的強力動作，塑造大臂後側飽滿度。',
        cues: [
          '平躺於平凳，雙手握曲槓垂直伸展，大臂微向頭頂後傾 15 度以維持起始張力',
          '彎曲手肘將槓鈴緩慢降至額頭上方或頭頂後緣',
          '伸直手肘推起，保持手肘間距穩定不外展打開',
        ],
        precautions: [
          '注意手滑風險與手肘穩定性，手肘關節不適者可改用啞鈴對握',
        ],
        tags: ['長頭增粗', '大臂臂圍', '機械張力'],
      },
    ],
  },

  abs: {
    key: 'abs',
    name: '腹直肌與核心',
    nameEn: 'Abs & Core',
    latinName: 'Musculus Rectus Abdominis & Obliques',
    split: 'core',
    functionSummary: '負責脊柱屈曲（捲腹）、骨盆後傾、腹壓維持與抗旋轉/抗側屈穩定。為傳導力量的軀幹中樞。',
    originInsertion: '起點：恥骨聯合和恥骨嵴。止點：第 5~7 肋軟骨及胸骨劍突。',
    cameraFocus: {
      target: [0, 0.95, 0],
      position: [0, 1.0, 1.25],
    },
    themeColor: '#f59e0b',
    exercises: [
      {
        id: 'ex-hanging-leg-raise',
        name: '懸垂舉腿',
        nameEn: 'Hanging Leg Raise',
        type: '複合動作 (Compound)',
        equipment: '自重 Bodyweight',
        difficulty: '進階 Advanced',
        description: '鍛鍊下腹部與整段腹直肌的高強度動作，結合骨盆後傾捲動以深度收縮。',
        cues: [
          '懸吊於單槓，肩胛收緊穩定身體避免前後晃動',
          '並非單純抬起雙腿，而是意念以腹肌將骨盆朝胸部向上捲起',
          '頂部吐盡空氣停頓，下放時維持 3 秒控制避免借力下落',
        ],
        precautions: [
          '若僅動髖部抬腿，會大量由髂腰肌代償而使下背痠痛',
        ],
        tags: ['下腹殺手', '骨盆後傾掌控', '懸垂握力'],
      },
      {
        id: 'ex-cable-crunch',
        name: '繩索跪姿捲腹',
        nameEn: 'Cable Kneeling Crunch',
        type: '孤立動作 (Isolation)',
        equipment: '滑輪 Cable',
        difficulty: '入門 Beginner',
        description: '允許逐漸增加負重阻力的腹肌增肌動作，實現腹肌塊狀立體感。',
        cues: [
          '跪於高位滑輪下方，手握繩索置於耳朵兩側',
          '固定髖關節角度，單純以胸骨向骨盆貼近做脊柱屈曲捲動',
          '低頭看肚臍，腹肌用力擠壓吐氣',
        ],
        precautions: [
          '切忌透過髖關節向後坐下借力，臀部應維持在膝蓋上方不動',
        ],
        tags: ['六塊肌雕刻', '可調節負重', '純粹脊柱屈曲'],
      },
    ],
  },

  quads: {
    key: 'quads',
    name: '股四頭肌',
    nameEn: 'Quadriceps',
    latinName: 'Musculus Quadriceps Femoris',
    split: 'legs',
    functionSummary: '人體最大最有力的肌群之一，主要負責伸展膝關節，股直肌兼具屈髖功能。是站立、奔跑、深蹲的核心發力源。',
    originInsertion: '股直肌起於髂前下棘；股內側/外側/中間肌起於股骨體。共同匯聚於髕骨並藉髕韌帶止於脛骨粗隆。',
    cameraFocus: {
      target: [0, 0.55, 0],
      position: [0, 0.6, 1.45],
    },
    themeColor: '#14b8a6',
    exercises: [
      {
        id: 'ex-barbell-squat',
        name: '槓鈴深蹲',
        nameEn: 'Barbell Back Squat',
        type: '複合動作 (Compound)',
        equipment: '槓鈴 Barbell',
        difficulty: '進階 Advanced',
        description: '下肢重訓皇冠動作，全面刺激股四頭肌、臀大肌、內收肌群與全身軀幹剛性。',
        cues: [
          '槓鈴平穩架在斜方肌上，雙腳與肩同寬，腳尖自然外展 15~30 度',
          '核心腹壓充滿 360 度環狀支撐，同時下沉髖部與屈膝',
          '下蹲至髖關節折痕低於膝蓋上緣（達到深蹲深度），膝蓋朝腳尖方向展開',
          '全腳掌發力推離地面，保持胸口向上挺立上升',
        ],
        precautions: [
          '下蹲底端切勿出現骨盆眨眼（腰椎屈曲屁股下捲）造成椎間盤高壓',
          '膝蓋切勿內扣（Valgus Collapse）造成內側副韌帶負擔',
        ],
        tags: ['下肢動力樞紐', '荷爾蒙分泌刺激', '力量黃金三項'],
      },
      {
        id: 'ex-leg-press',
        name: '倒蹬推腿機',
        nameEn: '45-Degree Leg Press',
        type: '複合動作 (Compound)',
        equipment: '器械 Machine',
        difficulty: '中階 Intermediate',
        description: '在消除脊柱垂直軸向壓力的情況下，安全對股四頭肌施加高容量力竭刺激。',
        cues: [
          '背部與臀部牢牢貼緊靠墊，手抓握兩側把手鎖死軀幹',
          '雙腳置於踏板中下部可大幅強化股四頭肌孤立受力',
          '下放至膝蓋呈 90 度深層拉伸，推回時膝蓋保持微屈切勿完全反向超伸鎖死',
        ],
        precautions: [
          '推至頂端嚴禁膝關節過度過伸鎖死，否則極度危險可能導致膝蓋反折',
        ],
        tags: ['安全大重量', '股四頭肌爆發', '免除脊柱壓力'],
      },
    ],
  },

  hamstrings: {
    key: 'hamstrings',
    name: '腿後肌群 (膕繩肌)',
    nameEn: 'Hamstrings',
    latinName: 'Musculi Ischiocrurales',
    split: 'legs',
    functionSummary: '跨越髖與膝兩大關節，主要負責伸展髖關節（後踢）與屈曲膝關節。是爆發力衝刺與保護膝蓋前十字韌帶的關鍵。',
    originInsertion: '多起於坐骨結節；股二頭肌止於腓骨頭，半腱肌半膜肌止於脛骨內側。',
    cameraFocus: {
      target: [0, 0.5, 0],
      position: [0, 0.55, -1.45],
    },
    themeColor: '#f97316',
    exercises: [
      {
        id: 'ex-rdl',
        name: '羅馬尼亞硬舉 (RDL)',
        nameEn: 'Romanian Deadlift',
        type: '複合動作 (Compound)',
        equipment: '槓鈴 Barbell',
        difficulty: '進階 Advanced',
        description: '藉由髖鉸鏈機制對腿後肌群施加極強離心拉伸張力的肌肥大神級動作。',
        cues: [
          '膝蓋微屈並全程維持固定角度，動作完全由髖部向後推啟動',
          '槓鈴貼著大腿與小腿下移，想像屁股要去觸碰身後的牆壁',
          '下放到大腿後側感受到極大拉緊感（通常在膝蓋下方），隨後臀大肌與腿後主動發力推髖回正',
        ],
        precautions: [
          '背部切勿拱起圓背，視線平視斜下方保持頸椎中立',
        ],
        tags: ['後側鏈強效拉伸', '髖鉸鏈典範', '運動表現提升'],
      },
      {
        id: 'ex-lying-leg-curl',
        name: '俯臥腿彎舉',
        nameEn: 'Lying Leg Curl',
        type: '孤立動作 (Isolation)',
        equipment: '器械 Machine',
        difficulty: '入門 Beginner',
        description: '純粹由膝關節屈曲主導孤立膕繩肌，彌補髖鉸鏈動作對膝屈曲功能的不足。',
        cues: [
          '俯臥固定墊上，骨盆貼緊靠墊避免骨盆前傾翹起',
          '腳踝墊置於阿基里斯腱上方，腳尖勾起，主動收縮向臀部彎曲',
          '頂部停頓 1 秒，緩慢有控制地放回起始位置',
        ],
        precautions: [
          '避免利用下背腰椎代償拱起帶動滾輪',
        ],
        tags: ['膝關節屈曲', '膕繩肌孤立', '前交叉韌帶保護'],
      },
    ],
  },

  glutes: {
    key: 'glutes',
    name: '臀大肌與臀部肌群',
    nameEn: 'Glutes',
    latinName: 'Musculus Gluteus Maximus & Medius',
    split: 'legs',
    functionSummary: '臀大肌是人體最厚大的單塊肌肉，主管髖伸展與外旋；臀中肌主管骨盆水平穩定與髖外展。',
    originInsertion: '起於髂骨翼外面、骶骨、尾骨背面；止於髂脛束及股骨臀肌粗隆。',
    cameraFocus: {
      target: [0, 0.8, 0],
      position: [0, 0.85, -1.35],
    },
    themeColor: '#e11d48',
    exercises: [
      {
        id: 'ex-hip-thrust',
        name: '槓鈴臀推',
        nameEn: 'Barbell Hip Thrust',
        type: '複合動作 (Compound)',
        equipment: '槓鈴 Barbell',
        difficulty: '中階 Intermediate',
        description: '在臀大肌完全縮短的頂點提供最大水平阻力，是公認臀部肌肥大與峰值力量第一動作。',
        cues: [
          '肩胛骨下角靠在長凳邊緣，槓鈴置於髖部折痕處（需加裝厚海綿墊）',
          '小腿在頂峰時垂直於地面，全腳掌特別是腳後跟用力蹬地',
          '頂端骨盆微後傾夾緊臀部，軀幹從肩膀到膝蓋呈一直線，收下巴平視前方',
        ],
        precautions: [
          '頂部切忌過度挺起腰椎反弓，力量應來自於骨盆後收與臀肌擠壓',
        ],
        tags: ['臀肌極限收縮', '翹臀必備', '無膝蓋壓力'],
      },
      {
        id: 'ex-bulgarian-split-squat',
        name: '保加利亞分腿蹲',
        nameEn: 'Bulgarian Split Squat',
        type: '複合動作 (Compound)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '中階 Intermediate',
        description: '單側非對稱訓練極品動作，深度拉伸臀大肌同時修正雙腿力量不平衡。',
        cues: [
          '後腳背平放於身後長凳上，前腳向前跨出約兩步距離',
          '軀幹微前傾約 15 度可將力線集中至前腳臀部',
          '垂直下蹲至前腿膝蓋約呈 90 度，前腳腳跟發力站起',
        ],
        precautions: [
          '重心切勿落在後腿，後腿僅提供輕微平衡支撐',
        ],
        tags: ['單側平衡', '臀肌深層離心', '穩定肌活化'],
      },
    ],
  },

  calves: {
    key: 'calves',
    name: '小腿肌群',
    nameEn: 'Calves',
    latinName: 'Musculus Gastrocnemius & Soleus',
    split: 'legs',
    functionSummary: '腓腸肌（雙關節）與比目魚肌（單關節）合稱小腿三頭肌，共同負責踝關節跖屈（踮腳尖）與奔跑蹬地推進。',
    originInsertion: '腓腸肌起於股骨內外側髁；比目魚肌起於脛骨和腓骨。共同借阿基里斯腱止於跟骨結節。',
    cameraFocus: {
      target: [0, 0.25, 0],
      position: [0, 0.3, 1.3],
    },
    themeColor: '#6366f1',
    exercises: [
      {
        id: 'ex-standing-calf-raise',
        name: '站姿提踵',
        nameEn: 'Standing Calf Raise',
        type: '孤立動作 (Isolation)',
        equipment: '器械 Machine',
        difficulty: '入門 Beginner',
        description: '在膝關節伸直鎖定狀態下，全力針對腓腸肌雙頭給予最大伸展與收縮。',
        cues: [
          '前腳掌踩在踏板邊緣，膝蓋維持微屈緊繃不彎曲',
          '底端充分下放腳跟感受小腿肌腱深層拉長停頓 1 秒',
          '腳拇指球強力蹬起至最高點踮腳尖，頂峰收縮 1~2 秒',
        ],
        precautions: [
          '避免利用阿基里斯腱彈性快速上下彈跳，需用肌肉主動離心控制',
        ],
        tags: ['腓腸肌立體感', '踝關節剛性', '垂直起跳力'],
      },
      {
        id: 'ex-seated-calf-raise',
        name: '坐姿提踵',
        nameEn: 'Seated Calf Raise',
        type: '孤立動作 (Isolation)',
        equipment: '器械 Machine',
        difficulty: '入門 Beginner',
        description: '屈膝 90 度使腓腸肌處於主動不足放鬆，百分之百孤立鍛鍊深層的比目魚肌。',
        cues: [
          '坐於器械上，護墊壓在大腿下緣靠近膝蓋處',
          '全活動度慢速提踵，專注於小腿外下側厚度感受',
        ],
        precautions: [
          '重量適中，避免腳踝外翻或內翻晃動',
        ],
        tags: ['比目魚肌孤立', '小腿整體厚度', '長跑耐力'],
      },
    ],
  },

  // ==========================================
  // 三角肌細分 (前束 / 中束 / 後束)
  // ==========================================
  deltoid_anterior: {
    key: 'deltoid_anterior',
    name: '三角肌前束',
    nameEn: 'Anterior Deltoid',
    latinName: 'Pars Clavicularis Deltoidei',
    split: 'push',
    functionSummary: '主要負責肩關節屈曲 (Shoulder Flexion) 與水平內收。在肩推、上斜臥推與前平舉中主導發力。若過度發達易導致肌力失衡。',
    originInsertion: '起點：鎖骨外側 1/3 前緣。止點：肱骨三角肌粗隆。',
    cameraFocus: {
      target: [0, 1.35, 0],
      position: [0.35, 1.45, 1.15],
    },
    themeColor: '#f97316',
    exercises: [
      {
        id: 'ex-dumbbell-front-raise',
        name: '啞鈴前平舉',
        nameEn: 'Dumbbell Front Raise',
        type: '孤立動作 (Isolation)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '入門 Beginner',
        description: '直接針對三角肌前束進行孤立向心與離心收縮，強化肩關節屈曲控制力。',
        cues: [
          '手肘微屈鎖死角度，手背朝上或對握向上抬起至視線平齊',
          '頂峰短暫停頓，緩慢 3 秒離心放落',
        ],
        precautions: ['切勿利用腰椎後仰借力甩動啞鈴'],
        tags: ['前束孤立', '肩屈能力', '線條修飾'],
      },
    ],
  },

  deltoid_lateral: {
    key: 'deltoid_lateral',
    name: '三角肌中束',
    nameEn: 'Lateral Deltoid',
    latinName: 'Pars Acromialis Deltoidei',
    split: 'push',
    functionSummary: '主管肩關節外展 (Shoulder Abduction)，是決定「倒三角」正面視覺寬度與球形肩輪廓最核心的單一肌束。',
    originInsertion: '起點：肩峰 (Acromion) 外側緣。止點：肱骨三角肌粗隆。',
    cameraFocus: {
      target: [0, 1.35, 0],
      position: [0.75, 1.4, 0.55],
    },
    themeColor: '#8b5cf6',
    exercises: [
      {
        id: 'ex-lateral-raise-cable',
        name: '滑輪側平舉',
        nameEn: 'Cable Lateral Raise',
        type: '孤立動作 (Isolation)',
        equipment: '滑輪 Cable',
        difficulty: '中階 Intermediate',
        description: '在最底端仍保持持續張力，克服啞鈴側平舉底部無阻力的缺陷，最大化中束肌肥大。',
        cues: [
          '鋼索高度調至手腕或膝蓋水平，沿身體兩側斜前方 30 度外展',
          '意念由手肘引導抬起至水平位置',
        ],
        precautions: ['避免聳起斜方肌代償'],
        tags: ['肩部寬度', '持續張力', '球型外翻'],
      },
    ],
  },

  deltoid_posterior: {
    key: 'deltoid_posterior',
    name: '三角肌後束',
    nameEn: 'Posterior Deltoid',
    latinName: 'Pars Spinalis Deltoidei',
    split: 'pull',
    functionSummary: '主管肩關節水平外展與外旋，負責平衡前束張力、穩定肩胛胸壁關節、改善圓肩駝背體態。常規推類訓練極難練到，必須專項強化。',
    originInsertion: '起點：肩胛岡 (Spine of Scapula) 下緣。止點：肱骨三角肌粗隆。',
    cameraFocus: {
      target: [0, 1.35, 0],
      position: [0.45, 1.4, -1.15],
    },
    themeColor: '#ec4899',
    exercises: [
      {
        id: 'ex-reverse-pec-deck',
        name: '反向蝴蝶機飛鳥',
        nameEn: 'Reverse Pec Deck Fly',
        type: '孤立動作 (Isolation)',
        equipment: '器械 Machine',
        difficulty: '入門 Beginner',
        description: '固定運動軌跡，精準孤立後三角肌，減少菱形肌與背闊肌代償。',
        cues: [
          '胸口緊貼靠墊，座椅高度使手臂與地面平行',
          '微屈手肘，向身體兩側後方平穩展開，專注肩後側擠壓',
        ],
        precautions: ['切勿後縮肩胛骨過多搶走後束張力'],
        tags: ['後束孤立', '圓肩校正', '立體肩背'],
      },
    ],
  },

  // ==========================================
  // 核心肌群細分 (上腹 / 下腹 / 腹外斜肌 / 腹內斜肌 / 腹橫肌 / 前鋸肌)
  // ==========================================
  rectus_abdominis_upper: {
    key: 'rectus_abdominis_upper',
    name: '上腹直肌 (上腹)',
    nameEn: 'Upper Rectus Abdominis',
    latinName: 'Pars Superior Musculi Recti Abdominis',
    split: 'core',
    functionSummary: '主要負責由胸骨劍突向骨盆方向捲動胸椎上段（脊柱屈曲）。在常規捲腹、滑輪跪姿捲腹與上斜捲腹中承受最大張力。',
    originInsertion: '起點：第 5~7 肋軟骨及胸骨劍突。止點：第一及第二腱劃。',
    cameraFocus: {
      target: [0, 1.15, 0],
      position: [0, 1.2, 1.05],
    },
    themeColor: '#f59e0b',
    exercises: [
      {
        id: 'ex-cable-kneeling-crunch',
        name: '滑輪跪姿捲腹',
        nameEn: 'Cable Kneeling Crunch',
        type: '孤立動作 (Isolation)',
        equipment: '滑輪 Cable',
        difficulty: '入門 Beginner',
        description: '以繩索負重鎖定上腹肌群，胸口主動朝肚臍方向捲縮，提供高負荷肌肥大刺激。',
        cues: ['固定髖部不動，低頭將胸口向骨盆內捲，頂峰擠壓上腹 2 秒'],
        precautions: ['臀部切勿後坐借力'],
        tags: ['上腹厚度', '可加重負荷', '脊柱捲曲'],
      },
    ],
  },

  rectus_abdominis_lower: {
    key: 'rectus_abdominis_lower',
    name: '下腹直肌 (下腹)',
    nameEn: 'Lower Rectus Abdominis',
    latinName: 'Pars Inferior Musculi Recti Abdominis',
    split: 'core',
    functionSummary: '負責由骨盆向胸部向上捲動（骨盆後傾控制），是克服髂腰肌代償、雕刻肚臍以下下腹平坦與馬甲線下緣的核心原動力。',
    originInsertion: '起點：第三腱劃以下肌腹。止點：恥骨聯合和恥骨嵴（含錐狀肌）。',
    cameraFocus: {
      target: [0, 0.98, 0],
      position: [0, 1.02, 1.1],
    },
    themeColor: '#f97316',
    exercises: [
      {
        id: 'ex-hanging-leg-raise-lower',
        name: '單槓懸垂舉腿',
        nameEn: 'Hanging Leg Raise',
        type: '複合動作 (Compound)',
        equipment: '自重 Bodyweight',
        difficulty: '進階 Advanced',
        description: '懸掛狀態下主動以骨盆後傾捲動帶起雙腿，極限孤立刺激下腹直肌。',
        cues: ['意念非抬腿，而是將骨盆朝胸部向上捲起，頂部吐盡空氣'],
        precautions: ['避免身體前後甩動擺盪'],
        tags: ['下腹殺手', '骨盆後傾掌控', '下側馬甲線'],
      },
      {
        id: 'ex-reverse-crunch',
        name: '仰臥反向捲腹',
        nameEn: 'Reverse Crunch',
        type: '孤立動作 (Isolation)',
        equipment: '自重 Bodyweight',
        difficulty: '入門 Beginner',
        description: '平躺於地，收緊下腹將臀部與尾椎抬離地面，精準消除大腿代償。',
        cues: ['膝蓋微屈固定，用下腹力量捲起尾椎離地 5~10 公分'],
        precautions: ['切勿用手掌用力推地借力'],
        tags: ['下腹新手推薦', '安全無下背痛'],
      },
    ],
  },

  serratus_anterior: {
    key: 'serratus_anterior',
    name: '前鋸肌 (鯊魚線)',
    nameEn: 'Serratus Anterior',
    latinName: 'Musculus Serratus Anterior',
    split: 'core',
    functionSummary: '如指狀緊扣於胸廓外側肋骨，主管肩胛骨前引 (Protraction)、上迴旋與胸壁貼合。是健美中視覺極具攻擊性的「鯊魚線」，同時保護肩關節不夾擠。',
    originInsertion: '起點：第 1~8 (或 9) 肋骨外側表面。止點：肩胛骨脊柱緣及下角。',
    cameraFocus: {
      target: [0.25, 1.25, 0],
      position: [0.65, 1.3, 0.9],
    },
    themeColor: '#06b6d4',
    exercises: [
      {
        id: 'ex-ab-rollout',
        name: '健腹輪前推 (Ab Rollout)',
        nameEn: 'Ab Wheel Rollout',
        type: '複合動作 (Compound)',
        equipment: '自重 Bodyweight',
        difficulty: '進階 Advanced',
        description: '在前伸極限抗伸展過程中，前鋸肌與整段核心需爆發性支撐，打造雕刻般鯊魚線。',
        cues: ['骨盆維持微後傾，前推時背部微含胸，前鋸肌如爪子般緊抓肋骨穩定'],
        precautions: ['腰部切勿塌陷下墜'],
        tags: ['鯊魚線必練', '極致抗伸展', '肩胛前引'],
      },
    ],
  },

  rectus_abdominis: {
    key: 'rectus_abdominis',
    name: '腹直肌 (六塊肌)',
    nameEn: 'Rectus Abdominis',
    latinName: 'Musculus Rectus Abdominis',
    split: 'core',
    functionSummary: '主管脊柱屈曲（捲腹）與骨盆後傾控制。由 3~4 道腱劃 (Tendinous intersections) 劃分為塊狀肌腹，中間由白線 (Linea alba) 縱向分界。',
    originInsertion: '起點：恥骨聯合和恥骨嵴。止點：第 5~7 肋軟骨及胸骨劍突。',
    cameraFocus: {
      target: [0, 0.98, 0],
      position: [0, 1.05, 1.15],
    },
    themeColor: '#f59e0b',
    exercises: [
      {
        id: 'ex-cable-crunch-ra',
        name: '滑輪跪姿捲腹',
        nameEn: 'Cable Kneeling Crunch',
        type: '孤立動作 (Isolation)',
        equipment: '滑輪 Cable',
        difficulty: '入門 Beginner',
        description: '利用負重阻力針對腹直肌肌腹施加超負荷，打造立體凸出的塊狀腹肌。',
        cues: [
          '固定髖關節，主動以胸骨向骨盆貼近捲動脊柱',
          '全程低頭看肚臍，頂峰吐氣緊繃收縮 2 秒',
        ],
        precautions: ['嚴禁用臀部後坐借力'],
        tags: ['六塊肌刻畫', '可調負重', '脊柱屈曲'],
      },
    ],
  },

  external_oblique: {
    key: 'external_oblique',
    name: '腹外斜肌 (人魚線)',
    nameEn: 'External Oblique',
    latinName: 'Musculus Obliquus Externus Abdominis',
    split: 'core',
    functionSummary: '負責同側側屈、對側軀幹旋轉及穩定骨盆。肌纖維由外上向內下斜行（如手插口袋），構成側腹立體人魚線條。',
    originInsertion: '起點：第 5~12 肋骨外表面。止點：髂嵴、腹股溝韌帶及腹直肌鞘前層。',
    cameraFocus: {
      target: [0, 0.95, 0],
      position: [0.55, 1.0, 1.1],
    },
    themeColor: '#eab308',
    exercises: [
      {
        id: 'ex-hanging-oblique-raise',
        name: '懸垂側向舉腿',
        nameEn: 'Hanging Oblique Knee Raise',
        type: '複合動作 (Compound)',
        equipment: '自重 Bodyweight',
        difficulty: '進階 Advanced',
        description: '在懸垂狀態下旋轉抬腿，對腹外斜肌進行高強度拉伸與向心扭力收縮。',
        cues: [
          '懸垂身體穩定，雙膝朝側上方骨盆肋骨間隙斜向捲起',
          '頂部維持 1 秒擠壓側腹肌肉',
        ],
        precautions: ['避免身體劇烈擺動'],
        tags: ['人魚線', '側向旋轉', '軀幹控制'],
      },
    ],
  },

  internal_oblique: {
    key: 'internal_oblique',
    name: '腹內斜肌',
    nameEn: 'Internal Oblique',
    latinName: 'Musculus Obliquus Internus Abdominis',
    split: 'core',
    functionSummary: '位於外斜肌深層，纖維方向與外斜肌呈十字交錯。負責同側軀幹旋轉與同側側屈，與外斜肌構成對角力偶。',
    originInsertion: '起點：胸腰筋膜、髂嵴及腹股溝韌帶外側。止點：下 3 肋下緣及白線。',
    cameraFocus: {
      target: [0, 0.95, 0],
      position: [-0.55, 1.0, 1.1],
    },
    themeColor: '#d97706',
    exercises: [
      {
        id: 'ex-woodchopper',
        name: '滑輪旋體伐木',
        nameEn: 'Cable Woodchopper',
        type: '複合動作 (Compound)',
        equipment: '滑輪 Cable',
        difficulty: '中階 Intermediate',
        description: '高張力對角線旋轉動作，全面活化腹內外斜肌的力偶傳導。',
        cues: ['髖部帶動軀幹向對側旋轉，手臂維持相對固定伸直'],
        precautions: ['膝蓋微屈順應轉向，保護十字韌帶'],
        tags: ['對角抗旋', '核心爆發力', '功能性訓練'],
      },
    ],
  },

  transversus_abdominis: {
    key: 'transversus_abdominis',
    name: '腹橫肌與深層核心',
    nameEn: 'Transversus Abdominis',
    latinName: 'Musculus Transversus Abdominis',
    split: 'core',
    functionSummary: '人體最深層的天然護腰肌肉，纖維水平環繞腰腹。透過收緊腹腔形成高壓腹內壓 (IAP)，為大重量深蹲硬舉提供堅硬剛性支撐。',
    originInsertion: '起點：下 6 肋軟骨內面、胸腰筋膜、髂嵴。止點：白線及恥骨嵴。',
    cameraFocus: {
      target: [0, 0.95, 0],
      position: [0, 1.0, 1.25],
    },
    themeColor: '#ca8a04',
    exercises: [
      {
        id: 'ex-stomach-vacuum',
        name: '真空收腹 (Vacuum)',
        nameEn: 'Stomach Vacuum',
        type: '孤立動作 (Isolation)',
        equipment: '自重 Bodyweight',
        difficulty: '中階 Intermediate',
        description: '黃金時代健美經典動作，孤立強化腹橫肌，收緊腰圍並建立強大核心剛性。',
        cues: [
          '完全吐空肺部氣體，肚臍向後背與脊柱方向極限內縮並向上提',
          '維持真空收腹狀態正常淺呼吸 15~20 秒',
        ],
        precautions: ['飯後切勿立即練習'],
        tags: ['細腰塑造', '腹內壓建立', '脊柱保護'],
      },
    ],
  },

  // ==========================================
  // 胸部細分
  // ==========================================
  chest_clavicular: {
    key: 'chest_clavicular',
    name: '胸大肌上束 (鎖骨端)',
    nameEn: 'Upper Chest (Clavicular Head)',
    latinName: 'Pars Clavicularis Pectoralis Majoris',
    split: 'push',
    functionSummary: '負責肩屈曲、內收與水平內收。打造胸肌上側與鎖骨下緣的飽滿厚度，改善胸部平坦視覺。',
    originInsertion: '起點：鎖骨內側半前表面。止點：肱骨大結節嵴。',
    cameraFocus: {
      target: [0, 1.3, 0],
      position: [0, 1.4, 1.15],
    },
    themeColor: '#0ea5e9',
    exercises: [],
  },

  chest_sternocostal: {
    key: 'chest_sternocostal',
    name: '胸大肌胸肋部 (中下胸)',
    nameEn: 'Mid/Lower Chest (Sternocostal Head)',
    latinName: 'Pars Sternocostalis Pectoralis Majoris',
    split: 'push',
    functionSummary: '胸大肌最大主體，負責強力的肩關節水平內收與內旋。為平板臥推與雙槓臂屈伸的核心原動力。',
    originInsertion: '起點：胸骨柄及體部、第 1~6 肋軟骨。止點：肱骨大結節嵴。',
    cameraFocus: {
      target: [0, 1.22, 0],
      position: [0, 1.3, 1.2],
    },
    themeColor: '#06b6d4',
    exercises: [],
  },

  chest_minor: {
    key: 'chest_minor',
    name: '胸小肌',
    nameEn: 'Pectoralis Minor',
    latinName: 'Musculus Pectoralis Minor',
    split: 'push',
    functionSummary: '深層肌肉，拉肩胛骨向前下方，輔助深呼吸時提肋。過度緊繃是造成圓肩頭前傾的常見元兇。',
    originInsertion: '起點：第 3~5 肋骨前外側。止點：肩胛骨喙突。',
    cameraFocus: {
      target: [0.15, 1.25, 0],
      position: [0.35, 1.35, 1.1],
    },
    themeColor: '#0891b2',
    exercises: [],
  },

  // ==========================================
  // 背部與斜方肌細分
  // ==========================================
  trapezius_upper: {
    key: 'trapezius_upper',
    name: '上斜方肌',
    nameEn: 'Upper Trapezius',
    latinName: 'Pars Descendens Trapezii',
    split: 'pull',
    functionSummary: '負責肩胛骨上提（聳肩）與上迴旋，協助頭部後仰及側屈。',
    originInsertion: '起於枕外隆凸、項韌帶；止於鎖骨外側 1/3。',
    cameraFocus: {
      target: [0, 1.4, 0],
      position: [0, 1.48, -1.2],
    },
    themeColor: '#6366f1',
    exercises: [],
  },

  trapezius_middle_lower: {
    key: 'trapezius_middle_lower',
    name: '中下斜方肌與菱形肌',
    nameEn: 'Mid/Lower Traps & Rhomboids',
    latinName: 'Pars Transversa & Ascendens Trapezii',
    split: 'pull',
    functionSummary: '負責肩胛骨後收（夾背）、下壓與穩定。是打造厚實背部中縫、挺拔胸腔體態的基石。',
    originInsertion: '起於第 1~12 胸椎棘突；止於肩胛岡及肩峰。',
    cameraFocus: {
      target: [0, 1.25, 0],
      position: [0, 1.3, -1.35],
    },
    themeColor: '#4f46e5',
    exercises: [],
  },

  lats: {
    key: 'lats',
    name: '背闊肌',
    nameEn: 'Latissimus Dorsi',
    latinName: 'Musculus Latissimus Dorsi',
    split: 'pull',
    functionSummary: '人體背部面積最大的肌肉，負責肩伸展、內收與內旋。決定身形寬度與 V 型倒三角翅膀。',
    originInsertion: '起於胸腰筋膜、第 7~12 胸椎及髂嵴；止於肱骨小結節嵴。',
    cameraFocus: {
      target: [0, 1.15, 0],
      position: [0, 1.22, -1.45],
    },
    themeColor: '#3b82f6',
    exercises: [],
  },

  // ==========================================
  // 手臂細分
  // ==========================================
  biceps_long_head: {
    key: 'biceps_long_head',
    name: '肱二頭肌長頭 (外側)',
    nameEn: 'Biceps Long Head',
    latinName: 'Caput Longum Bicipitis Brachii',
    split: 'pull',
    functionSummary: '跨越肩關節，負責前臂屈曲並決定二頭肌肌峰高度 (Biceps Peak)。上斜彎舉時獲得極致拉伸。',
    originInsertion: '起於肩胛骨盂上結節；止於橈骨粗隆。',
    cameraFocus: {
      target: [0.35, 1.15, 0],
      position: [0.75, 1.2, 1.0],
    },
    themeColor: '#10b981',
    exercises: [],
  },

  biceps_short_head: {
    key: 'biceps_short_head',
    name: '肱二頭肌短頭 (內側)',
    nameEn: 'Biceps Short Head',
    latinName: 'Caput Breve Bicipitis Brachii',
    split: 'pull',
    functionSummary: '主管大臂內側厚度與前臂旋後功能。牧師凳彎舉或寬握彎舉時高度徵召。',
    originInsertion: '起於肩胛骨喙突；止於橈骨粗隆。',
    cameraFocus: {
      target: [0.35, 1.15, 0],
      position: [0.65, 1.2, 1.05],
    },
    themeColor: '#059669',
    exercises: [],
  },

  brachialis: {
    key: 'brachialis',
    name: '肱肌與前臂肌群',
    nameEn: 'Brachialis & Forearm',
    latinName: 'Musculus Brachialis',
    split: 'pull',
    functionSummary: '位於二頭肌深層，純粹負責肘屈曲。增粗肱肌能像千斤頂一樣將二頭肌向外推起，顯著增加大臂維度。',
    originInsertion: '起於肱骨下半前表面；止於尺骨粗隆。',
    cameraFocus: {
      target: [0.35, 1.05, 0],
      position: [0.75, 1.1, 0.9],
    },
    themeColor: '#34d399',
    exercises: [],
  },

  triceps_long_head: {
    key: 'triceps_long_head',
    name: '肱三頭肌長頭',
    nameEn: 'Triceps Long Head',
    latinName: 'Caput Longum Tricipitis Brachii',
    split: 'push',
    functionSummary: '唯一跨越肩關節的三頭肌肌束，主管大臂後內側巨大體積。在過頭臂屈伸時處於極佳拉伸長度。',
    originInsertion: '起於肩胛骨盂下結節；止於尺骨鷹嘴。',
    cameraFocus: {
      target: [-0.35, 1.15, 0],
      position: [-0.75, 1.2, -1.0],
    },
    themeColor: '#ec4899',
    exercises: [],
  },

  triceps_lateral_head: {
    key: 'triceps_lateral_head',
    name: '肱三頭肌外側頭 (馬蹄鐵)',
    nameEn: 'Triceps Lateral Head',
    latinName: 'Caput Laterale Tricipitis Brachii',
    split: 'push',
    functionSummary: '主管大臂側面視覺寬度與標誌性的「馬蹄鐵」輪廓。繩索下壓底端旋開時強烈收縮。',
    originInsertion: '起於肱骨後表面橈神經溝外上方；止於尺骨鷹嘴。',
    cameraFocus: {
      target: [-0.35, 1.15, 0],
      position: [-0.75, 1.2, -0.6],
    },
    themeColor: '#f43f5e',
    exercises: [],
  },

  triceps_medial_head: {
    key: 'triceps_medial_head',
    name: '肱三頭肌內側頭',
    nameEn: 'Triceps Medial Head',
    latinName: 'Caput Mediale Tricipitis Brachii',
    split: 'push',
    functionSummary: '位於深層靠近手肘處，為所有肘伸展動作的基礎主動肌，提供肘部關節終端穩定性。',
    originInsertion: '起於肱骨後表面橈神經溝內下方；止於尺骨鷹嘴。',
    cameraFocus: {
      target: [-0.35, 1.08, 0],
      position: [-0.7, 1.12, -0.8],
    },
    themeColor: '#e11d48',
    exercises: [],
  },

  // ==========================================
  // 下肢細分
  // ==========================================
  quads_rectus_femoris: {
    key: 'quads_rectus_femoris',
    name: '股直肌',
    nameEn: 'Rectus Femoris',
    latinName: 'Musculus Rectus Femoris',
    split: 'legs',
    functionSummary: '大腿前側正中央的雙關節肌，同時主管屈髖與伸膝，深蹲與腿屈伸皆強烈徵召。',
    originInsertion: '起於髂前下棘；止於脛骨粗隆。',
    cameraFocus: {
      target: [0, 0.6, 0],
      position: [0, 0.65, 1.35],
    },
    themeColor: '#14b8a6',
    exercises: [],
  },

  quads_vastus_lateralis: {
    key: 'quads_vastus_lateralis',
    name: '股外側肌 (大腿外翻)',
    nameEn: 'Vastus Lateralis',
    latinName: 'Musculus Vastus Lateralis',
    split: 'legs',
    functionSummary: '大腿最大的單塊肌肉，決定大腿外側輪廓的弧度外翻感 (Quad Sweep)。',
    originInsertion: '起於股骨粗線外側唇；止於脛骨粗隆。',
    cameraFocus: {
      target: [0.25, 0.55, 0],
      position: [0.65, 0.6, 1.25],
    },
    themeColor: '#0d9488',
    exercises: [],
  },

  quads_vastus_medialis: {
    key: 'quads_vastus_medialis',
    name: '股內側肌 (水滴肌)',
    nameEn: 'Vastus Medialis',
    latinName: 'Musculus Vastus Medialis (VMO)',
    split: 'legs',
    functionSummary: '膝蓋內上方的水滴形肌肉，主管伸膝最後 15 度鎖定與髕骨軌跡穩定，保護髕股關節。',
    originInsertion: '起於股骨粗線內側唇；止於脛骨粗隆。',
    cameraFocus: {
      target: [0.1, 0.45, 0],
      position: [0.35, 0.5, 1.2],
    },
    themeColor: '#2dd4bf',
    exercises: [],
  },

  glutes_maximus: {
    key: 'glutes_maximus',
    name: '臀大肌',
    nameEn: 'Gluteus Maximus',
    latinName: 'Musculus Gluteus Maximus',
    split: 'legs',
    functionSummary: '人體最強大的單塊肌肉，主管髖關節伸展、外旋與骨盆直立平衡。深蹲、臀推、硬舉主力。',
    originInsertion: '起於髂骨翼外面及骶骨；止於髂脛束及股骨臀肌粗隆。',
    cameraFocus: {
      target: [0, 0.8, 0],
      position: [0, 0.85, -1.35],
    },
    themeColor: '#f43f5e',
    exercises: [],
  },

  glutes_medius: {
    key: 'glutes_medius',
    name: '臀中肌與外展群',
    nameEn: 'Gluteus Medius',
    latinName: 'Musculus Gluteus Medius',
    split: 'legs',
    functionSummary: '主管髖外展與單腿站立時的骨盆水平穩定，防止膝蓋內扣 (Valgus collapse)。',
    originInsertion: '起於髂骨翼外面；止於股骨大轉子。',
    cameraFocus: {
      target: [0.35, 0.85, 0],
      position: [0.75, 0.9, -0.6],
    },
    themeColor: '#fb7185',
    exercises: [],
  },

  // ==========================================
  // 手臂細分 - 前臂肌群 (四分化)
  // ==========================================
  brachioradialis: {
    key: 'brachioradialis',
    name: '肱橈肌',
    nameEn: 'Brachioradialis',
    latinName: 'Musculus Brachioradialis',
    split: 'pull',
    functionSummary: '位於前臂外側（橈側）的最粗壯肌肉。主導中立握（錘式）與反手時的肘關節屈曲，在前臂快速屈伸與大重量拉力時發揮關鍵原動力。',
    originInsertion: '起於肱骨外上髁上方外側脊；止於橈骨莖突底部外側。',
    cameraFocus: {
      target: [0.38, 1.05, 0.05],
      position: [0.72, 1.12, 0.6],
    },
    themeColor: '#0ea5e9',
    exercises: [
      {
        id: 'ex-db-hammer-curl',
        name: '啞鈴錘式彎舉',
        nameEn: 'Dumbbell Hammer Curl',
        type: '孤立動作 (Isolation)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '入門 Beginner',
        description: '雙手保持掌心相對的中立握法，將張力完全聚焦於肱橈肌與肱肌，打造前臂外側厚度。',
        cues: [
          '掌心相對握緊啞鈴，手肘貼緊軀幹兩側鎖定',
          '專注用前臂外側發力帶起啞鈴至胸前，頂峰收縮 1 秒',
          '下放時維持 2~3 秒慢速離心控制，手臂切勿完全卸力',
        ],
        precautions: [
          '避免身體前後擺盪藉力甩動重量，保持軀幹垂直穩定',
        ],
        tags: ['前臂外側厚度', '中立握力', '肱肌連動'],
      },
      {
        id: 'ex-reverse-barbell-curl',
        name: '反向槓鈴彎舉',
        nameEn: 'Reverse Barbell Curl',
        type: '孤立動作 (Isolation)',
        equipment: '槓鈴 Barbell',
        difficulty: '中階 Intermediate',
        description: '正手反握槓鈴進行彎舉，高度孤立肱橈肌並強化前臂伸肌群的靜態支撐力。',
        cues: [
          '雙手正握槓鈴與肩同寬，手腕保持中立挺直',
          '肘部為軸心向上屈臂，頂點擠壓前臂外側肌腹',
          '下放全程控制槓鈴軌跡，對抗重量下墜',
        ],
        precautions: [
          '手腕若感到壓迫，可改用曲柄槓 (EZ-Bar) 提供更符合人體工學的握持角度',
        ],
        tags: ['肱橈肌強化', '前臂維度', '拉力鏈條'],
      },
    ],
  },

  forearm_flexors: {
    key: 'forearm_flexors',
    name: '前臂屈肌群',
    nameEn: 'Forearm Flexors (Wrist & Finger Flexors)',
    latinName: 'Musculi Flexores Antebrachii',
    split: 'pull',
    functionSummary: '位於前臂前側/內側淺深層，包含橈側/尺側屈腕肌、指淺/深屈肌與掌長肌。負責腕關節掌屈、手指握緊與高強度捏握發力。',
    originInsertion: '共同起點於肱骨內上髁（屈肌總腱）及尺橈骨骨幹；止於掌骨底、中節與遠節指骨。',
    cameraFocus: {
      target: [0.32, 0.95, 0.08],
      position: [0.6, 1.0, 0.75],
    },
    themeColor: '#06b6d4',
    exercises: [
      {
        id: 'ex-db-wrist-curl',
        name: '坐姿啞鈴腕彎舉',
        nameEn: 'Seated Dumbbell Wrist Curl',
        type: '孤立動作 (Isolation)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '入門 Beginner',
        description: '前臂平放支撐，純粹進行腕關節掌屈動作，極限泵感累積前臂內側肌腹厚度。',
        cues: [
          '前臂平貼於大腿或板凳，手腕懸空於膝前',
          '反手握啞鈴，下放至指尖微微展開拉伸屈肌',
          '手腕用力向上捲起至最高點，頂峰擠壓 1 秒',
        ],
        precautions: [
          '手腕為精細關節，切忌使用爆發力或盲目加大重量，應以 12~20 次的高容量為主',
        ],
        tags: ['前臂內側', '掌屈肌泵感', '握力基石'],
      },
      {
        id: 'ex-behind-back-wrist-curl',
        name: '站姿槓鈴背後腕彎舉',
        nameEn: 'Behind-the-Back Barbell Wrist Curl',
        type: '孤立動作 (Isolation)',
        equipment: '槓鈴 Barbell',
        difficulty: '中階 Intermediate',
        description: '槓鈴置於身後進行腕彎舉，能在前臂屈肌完全縮短位置提供極致峰值收縮。',
        cues: [
          '雙手身後正握槓鈴，雙臂自然下垂',
          '純靠手指與手腕向上捲動槓鈴，頂點用力緊繃前臂屈肌',
          '緩慢放回起點，維持張力不中斷',
        ],
        precautions: [
          '動作過程肩胛保持微收，避免聳肩代償',
        ],
        tags: ['峰值擠壓', '前臂全維度', '腕部強化'],
      },
    ],
  },

  forearm_extensors: {
    key: 'forearm_extensors',
    name: '前臂伸肌群',
    nameEn: 'Forearm Extensors (Wrist & Finger Extensors)',
    latinName: 'Musculi Extensores Antebrachii',
    split: 'pull',
    functionSummary: '位於前臂後側/背側，包含橈側/尺側伸腕肌、指伸肌、示指/小指伸肌與拇長展肌。主導手腕背伸、張指及動態對抗屈肌拉力，防止網球肘與腕部失衡。',
    originInsertion: '共同起點於肱骨外上髁（伸肌總腱）及骨間膜；止於第 2~5 掌骨底及指背腱膜。',
    cameraFocus: {
      target: [0.35, 0.98, -0.05],
      position: [0.65, 1.05, -0.65],
    },
    themeColor: '#38bdf8',
    exercises: [
      {
        id: 'ex-reverse-wrist-curl',
        name: '反手坐姿腕伸展 (反向腕彎舉)',
        nameEn: 'Reverse Wrist Curl',
        type: '孤立動作 (Isolation)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '入門 Beginner',
        description: '掌心向下進行手腕背伸動作，專注刺激前臂後側伸肌群，平衡前臂前後肌力。',
        cues: [
          '前臂平貼支撐，手腕懸空，掌心朝下握啞鈴',
          '由手腕發力將啞鈴向上背伸抬起，頂點停留擠壓伸肌',
          '下放時抵抗重力緩慢回到中立位',
        ],
        precautions: [
          '伸肌群力量通常小於屈肌群，請使用較輕重量維持完整活動度',
        ],
        tags: ['前臂後側', '腕伸肌群', '關節平衡'],
      },
      {
        id: 'ex-finger-band-extension',
        name: '手指導引彈力帶開展',
        nameEn: 'Finger Band Extension',
        type: '孤立動作 (Isolation)',
        equipment: '器械 Machine',
        difficulty: '入門 Beginner',
        description: '套上彈力圈進行手指對抗阻力的五指張開訓練，強化指伸肌與深層手部小肌群。',
        cues: [
          '五指聚攏套入彈力帶，指節保持微屈',
          '用力將五指向外撐開至最大極限，感受前臂後外側肌群緊繃',
          '慢速收回指尖，保持持續離心張力',
        ],
        precautions: [
          '避免指關節過度過伸鎖死，動作保持平順無衝擊',
        ],
        tags: ['拮抗訓練', '防網球肘', '指伸耐力'],
      },
    ],
  },

  forearm_pronators_supinators: {
    key: 'forearm_pronators_supinators',
    name: '旋前與旋後肌群',
    nameEn: 'Pronators & Supinators',
    latinName: 'Musculi Pronatores et Supinatores',
    split: 'pull',
    functionSummary: '包含旋前圓肌、旋前方肌與旋後肌。主導前臂在掌心朝下（旋前）與掌心朝上（旋後）之間的旋轉扭矩發力，是投擲、格鬥與腕力競技的核心肌群。',
    originInsertion: '起於肱骨內/外上髁、尺骨橈切跡脊；止於橈骨外側面中段及遠端掌面。',
    cameraFocus: {
      target: [0.35, 1.05, 0],
      position: [0.65, 1.15, 0.55],
    },
    themeColor: '#22d3ee',
    exercises: [
      {
        id: 'ex-db-pronation-supination',
        name: '單側啞鈴前臂旋轉 (旋前/旋後)',
        nameEn: 'Dumbbell Forearm Pronation & Supination',
        type: '孤立動作 (Isolation)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '入門 Beginner',
        description: '單手握持單邊負重啞鈴，以前臂中軸為核心進行 180 度內外旋轉，精準強化旋前與旋後肌。',
        cues: [
          '手握單頭負重啞鈴的一端，前臂平置於大腿上支撐',
          '以手肘與前臂為軸心，慢速由掌心朝上向內旋轉至掌心朝下',
          '再由掌心朝下平穩旋後翻回掌心朝上，兩側端點各停頓 1 秒',
        ],
        precautions: [
          '手肘全程保持穩定貼合支撐面，避免以肩部內外旋代償前臂旋轉',
        ],
        tags: ['旋轉扭矩', '腕力強化', '關節防護'],
      },
      {
        id: 'ex-lever-rotation',
        name: '大錘 / 鐵棒力臂旋轉',
        nameEn: 'Sledgehammer Lever Rotations',
        type: '複合動作 (Compound)',
        equipment: '自重 Bodyweight',
        difficulty: '中階 Intermediate',
        description: '利用長力臂槓桿效應，對前臂旋前肌與旋後肌施加漸進式動態扭矩阻力。',
        cues: [
          '手握長棍或大錘握柄底端，手臂呈 90 度屈曲',
          '緩慢控制長柄向內倒下後以旋前肌收縮拉回中立',
          '再向外側倒下以旋後肌拉回，全程強調離心控制',
        ],
        precautions: [
          '依自身能力調整手握位置，握得越靠近重物端力臂越短、難度越低',
        ],
        tags: ['功能性力量', '格鬥腕力', '深層控制'],
      },
    ],
  },

  forearms: {
    key: 'forearms',
    name: '前臂肌群整體',
    nameEn: 'Forearms (Overall)',
    latinName: 'Musculi Antebrachii',
    split: 'pull',
    functionSummary: '包含肱橈肌、前臂屈肌群、前臂伸肌群與旋前旋後肌群。主導手腕屈伸、強大握力 (Grip Strength) 與前臂旋轉，是所有拉類與握持動作的核心傳遞樞紐。',
    originInsertion: '起於肱骨內/外上髁、尺骨橈骨骨幹；止於掌骨、指骨及橈骨莖突。',
    cameraFocus: {
      target: [0.35, 0.98, 0],
      position: [0.65, 1.05, 0.65],
    },
    themeColor: '#06b6d4',
    exercises: [
      {
        id: 'ex-farmers-walk',
        name: '重裝農夫走路',
        nameEn: 'Heavy Farmer\'s Walk',
        type: '複合動作 (Compound)',
        equipment: '啞鈴 Dumbbell',
        difficulty: '進階 Advanced',
        description: '全身性功能訓練之王，以等長收縮模式極限考驗手指抓握耐力、前臂全肌群與斜方肌靜態支撐。',
        cues: [
          '雙手緊握沉重啞鈴或六角槓，肩胛骨下沉後收並挺胸鎖定',
          '核心收緊保持脊柱中立，以平穩均勻步伐向前行走',
          '行走過程避免手臂隨意擺動，全力用意念抓緊握柄',
        ],
        precautions: [
          '避免身體左右晃動或彎腰駝背，若握力耗盡應平穩蹲下放槓而非直接扔下',
        ],
        tags: ['終極握力', '全身核心', '前臂等長耐力'],
      },
    ],
  },
};


