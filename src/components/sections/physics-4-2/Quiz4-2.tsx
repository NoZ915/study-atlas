import { useState } from "react";

const QUIZ = [
  {
    q: "法拉第實驗<一>（磁鐵插入線圈）：產生感應電動勢，是因為什麼發生改變？",
    opts: ["電壓", "磁力線數（磁通量）", "電阻", "電容"],
    ans: 1,
    explain: "磁鐵插入/抽出線圈，通過線圈的磁力線數（磁通量 Φ）發生改變，因此產生感應電流。穩定的磁場不會產生感應電流。",
  },
  {
    q: "磁通量 Φ_B = BAcosθ，其中 θ 是什麼的夾角？",
    opts: ["電流與磁場", "磁場 B 與圈面法向量 A", "磁場 B 與導線方向", "電場與磁場"],
    ans: 1,
    explain: "θ 是磁場 B⃗ 與圈面法向量 A⃗ 之間的夾角。當 B 垂直穿過圈面時（θ=0°），磁通量最大；當 B 平行圈面時（θ=90°），磁通量為零。",
  },
  {
    q: "根據法拉第電磁感應定律，感應電動勢 ε 等於？",
    opts: ["BIL sinθ", "ΔΦ/Δt（磁通量的時變率）", "μ₀nI", "Q/C"],
    ans: 1,
    explain: "ε = ΔΦ/Δt，感應電動勢等於磁通量對時間的變化率。磁通量變化越快，感應電動勢越大。",
  },
  {
    q: "磁通量的變化可以來自哪些因素？（選最完整的）",
    opts: [
      "只有 B（磁場強度）改變",
      "只有 A（線圈面積）改變",
      "B 改變、A 改變、θ 角改變，三者皆可",
      "只有線圈匝數 N 改變",
    ],
    ans: 2,
    explain: "磁通量 Φ = BAcosθ，因此 B 改變（磁場強弱）、A 改變（線圈面積/形狀）、θ 改變（線圈轉動角度），三種都可以造成磁通量變化，進而產生感應電動勢。",
  },
  {
    q: "根據冷次定律，當通過線圈的磁力線（向上）增加時，感應電流會…",
    opts: [
      "產生向上的磁場（增強原磁場）",
      "產生向下的磁場（抵抗增加）",
      "沒有感應電流",
      "產生向右的磁場",
    ],
    ans: 1,
    explain: "冷次定律精神：「抵抗」。磁通量向上增加 → 感應電流產生向下的磁場來抵抗增加。記憶法：你要增加，我偏不讓你增加。",
  },
  {
    q: "理想變壓器，原線圈 N₁=100 匝，副線圈 N₂=200 匝，原線圈電壓 ε₁=110V，副線圈電壓 ε₂=？",
    opts: ["55 V", "110 V", "220 V", "440 V"],
    ans: 2,
    explain: "ε₁/ε₂ = N₁/N₂ → 110/ε₂ = 100/200 → ε₂ = 220V。匝數比等於電壓比，匝數多電壓高（升壓變壓器）。",
  },
  {
    q: "電力公司採用高壓輸電的主要原因是？",
    opts: [
      "高壓電比較安全",
      "高壓下電流較小，導線熱能損耗 P=I²R 較小",
      "高壓下電阻較小",
      "高壓可以增加輸出功率",
    ],
    ans: 1,
    explain: "輸送功率固定，電壓升高則電流 I 減小。導線熱損耗 P=I²R，I 小則損耗大幅降低。結論：電壓越高，輸送損耗越少，越省電。",
  },
  {
    q: "觸電的危險主要取決於哪三個因素？",
    opts: [
      "電壓、電阻、電容",
      "電流大小、電流路徑（是否流過心臟）、接觸時間",
      "電壓大小、導線材質、電源種類",
      "電功率、電能、電源頻率",
    ],
    ans: 1,
    explain: "觸電危險的三關鍵：①流過人體的電流大小（非電壓）②電流路徑（流過心臟最危險）③接觸時間（越長越危險）。電壓只是間接因素（決定電流大小）。",
  },
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

export function Quiz42() {
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
          {score >= 7 ? "🎉" : score >= 5 ? "💪" : "📖"}
        </div>
        <div style={{ fontSize: 28, fontWeight: 800 }}>{score} / {QUIZ.length}</div>
        <div style={{ fontSize: 15, color: "#666", marginTop: 8 }}>
          {score >= 7
            ? "太強了！電磁感應完全掌握！"
            : score >= 5
            ? "不錯！再複習一下冷次定律就完美了！"
            : "再把法拉第定律、冷次定律、變壓器看一遍，加油！"}
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
