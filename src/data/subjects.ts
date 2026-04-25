export interface Section {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  ready?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  sections: Section[];
}

export interface Subject {
  id: string;
  title: string;
  englishTitle: string;
  icon: string;
  color: string;
  accent: string;
  light: string;
  description: string;
  chapters: Chapter[];
}

export const SUBJECTS: Subject[] = [
  {
    id: "physics",
    title: "物理",
    englishTitle: "Physics",
    icon: "⚡",
    color: "#2D9CDB",
    accent: "#1B6FA0",
    light: "#E8F4FD",
    description: "力學、電磁學、光學、熱學、近代物理",
    chapters: [
      {
        id: "ch1",
        title: "第一章　運動學",
        sections: [
          { id: "1-0", title: "運動學快速複習", description: "位移、速度、加速度與運動圖形", tags: ["位移", "速度", "加速度"] },
        ],
      },
      {
        id: "ch4",
        title: "第四章　電與磁",
        sections: [
          { id: "4-0", title: "電路學快速複習", description: "電流、電壓、電阻、電功率，以高速公路比喻串起所有觀念", tags: ["電流", "電壓", "電阻", "歐姆定律"], ready: true },
          { id: "4-1", title: "電流的磁效應", description: "厄司特的發現、磁力線特性、右手螺旋定則、三種磁場公式、安培力", tags: ["磁力線", "右手定則", "安培力", "螺線管"], ready: true },
          { id: "4-2", title: "電磁感應", description: "法拉第實驗、磁通量、法拉第電磁感應定律、冷次定律、變壓器、電力輸送與用電安全", tags: ["磁通量", "法拉第定律", "冷次定律", "變壓器"], ready: true },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    title: "化學",
    englishTitle: "Chemistry",
    icon: "🧪",
    color: "#27AE60",
    accent: "#1A7D44",
    light: "#E3F9EC",
    description: "原子結構、化學鍵、反應式、有機化學",
    chapters: [
      {
        id: "ch1",
        title: "第一章　原子結構",
        sections: [
          { id: "1-0", title: "原子模型與電子排列", description: "從道耳頓到量子模型的演進" },
        ],
      },
    ],
  },
  {
    id: "biology",
    title: "生物",
    englishTitle: "Biology",
    icon: "🧬",
    color: "#9B51E0",
    accent: "#7B3DB5",
    light: "#F3EAFC",
    description: "細胞、遺傳、演化、生態系",
    chapters: [
      {
        id: "ch1",
        title: "第一章　細胞",
        sections: [
          { id: "1-0", title: "細胞的構造與功能", description: "原核細胞、真核細胞的比較與各胞器功能" },
          { id: "1-1", title: "細胞的構造", description: "細胞學說、細胞大小、原核與真核細胞比較、細胞膜、各種胞器詳解", tags: ["細胞學說", "原核細胞", "真核細胞", "細胞膜", "胞器"], ready: true },
        ],
      },
    ],
  },
  {
    id: "earth-science",
    title: "地科",
    englishTitle: "Earth Science",
    icon: "🌍",
    color: "#F2994A",
    accent: "#C47A35",
    light: "#FDF0E2",
    description: "地球構造、板塊、大氣、海洋、天文",
    chapters: [
      {
        id: "ch1",
        title: "第一章　固體地球",
        sections: [
          { id: "1-0", title: "地球內部構造", description: "地殼、地函、地核的特性與探測方法" },
        ],
      },
    ],
  },
  {
    id: "math",
    title: "數學",
    englishTitle: "Mathematics",
    icon: "📐",
    color: "#E2574C",
    accent: "#B33D34",
    light: "#FDE8E7",
    description: "數與式、多項式、機率統計、三角、向量、空間與矩陣",
    chapters: [
      {
        id: "book1",
        title: "第一冊",
        sections: [
          { id: "1-1", title: "第一章 數與式", description: "乘法公式與有理數、根數運算與實數、絕對值、指數與常用對數，已整理成可點開的小節複習版", tags: ["代數", "實數", "對數", "LaTeX"], ready: true },
          { id: "1-2", title: "第二章 多項式函數", description: "多項式的除法、多項式函數、多項不等式", tags: ["多項式", "函數", "不等式"] },
          { id: "1-3", title: "第三章 直線與圓", description: "座標平面與直線方程式、直線方程式的應用、圓方程式、圓與直線的關係", tags: ["座標", "直線", "圓"] },
        ],
      },
      {
        id: "book2",
        title: "第二冊",
        sections: [
          { id: "2-1", title: "第四章 數列與級數", description: "數列與遞迴關係、級數求和", tags: ["數列", "遞迴", "求和"] },
          { id: "2-2", title: "第五章 排列組合與古典機率", description: "邏輯與集合與計數原理、排列、組合與二項式定理、古典機率與期望值", tags: ["計數", "排列組合", "機率"] },
          { id: "2-3", title: "第六章 數據分析", description: "一維數據分析、相關係數與迴歸直線", tags: ["統計", "數據", "迴歸"] },
          { id: "2-4", title: "第七章 三角比的性質與應用", description: "極座標與三角比的定義、三角比的性質、正弦定理與餘弦定理、反三角與三角測量", tags: ["三角比", "定理", "測量"] },
        ],
      },
      {
        id: "book3",
        title: "第三冊",
        sections: [
          { id: "3-1", title: "第八章 三角函數", description: "弧度與扇形與三角比、和差角與倍半角公式、三角函數的圖形與正餘弦的疊合", tags: ["三角函數", "公式", "圖形"] },
          { id: "3-2", title: "第九章 指對數函數", description: "指數函數及其圖形、對數符號與對數律、對數函數及其應用", tags: ["指數", "對數", "函數"] },
          { id: "3-3", title: "第十章 平面向量", description: "平面向量的加減法與係數積、平面向量的內積、直線的向量性質與二階行列式", tags: ["向量", "內積", "行列式"] },
        ],
      },
      {
        id: "book4",
        title: "第四冊",
        sections: [
          { id: "4-1", title: "第十一章 空間向量", description: "空間概念、空間座標與向量、空間向量的內積、外積與三階行列式", tags: ["空間", "向量", "外積"] },
          { id: "4-2", title: "第十二章 空間中的平面與直線", description: "空間中的平面、空間中的直線方程式", tags: ["空間", "平面", "直線"] },
          { id: "4-3", title: "第十三章 條件機率與貝式定理", description: "條件機率、獨立事件", tags: ["條件機率", "貝式", "獨立事件"] },
          { id: "4-4", title: "第十四章 矩陣", description: "聯立方程的矩陣表達、矩陣的四則運算、反方陣與轉移方陣、平面的線性轉換", tags: ["矩陣", "反方陣", "線性轉換"] },
        ],
      },
    ],
  },
  {
    id: "chinese",
    title: "國文",
    englishTitle: "Chinese",
    icon: "📖",
    color: "#C0392B",
    accent: "#922B21",
    light: "#FDEDEC",
    description: "文言文、白話文、作文與語文知識",
    chapters: [
      {
        id: "ch1",
        title: "古文選讀",
        sections: [
          { id: "1-0", title: "先秦散文", description: "論語、孟子、荀子、老莊的核心思想" },
        ],
      },
    ],
  },
  {
    id: "english",
    title: "英文",
    englishTitle: "English",
    icon: "🔤",
    color: "#1ABC9C",
    accent: "#148F77",
    light: "#E8F8F5",
    description: "文法、閱讀、寫作與字彙",
    chapters: [
      {
        id: "ch1",
        title: "字彙",
        sections: [
          { id: "1-1", title: "學測核心字彙", description: "涵蓋 L1–L6 各等級，支援搜尋、抽認卡與測驗三種學習模式", tags: ["字彙", "抽認卡", "測驗", "L1–L6"], ready: true },
        ],
      },
      {
        id: "ch2",
        title: "文法核心",
        sections: [
          { id: "2-0", title: "時態總整理", description: "12種時態的用法與比較" },
        ],
      },
    ],
  },
];

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getSection(subjectId: string, sectionId: string): Section | undefined {
  const subject = getSubject(subjectId);
  if (!subject) return undefined;
  for (const chapter of subject.chapters) {
    const section = chapter.sections.find((s) => s.id === sectionId);
    if (section) return section;
  }
  return undefined;
}

export function getChapterForSection(subjectId: string, sectionId: string): Chapter | undefined {
  const subject = getSubject(subjectId);
  if (!subject) return undefined;
  return subject.chapters.find((ch) => ch.sections.some((s) => s.id === sectionId));
}
