import { CurrentIllustration, VoltageIllustration, ResistanceIllustration, PowerIllustration } from "./Illustrations";
import { OhmCalculator } from "./OhmCalculator";
import { QuizSection } from "./QuizSection";

const SECTIONS = [
  {
    id: "current",
    title: "電流 I",
    subtitle: "Current",
    unit: "安培 A",
    formula: "I = ΔQ / Δt",
    color: "#2D9CDB",
    accent: "#1B6FA0",
    light: "#E8F4FD",
    analogyTitle: "收費站的車流量",
    analogyDesc: "想像一條高速公路的收費站。每秒有多少台車通過閘門，就是「車流量」。電流也是一樣的概念——每秒有多少電荷通過導線的某個截面。車流量越大，代表這條路越繁忙；電流越大，代表流過的電荷越多。",
    storyBox: {
      title: "🚗 求電子數的解題訣竅",
      content: "收費站一秒收到 3 袋金幣（= 3 庫侖），每台車繳 1 枚金幣（= 1.6×10⁻¹⁹ C）。\n\n過了幾台車？→ 總金幣 ÷ 每車繳的 = 3 ÷ 1.6×10⁻¹⁹ = 1.875×10¹⁹ 台\n\n公式：n = Q / e = I·t / e",
    },
    details: [
      { label: "定義", text: "單位時間內，流過某一截面之電荷量" },
      { label: "方向", text: "電流方向 = 正電荷流動方向，與電子流方向相反（歷史慣例）" },
      { label: "單位", text: "1 A = 1000 mA = 1,000,000 μA" },
      { label: "基本電荷", text: "e = 1.6 × 10⁻¹⁹ C（一顆電子的電荷量）" },
    ],
    extraNote: "外電路：電流從正極→負極\n內電路（電池內）：電流從負極→正極",
    Illustration: CurrentIllustration,
  },
  {
    id: "voltage",
    title: "電壓 V",
    subtitle: "Voltage",
    unit: "伏特 V",
    formula: "V = W / Q",
    color: "#E2574C",
    accent: "#B33D34",
    light: "#FDE8E7",
    analogyTitle: "斜坡的高度差",
    analogyDesc: "收費站前有一座大斜坡。坡越陡、越高，車子就越容易被地心引力「推」下去跑得更快。電壓就像這個高度差——它是驅使電荷流動的推力。沒有斜坡（沒有電壓），車子就不會自己動起來。",
    details: [
      { label: "定義", text: "驅使電荷流動的能力（電位差）" },
      { label: "來源", text: "不同物質得失電子能力不同，產生電位差" },
      { label: "歷史", text: "1800年伏打發現鋅(Zn)與銅(Cu)接觸產生電流" },
      { label: "電動勢 ε", text: "理想電池提供單位正電荷的能量（俗稱「電壓」）" },
    ],
    extraNote: "串聯電池：坡接著坡，總高度相加 → 總電壓增加\n並聯電池：兩條坡道並排，高度不變但車道變寬 → 可通過更多車（更大電流）",
    Illustration: VoltageIllustration,
  },
  {
    id: "resistance",
    title: "電阻 R",
    subtitle: "Resistance",
    unit: "歐姆 Ω",
    formula: "R = V / I = ρL / A",
    color: "#F2994A",
    accent: "#C47A35",
    light: "#FDF0E2",
    analogyTitle: "道路的寬窄與路況",
    analogyDesc: "車子要從斜坡衝下來，但路況會影響速度。路越窄（截面積 A 越小）、越長（長度 L 越大）、路面越顛簸（電阻率 ρ 越大），車子就越難通過。這就是電阻——阻擋電荷流動的程度。",
    storyBox: {
      title: "🧮 經典例題：拉長導線",
      content: "一條路（導線）被拉長為 3 倍：\n• 路變成 3 倍長（L → 3L）\n• 但總面積不變，所以路變窄為 1/3（A → A/3）\n• R' = ρ × 3L ÷ (A/3) = 9R\n→ 電阻變成原來的 9 倍！",
    },
    details: [
      { label: "定義", text: "電荷在導體中流動的難易度" },
      { label: "歐姆定律", text: "R = V / I（電壓與電流之比為定值）" },
      { label: "電阻定律", text: "R = ρ × L / A（ρ 電阻率、L 長度、A 截面積）" },
      { label: "能量轉換", text: "電子與原子碰撞 → 電能轉為熱能、光能" },
    ],
    extraNote: "影響電阻的三要素：\n① 材料特性 ρ（銅管路 vs 泥巴路）\n② 截面積 A（四線道 vs 單線道）\n③ 長度 L（短路 vs 長路）",
    Illustration: ResistanceIllustration,
  },
  {
    id: "power",
    title: "電功率 P",
    subtitle: "Electric Power",
    unit: "瓦特 W",
    formula: "P = IV = I²R = V²/R",
    color: "#9B51E0",
    accent: "#7B3DB5",
    light: "#F3EAFC",
    analogyTitle: "車子推動發電機",
    analogyDesc: "車子從斜坡衝下來，到了終點可以推動一台發電機。坡越陡（電壓越高）加上車流越多（電流越大），發電機轉得越快，每秒產生的電能就越多。電功率就是這個「每秒做多少功」的速率。",
    details: [
      { label: "定義", text: "單位時間內，能量的變化（產生或消耗）" },
      { label: "焦耳定律", text: "三種公式：P = IV = I²R = V²/R" },
      { label: "電器換算", text: "已知 V 和 P → R = V²/P，I = P/V" },
      { label: "1度電", text: "= 1000W × 1hr = 1kWh = 3,600,000 J" },
    ],
    extraNote: "感覺一下：1度電 = 360萬焦耳\n一個 100W 燈泡開 10 小時 = 1度電\n台灣每度電大約 2~6 元",
    Illustration: PowerIllustration,
  },
];

const EXTRA_SECTIONS = [
  {
    id: "short-open",
    title: "短路、斷路、接地",
    items: [
      { name: "短路 Short Circuit", analogy: "偷走捷徑", desc: "本來車子要走一段彎彎曲曲的路（經過電阻），結果旁邊突然打通了一條沒有任何阻礙的捷徑。所有車子都擠去走捷徑，車流暴增（I = V/0 → ∞），路面承受不住就燒起來了！", icon: "⚡", color: "#E24B4A" },
      { name: "斷路 Open Circuit", analogy: "前方橋斷了", desc: "路前面的橋塌了，完全沒辦法通過。電阻趨近無限大，電流 = 0。不管斜坡多陡（電壓多高），車子就是過不去。", icon: "🚧", color: "#888780" },
      { name: "接地 Ground", analogy: "海平面 = 0 公尺", desc: "量山有多高，需要一個基準點。我們用海平面當作「0 公尺」。接地就是電路裡的海平面——給一個「電位 = 0」的參考點。地球截面積趨近無限大 → 電阻 ≈ 0。", icon: "⏚", color: "#1D9E75" },
    ],
  },
  {
    id: "dc-ac",
    title: "直流電 vs 交流電",
    items: [
      { name: "直流電 DC (Direct Current)", analogy: "單行道", desc: "車子永遠只能往同一個方向開，不會掉頭。電池提供的就是直流電——電流方向固定不變。", icon: "→", color: "#2D9CDB" },
      { name: "交流電 AC (Alternating Current)", analogy: "潮汐車道", desc: "就像某些城市的潮汐車道，早上全部往市區開，下午又全部往郊區開，規律來回切換。交流電的電流方向隨時間週期性改變。台灣家用電是 60Hz（每秒方向切換 120 次）。", icon: "〜", color: "#9B51E0" },
    ],
  },
];

export default function CircuitReview() {
  return (
    <div style={{ fontFamily: "'Noto Sans TC', -apple-system, sans-serif", color: "#1a1a1a" }}>
      {/* Story Banner */}
      <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)", borderRadius: 16, padding: "28px 24px", marginBottom: 32, border: "1px solid #2a3f5f", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 80% 20%, rgba(45,156,219,0.08) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#7DD3C0", marginBottom: 14 }}>🛣️ 一個故事串起所有概念</div>
          <div style={{ fontSize: 14, lineHeight: 2, color: "#cbd5e1" }}>
            想像一條高速公路：<br />
            <span style={{ color: "#E2574C", fontWeight: 600 }}>斜坡的高度差</span> 推動車子往下衝（<b style={{ color: "#fff" }}>電壓 V</b>）→{" "}
            <span style={{ color: "#2D9CDB", fontWeight: 600 }}>車流通過收費站</span>（<b style={{ color: "#fff" }}>電流 I</b>）→{" "}
            <span style={{ color: "#F2994A", fontWeight: 600 }}>道路寬窄影響速度</span>（<b style={{ color: "#fff" }}>電阻 R</b>）→{" "}
            <span style={{ color: "#9B51E0", fontWeight: 600 }}>車子推動發電機做功</span>（<b style={{ color: "#fff" }}>電功率 P</b>）
          </div>
        </div>
      </div>

      {/* SI Units Banner */}
      <div style={{ background: "#fff", border: "1px solid #e5e3de", borderRadius: 12, padding: "14px 20px", marginBottom: 32, textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>SI 七大基本單位：</span>
        {["m 公尺", "kg 公斤", "s 秒", "A 安培", "mol 莫耳", "K 克耳文", "cd 燭光"].map((u, i) => (
          <span key={i} style={{ display: "inline-block", background: u.startsWith("A ") ? "#E8F4FD" : "#f5f4f0", color: u.startsWith("A ") ? "#1B6FA0" : "#666", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: u.startsWith("A ") ? 700 : 400, margin: "4px 3px", border: u.startsWith("A ") ? "1px solid #B5D4F4" : "1px solid #e5e3de" }}>
            {u}
          </span>
        ))}
      </div>

      {/* Jump links */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} style={{ background: s.color + "22", color: s.color, border: `1px solid ${s.color}55`, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
            {s.title}
          </a>
        ))}
      </div>

      {/* Main sections */}
      {SECTIONS.map((sec) => {
        const Illust = sec.Illustration;
        return (
          <section key={sec.id} id={sec.id} style={{ marginBottom: 36, background: "#fff", borderRadius: 16, border: "1px solid #e5e3de", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            {/* Section header */}
            <div style={{ background: sec.light, padding: "18px 24px", borderBottom: `2px solid ${sec.color}33`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: sec.accent }}>{sec.title}</h2>
                <span style={{ fontSize: 13, color: sec.accent, opacity: 0.7 }}>{sec.subtitle}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ background: sec.color + "20", color: sec.accent, borderRadius: 8, padding: "4px 12px", fontSize: 13, fontWeight: 600 }}>{sec.unit}</span>
                <span style={{ background: sec.color + "15", color: sec.accent, borderRadius: 8, padding: "4px 12px", fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>{sec.formula}</span>
              </div>
            </div>

            <div style={{ padding: "20px 24px 8px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: sec.accent, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: 6, background: sec.color, color: "#fff", fontSize: 12, fontWeight: 800 }}>比</span>
                {sec.analogyTitle}
              </div>
              <div style={{ background: sec.light, borderRadius: 12, padding: "16px", marginBottom: 12 }}>
                <Illust />
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#444", margin: "0 0 16px" }}>{sec.analogyDesc}</p>
            </div>

            {sec.storyBox && (
              <div style={{ margin: "0 24px 16px", padding: "16px 18px", background: sec.color + "0B", border: `1px solid ${sec.color}25`, borderRadius: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: sec.accent, marginBottom: 8 }}>{sec.storyBox.title}</div>
                <div style={{ fontSize: 13, lineHeight: 1.8, color: "#444", whiteSpace: "pre-line" }}>{sec.storyBox.content}</div>
              </div>
            )}

            <div style={{ padding: "0 24px 20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sec.details.map((d, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: i % 2 === 0 ? "#fafaf8" : "transparent", borderRadius: 8 }}>
                    <span style={{ background: sec.color + "18", color: sec.accent, borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", marginTop: 1 }}>{d.label}</span>
                    <span style={{ fontSize: 14, lineHeight: 1.6, color: "#333" }}>{d.text}</span>
                  </div>
                ))}
              </div>
              {sec.extraNote && (
                <div style={{ marginTop: 14, padding: "12px 16px", background: sec.color + "0A", borderLeft: `3px solid ${sec.color}`, borderRadius: "0 8px 8px 0", fontSize: 13, lineHeight: 1.7, color: sec.accent, whiteSpace: "pre-line" }}>
                  {sec.extraNote}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Ohm Calculator */}
      <section style={{ marginBottom: 36, background: "#fff", borderRadius: 16, border: "1px solid #e5e3de", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ background: "linear-gradient(135deg, #1B6FA0, #2D9CDB)", padding: "20px 24px", color: "#fff" }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>互動計算器</h2>
          <span style={{ fontSize: 13, opacity: 0.8 }}>調整「坡高」和「路況」，看歐姆定律怎麼運作</span>
        </div>
        <div style={{ padding: "24px" }}><OhmCalculator /></div>
      </section>

      {/* Extra sections (short circuit, dc/ac) */}
      {EXTRA_SECTIONS.map((sec) => (
        <section key={sec.id} id={sec.id} style={{ marginBottom: 36, background: "#fff", borderRadius: 16, border: "1px solid #e5e3de", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ padding: "20px 24px 8px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 22, fontWeight: 800, color: "#1a1a1a" }}>{sec.title}</h2>
          </div>
          <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {sec.items.map((item, i) => (
              <div key={i} style={{ border: `1px solid ${item.color}33`, borderRadius: 12, padding: "16px 20px", background: item.color + "08" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20, width: 36, height: 36, borderRadius: 10, background: item.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: item.color }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>比喻：{item.analogy}</div>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#444" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Quiz */}
      <section style={{ marginBottom: 36, background: "#fff", borderRadius: 16, border: "1px solid #e5e3de", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ background: "linear-gradient(135deg, #7B3DB5, #9B51E0)", padding: "20px 24px", color: "#fff" }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>自我測驗</h2>
          <span style={{ fontSize: 13, opacity: 0.8 }}>用「高速公路」的思維來答題！</span>
        </div>
        <div style={{ padding: "24px" }}><QuizSection /></div>
      </section>
    </div>
  );
}
