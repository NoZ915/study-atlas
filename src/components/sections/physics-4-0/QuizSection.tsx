import { useState } from "react";

const QUIZ = [
  { q: "電流的方向是依照哪種粒子的流動方向定義的？", opts: ["電子", "正電荷（慣例）", "中子", "質子"], ans: 1, explain: "歷史上規定電流方向為正電荷流動方向，與電子流方向相反。" },
  { q: "用「收費站」比喻：電流 3A 代表什麼？", opts: ["收費站有 3 個閘門", "每秒有 3 庫侖的電荷通過", "有 3 台車在排隊", "電壓是 3 伏特"], ans: 1, explain: "I = 3A 代表每秒通過導線截面的電荷量為 3 庫侖（3 C/s）。" },
  { q: "一條導線均勻拉長為原來的 2 倍，電阻變為幾倍？", opts: ["2 倍", "4 倍", "8 倍", "不變"], ans: 1, explain: "體積不變 → L×2、A÷2 → R' = ρ(2L)/(A/2) = 4R" },
  { q: "短路時，相當於什麼情況？", opts: ["橋斷了不能走", "打通一條零阻力捷徑", "道路加寬", "斜坡變平"], ans: 1, explain: "短路 = 出現零電阻的捷徑 → 電流暴增 → 可能燒毀電路。" },
  { q: "1 度電等於多少焦耳？", opts: ["36,000 J", "360,000 J", "3,600,000 J", "36,000,000 J"], ans: 2, explain: "1度電 = 1 kWh = 1000W × 3600s = 3,600,000 J" },
  { q: "兩顆 3V 電池串聯，用斜坡比喻就是？", opts: ["兩個坡並排，高度不變", "兩個坡接起來，總高度 6V", "坡變成一半高", "坡消失了"], ans: 1, explain: "串聯 = 坡接著坡 → 總電壓 = 3V + 3V = 6V" },
];

const btnStyle: React.CSSProperties = {
  background: "#2D9CDB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 28px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 12,
};

export function QuizSection() {
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

  if (done) return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{score >= 5 ? "🎉" : score >= 3 ? "💪" : "📖"}</div>
      <div style={{ fontSize: 28, fontWeight: 800 }}>{score} / {QUIZ.length}</div>
      <div style={{ fontSize: 15, color: "#666", marginTop: 8 }}>
        {score >= 5 ? "太厲害了！觀念很扎實！" : score >= 3 ? "不錯喔，再複習一下就能滿分！" : "沒關係，回去看看比喻再來一次！"}
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
              key={i} onClick={() => pick(i)}
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
