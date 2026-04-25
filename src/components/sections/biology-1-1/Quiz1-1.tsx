import { useState } from "react";

const QUIZ = [
  {
    q: "細胞學說中，提出「一切細胞皆來自原來的細胞產生」的學者是？",
    opts: ["虎克（Hooke）", "許來登（Schleiden）", "魏修（Virchow）", "許旺（Schwann）"],
    ans: 2,
    explain: "魏修（菲可）在 1855 年提出「細胞均由已存在的細胞分裂而來」，這是細胞學說三大要點的第三條。",
  },
  {
    q: "下列何者為原核細胞的特徵？",
    opts: ["具有核膜包覆的細胞核", "具有膜狀胞器（如粒線體）", "染色體為環狀 DNA（大多數）", "能進行有絲分裂"],
    ans: 2,
    explain: "原核細胞的 DNA 多為環狀，位於細胞質中，不具核膜、核仁及膜狀胞器；分裂方式為無絲分裂（二分裂）。",
  },
  {
    q: "關於細胞膜的敘述，何者正確？",
    opts: [
      "細胞膜由蛋白質雙層排列而成",
      "植物細胞的細胞膜含有膽固醇",
      "醣類附著於磷脂或蛋白質上，位於細胞外側",
      "磷脂分子不可移動，細胞膜為固態結構",
    ],
    ans: 2,
    explain: "醣類位於細胞外側，可作為辨識自我或非我的依據。膽固醇僅見於動物細胞膜；細胞膜組成分子具流動性（液體鑲嵌模型）。",
  },
  {
    q: "細胞進行有氧呼吸、產生 ATP 的主要胞器是？",
    opts: ["細胞核", "葉綠體", "核糖體", "粒線體"],
    ans: 3,
    explain: "粒線體是「細胞的能量工廠」，進行有氧呼吸產生大量 ATP。原核生物（細菌、藍綠藻）缺少粒線體，ATP 在細胞膜上合成。",
  },
  {
    q: "下列胞器中，哪一個具有雙層膜？",
    opts: ["溶體（lysosome）", "高基氏體（Golgi body）", "葉綠體（chloroplast）", "內質網（endoplasmic reticulum）"],
    ans: 2,
    explain: "葉綠體與粒線體均為雙層膜胞器（半自主胞器），內含 DNA、RNA 及核糖體。溶體、高基氏體、內質網皆為單層膜。",
  },
  {
    q: "核糖體（ribosome）的主要功能是？",
    opts: ["進行光合作用", "合成蛋白質", "進行胞內消化", "修飾與包裝分泌物"],
    ans: 1,
    explain: "核糖體由 rRNA 和蛋白質組成，為合成蛋白質的場所，存在於所有細胞（包括原核細胞）中。",
  },
  {
    q: "植物細胞特有、動物細胞不具有的構造是？",
    opts: ["粒線體", "高基氏體", "細胞壁與葉綠體", "溶體"],
    ans: 2,
    explain: "植物細胞有細胞壁（纖維素）與葉綠體，而動物細胞無。動物細胞則有中心粒（植物細胞沒有），液泡在植物中較大。",
  },
];

const C = {
  purple: "#9B51E0",
  purpleAccent: "#7B3DB5",
  purpleLight: "#F3EAFC",
};

export function Quiz11() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const q = QUIZ[current];

  function pick(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.ans) setScore((s) => s + 1);
    setShowExplain(true);
  }

  function next() {
    if (current + 1 >= QUIZ.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplain(false);
    }
  }

  function reset() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setShowExplain(false);
  }

  if (done) {
    const pct = Math.round((score / QUIZ.length) * 100);
    return (
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e3de", padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>
          {pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "📚"}
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: 22, color: C.purpleAccent }}>測驗完成！</h3>
        <p style={{ fontSize: 28, fontWeight: 800, color: C.purple, margin: "0 0 4px" }}>
          {score} / {QUIZ.length}
        </p>
        <p style={{ color: "#888", fontSize: 14, margin: "0 0 24px" }}>正確率 {pct}%</p>
        <p style={{ fontSize: 14, color: "#555", marginBottom: 24 }}>
          {pct >= 80 ? "細胞構造掌握得不錯！" : pct >= 60 ? "再複習一下胞器功能吧！" : "建議重新閱讀各胞器的比較表格。"}
        </p>
        <button
          onClick={reset}
          style={{ background: C.purple, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
        >
          再練一次
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e3de", overflow: "hidden" }}>
      {/* Progress */}
      <div style={{ background: C.purpleLight, padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.purpleAccent }}>
          第 {current + 1} 題 / 共 {QUIZ.length} 題
        </span>
        <span style={{ fontSize: 13, color: C.purpleAccent }}>目前得分：{score}</span>
      </div>
      {/* Bar */}
      <div style={{ height: 4, background: "#f0edf8" }}>
        <div style={{ height: "100%", width: `${((current + 1) / QUIZ.length) * 100}%`, background: C.purple, transition: "width 0.3s" }} />
      </div>

      <div style={{ padding: "24px 20px" }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 16, lineHeight: 1.6 }}>{q.q}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.opts.map((opt, i) => {
            let bg = "#fff";
            let border = "1.5px solid #e5e3de";
            let color = "#333";
            if (selected !== null) {
              if (i === q.ans) { bg = "#e6f9ef"; border = "1.5px solid #27AE60"; color = "#1a7d44"; }
              else if (i === selected && i !== q.ans) { bg = "#fde8e7"; border = "1.5px solid #E2574C"; color = "#b33d34"; }
            }
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                style={{ background: bg, border, borderRadius: 10, padding: "12px 16px", textAlign: "left", fontSize: 14, color, cursor: selected !== null ? "default" : "pointer", fontWeight: i === q.ans && selected !== null ? 700 : 400, transition: "all 0.2s" }}
              >
                {["Ａ", "Ｂ", "Ｃ", "Ｄ"][i]}．{opt}
              </button>
            );
          })}
        </div>

        {showExplain && (
          <div style={{ marginTop: 16, padding: "14px 16px", background: "#f8f6fc", borderLeft: `3px solid ${C.purple}`, borderRadius: "0 10px 10px 0", fontSize: 13, lineHeight: 1.8, color: "#444" }}>
            <strong style={{ color: C.purpleAccent }}>解析：</strong>{q.explain}
          </div>
        )}

        {selected !== null && (
          <button
            onClick={next}
            style={{ marginTop: 16, background: C.purple, color: "#fff", border: "none", borderRadius: 10, padding: "11px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            {current + 1 >= QUIZ.length ? "查看結果" : "下一題 →"}
          </button>
        )}
      </div>
    </div>
  );
}
