import { useState } from "react";

const QUIZ = [
  {
    q: "厄司特在哪一年發現電流磁效應？",
    opts: ["1800 年", "1820 年", "1831 年", "1865 年"],
    ans: 1,
    explain: "1820年（嘉慶二十五年），丹麥物理學家厄司特（Oersted）發現載流導線旁的磁針會偏轉。",
  },
  {
    q: "電流穿出紙面（⊙），磁力線環繞方向是？",
    opts: ["順時針", "逆時針", "向上直射", "不會產生磁場"],
    ans: 1,
    explain: "右手大拇指朝向電流方向（穿出紙面），四指彎曲方向即為磁場方向——逆時針。",
  },
  {
    q: "關於磁力線，下列何者正確？",
    opts: [
      "磁力線可以相交",
      "磁力線在磁鐵外部由 S 極出發到 N 極",
      "磁力線愈密，表示磁場愈強",
      "磁力線是開放曲線，有起點終點",
    ],
    ans: 2,
    explain: "磁力線越密磁場越強。磁力線不相交；外部由 N→S，內部由 S→N；磁力線為封閉曲線。",
  },
  {
    q: "長直導線距離 R 處的磁場大小公式是？",
    opts: ["B = μ₀I / 2R", "B = μ₀I / 2πR", "B = μ₀nI", "B = μ₀I / R²"],
    ans: 1,
    explain: "長直導線：B = μ₀I / (2πR)。分母有 π 因為是繞整個圓周；圓線圈中心則是 B = μ₀I / (2R)。",
  },
  {
    q: "螺線管磁場公式 B = μ₀nI，其中 n 代表？",
    opts: ["總匝數", "每單位長度的匝數（N/L）", "導線截面積", "電阻率"],
    ans: 1,
    explain: "n = N/L，即單位長度內的匝數（線圈密度）。n 越大，磁場越強。",
  },
  {
    q: "電流計（安培計）應如何接在待測電路中？",
    opts: ["並聯，電阻趨近無限大", "串聯，電阻趨近零", "並聯，電阻趨近零", "串聯，電阻趨近無限大"],
    ans: 1,
    explain: "電流計必須串聯，且本身電阻趨近零，以免影響原電路的電流；電壓計則並聯且電阻趨近無限大。",
  },
  {
    q: "電流向右（→），磁場向上（↑），安培力方向為？",
    opts: ["向左", "向右", "穿出紙面 ⊙", "穿入紙面 ⊗"],
    ans: 2,
    explain: "右手外積：四指由 I（→）彎向 B（↑），大拇指指向——穿出紙面（⊙）。",
  },
];

const btnStyle: React.CSSProperties = {
  background: "#27AE60",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 28px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 12,
};

export function Quiz41() {
  const [ci, setCi] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUIZ[ci];

  const pick = (i: number) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.ans) setScore((s) => s + 1);
  };
  const next = () => {
    if (ci + 1 >= QUIZ.length) setDone(true);
    else { setCi((c) => c + 1); setSel(null); }
  };
  const restart = () => { setCi(0); setSel(null); setScore(0); setDone(false); };

  if (done)
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>
          {score >= 6 ? "🎉" : score >= 4 ? "💪" : "📖"}
        </div>
        <div style={{ fontSize: 28, fontWeight: 800 }}>{score} / {QUIZ.length}</div>
        <div style={{ fontSize: 15, color: "#666", marginTop: 8 }}>
          {score >= 6
            ? "厲害！電流磁效應完全掌握！"
            : score >= 4
            ? "不錯！再複習一下右手定則就完美了！"
            : "再把磁力線、右手定則、三種磁場看一遍，加油！"}
        </div>
        <button onClick={restart} style={btnStyle}>重新測驗</button>
      </div>
    );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: "#666", fontWeight: 600 }}>第 {ci + 1} / {QUIZ.length} 題</span>
        <span style={{ fontSize: 13, color: "#666" }}>得分：{score}</span>
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#1a1a1a", marginBottom: 18, lineHeight: 1.6 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.opts.map((o, i) => {
          let bg = "#fff", border = "1px solid #e5e3de", color = "#1a1a1a";
          if (sel !== null) {
            if (i === q.ans) { bg = "#DCFCE7"; border = "2px solid #22C55E"; color = "#166534"; }
            else if (i === sel) { bg = "#FEE2E2"; border = "2px solid #EF4444"; color = "#991B1B"; }
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              style={{ background: bg, border, borderRadius: 10, padding: "12px 16px", textAlign: "left", fontSize: 15, color, cursor: sel !== null ? "default" : "pointer", fontWeight: sel !== null && i === q.ans ? 700 : 400, transition: "all 0.2s" }}
            >
              {o}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div style={{ marginTop: 16, padding: "14px 16px", background: sel === q.ans ? "#F0FDF4" : "#FEF2F2", borderRadius: 10, fontSize: 14, lineHeight: 1.6, color: sel === q.ans ? "#166534" : "#991B1B" }}>
          {sel === q.ans ? "✅ 正確！" : "❌ 答錯了！"} {q.explain}
        </div>
      )}
      {sel !== null && (
        <button onClick={next} style={{ ...btnStyle, marginTop: 16 }}>
          {ci + 1 >= QUIZ.length ? "查看結果" : "下一題 →"}
        </button>
      )}
    </div>
  );
}
