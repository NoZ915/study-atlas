import { Quiz42 } from "./Quiz4-2";

const C = {
  blue: "#2D9CDB",
  blueAccent: "#1B6FA0",
  blueLight: "#E8F4FD",
  red: "#E2574C",
  redAccent: "#B33D34",
  redLight: "#FDE8E7",
  green: "#27AE60",
  greenAccent: "#1A7D44",
  greenLight: "#E3F9EC",
  purple: "#9B51E0",
  purpleAccent: "#7B3DB5",
  purpleLight: "#F3EAFC",
  orange: "#F2994A",
  orangeAccent: "#C47A35",
  orangeLight: "#FDF0E2",
  teal: "#1ABC9C",
  tealAccent: "#148F77",
  tealLight: "#E8F8F5",
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section style={{ marginBottom: 36, background: "#fff", borderRadius: 16, border: "1px solid #e5e3de", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </section>
  );
}

function CardHeader({ title, subtitle, color, accent, light }: { title: string; subtitle: string; color: string; accent: string; light: string }) {
  return (
    <div style={{ background: light, padding: "18px 24px", borderBottom: `2px solid ${color}33`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: accent }}>{title}</h2>
        <span style={{ fontSize: 13, color: accent, opacity: 0.7 }}>{subtitle}</span>
      </div>
    </div>
  );
}

function DetailRow({ label, text, color, accent, even }: { label: string; text: string; color: string; accent: string; even: boolean }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: even ? "#fafaf8" : "transparent", borderRadius: 8 }}>
      <span style={{ background: color + "18", color: accent, borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", marginTop: 1, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 14, lineHeight: 1.6, color: "#333" }}>{text}</span>
    </div>
  );
}

function SideNote({ text, color }: { text: string; color: string }) {
  return (
    <div style={{ marginTop: 14, padding: "12px 16px", background: color + "0A", borderLeft: `3px solid ${color}`, borderRadius: "0 8px 8px 0", fontSize: 13, lineHeight: 1.7, color: color, whiteSpace: "pre-line" }}>
      {text}
    </div>
  );
}

function AnalogyBox({ icon, title, desc, color, accent, light }: { icon: string; title: string; desc: string; color: string; accent: string; light: string }) {
  return (
    <div style={{ background: light, borderRadius: 12, padding: "16px", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 8, background: color, color: "#fff", fontSize: 14, fontWeight: 800 }}>{icon}</span>
        <span style={{ fontWeight: 700, color: accent, fontSize: 14 }}>{title}</span>
      </div>
      <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.8 }}>{desc}</p>
    </div>
  );
}

// ── 法拉第實驗 SVG 示意圖 ──
function FaradayExperimentDiagram() {
  return (
    <svg viewBox="0 0 480 160" style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
      {/* 實驗一：磁鐵插入線圈 */}
      <g transform="translate(10,20)">
        <text x="100" y="12" textAnchor="middle" fontSize="11" fill="#1B6FA0" fontWeight="700">法拉第實驗＜一＞</text>
        {/* 線圈 */}
        <ellipse cx="100" cy="80" rx="50" ry="22" fill="none" stroke="#2D9CDB" strokeWidth="2.5" />
        <ellipse cx="100" cy="80" rx="50" ry="22" fill="#E8F4FD" opacity="0.5" />
        <ellipse cx="100" cy="68" rx="50" ry="22" fill="none" stroke="#2D9CDB" strokeWidth="2" strokeDasharray="4,3" />
        <text x="100" y="113" textAnchor="middle" fontSize="10" fill="#2D9CDB">線圈</text>
        {/* 磁鐵 */}
        <rect x="10" y="66" width="30" height="28" rx="4" fill="#E2574C" />
        <text x="25" y="84" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="800">N</text>
        {/* 箭頭（插入方向） */}
        <path d="M42 80 L65 80" stroke="#F2994A" strokeWidth="2.5" markerEnd="url(#arrowOrange)" />
        <defs>
          <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#F2994A" />
          </marker>
          <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#2D9CDB" />
          </marker>
        </defs>
        {/* 電流計 G */}
        <circle cx="185" cy="80" r="16" fill="#fff" stroke="#27AE60" strokeWidth="2" />
        <text x="185" y="85" textAnchor="middle" fontSize="13" fill="#27AE60" fontWeight="800">G</text>
        {/* 連線 */}
        <path d="M150 68 Q165 55 185 64" fill="none" stroke="#555" strokeWidth="1.5" />
        <path d="M150 92 Q165 105 185 96" fill="none" stroke="#555" strokeWidth="1.5" />
        {/* 標示 */}
        <text x="55" y="55" fontSize="9" fill="#F2994A" fontWeight="700">插入 →</text>
        <text x="130" y="140" textAnchor="middle" fontSize="9" fill="#555">磁通量增加 → 產生感應電流</text>
      </g>

      {/* 實驗二：開關電路 */}
      <g transform="translate(250,20)">
        <text x="100" y="12" textAnchor="middle" fontSize="11" fill="#7B3DB5" fontWeight="700">法拉第實驗＜二＞</text>
        {/* 線圈 C（左） */}
        <rect x="30" y="50" width="50" height="50" rx="6" fill="#F3EAFC" stroke="#9B51E0" strokeWidth="2" />
        <text x="55" y="80" textAnchor="middle" fontSize="11" fill="#9B51E0" fontWeight="700">C</text>
        <text x="55" y="113" textAnchor="middle" fontSize="9" fill="#9B51E0">（通電線圈）</text>
        {/* 電源 */}
        <line x1="80" y1="50" x2="110" y2="50" stroke="#555" strokeWidth="1.5" />
        <circle cx="118" cy="50" r="4" fill="none" stroke="#555" strokeWidth="1.5" />
        <line x1="122" y1="50" x2="140" y2="50" stroke="#555" strokeWidth="1.5" />
        <text x="118" y="44" textAnchor="middle" fontSize="9" fill="#555">S</text>
        {/* 電池 */}
        <line x1="140" y1="42" x2="140" y2="58" stroke="#555" strokeWidth="2" />
        <line x1="145" y1="46" x2="145" y2="54" stroke="#555" strokeWidth="3" />
        <line x1="148" y1="50" x2="168" y2="50" stroke="#555" strokeWidth="1.5" />
        <line x1="168" y1="50" x2="168" y2="100" stroke="#555" strokeWidth="1.5" />
        <line x1="30" y1="100" x2="168" y2="100" stroke="#555" strokeWidth="1.5" />
        {/* 線圈 B（右，檢流計） */}
        <circle cx="10" cy="80" r="14" fill="#fff" stroke="#27AE60" strokeWidth="2" />
        <text x="10" y="85" textAnchor="middle" fontSize="12" fill="#27AE60" fontWeight="800">G</text>
        <line x1="10" y1="66" x2="10" y2="50" stroke="#555" strokeWidth="1.5" />
        <line x1="10" y1="94" x2="10" y2="100" stroke="#555" strokeWidth="1.5" />
        <line x1="10" y1="50" x2="30" y2="50" stroke="#555" strokeWidth="1.5" />
        <line x1="10" y1="100" x2="30" y2="100" stroke="#555" strokeWidth="1.5" />
        <text x="100" y="140" textAnchor="middle" fontSize="9" fill="#555">開關S導通瞬間 → G偏轉</text>
      </g>
    </svg>
  );
}

// ── 磁通量示意圖 ──
function MagneticFluxDiagram() {
  return (
    <svg viewBox="0 0 400 140" style={{ width: "100%", maxWidth: 400, display: "block", margin: "0 auto" }}>
      {/* θ=0° 穿透最多 */}
      <g transform="translate(10,10)">
        <text x="60" y="14" textAnchor="middle" fontSize="11" fill="#1B6FA0" fontWeight="700">θ = 0°（最大）</text>
        <ellipse cx="60" cy="75" rx="40" ry="18" fill="#E8F4FD" stroke="#2D9CDB" strokeWidth="2" />
        {/* 磁力線垂直穿過 */}
        {[30, 45, 60, 75, 90].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="20" x2={x} y2="58" stroke="#2D9CDB" strokeWidth="1.5" markerEnd="url(#arrowB)" />
            <line x1={x} y1="93" x2={x} y2="125" stroke="#2D9CDB" strokeWidth="1.5" markerEnd="url(#arrowB)" />
          </g>
        ))}
        <defs>
          <marker id="arrowB" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#2D9CDB" />
          </marker>
        </defs>
        <text x="60" y="138" textAnchor="middle" fontSize="10" fill="#2D9CDB">Φ = BA</text>
      </g>

      {/* θ=60° 部分穿透 */}
      <g transform="translate(140,10)">
        <text x="60" y="14" textAnchor="middle" fontSize="11" fill="#C47A35" fontWeight="700">θ = 60°（減半）</text>
        <ellipse cx="60" cy="75" rx="40" ry="10" fill="#FDF0E2" stroke="#F2994A" strokeWidth="2" />
        {[35, 50, 60, 70, 85].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="20" x2={x} y2="65" stroke="#F2994A" strokeWidth="1.5" markerEnd="url(#arrowO)" />
            <line x1={x} y1="86" x2={x} y2="125" stroke="#F2994A" strokeWidth="1.5" markerEnd="url(#arrowO)" />
          </g>
        ))}
        <defs>
          <marker id="arrowO" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#F2994A" />
          </marker>
        </defs>
        <text x="60" y="138" textAnchor="middle" fontSize="10" fill="#F2994A">Φ = BAcos60° = ½BA</text>
      </g>

      {/* θ=90° 不穿透 */}
      <g transform="translate(270,10)">
        <text x="60" y="14" textAnchor="middle" fontSize="11" fill="#B33D34" fontWeight="700">θ = 90°（為零）</text>
        <ellipse cx="60" cy="75" rx="5" ry="30" fill="#FDE8E7" stroke="#E2574C" strokeWidth="2" />
        {[30, 45, 60, 75, 90].map((x, i) => (
          <line key={i} x1={x} y1="20" x2={x} y2="125" stroke="#E2574C" strokeWidth="1.5" markerEnd="url(#arrowR)" />
        ))}
        <defs>
          <marker id="arrowR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#E2574C" />
          </marker>
        </defs>
        <text x="60" y="138" textAnchor="middle" fontSize="10" fill="#E2574C">Φ = BAcos90° = 0</text>
      </g>
    </svg>
  );
}

// ── 冷次定律示意圖 ──
function LenzLawDiagram() {
  return (
    <svg viewBox="0 0 440 160" style={{ width: "100%", maxWidth: 440, display: "block", margin: "0 auto" }}>
      {/* 情境一：磁通量增加 */}
      <g transform="translate(10,10)">
        <text x="95" y="14" textAnchor="middle" fontSize="11" fill="#1A7D44" fontWeight="700">磁通量向下增加</text>
        {/* 線圈 */}
        <ellipse cx="95" cy="85" rx="55" ry="24" fill="#E3F9EC" stroke="#27AE60" strokeWidth="2.5" />
        {/* 外部磁力線（向下，增加） */}
        {[60, 80, 95, 110, 130].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="18" x2={x} y2="61" stroke="#27AE60" strokeWidth="1.8" markerEnd="url(#arrowDown)" />
            <line x1={x} y1="109" x2={x} y2="145" stroke="#27AE60" strokeWidth="1.8" markerEnd="url(#arrowDown)" />
          </g>
        ))}
        <defs>
          <marker id="arrowDown" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L6,0 L3,6 z" fill="#27AE60" />
          </marker>
          <marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="1" orient="auto">
            <path d="M0,6 L6,6 L3,0 z" fill="#E2574C" />
          </marker>
        </defs>
        {/* 感應磁場（向上，抵抗） */}
        <line x1="95" y1="100" x2="95" y2="35" stroke="#E2574C" strokeWidth="2.5" strokeDasharray="5,3" markerEnd="url(#arrowUp)" />
        <text x="105" y="62" fontSize="10" fill="#E2574C" fontWeight="700">感應B↑</text>
        <text x="95" y="152" textAnchor="middle" fontSize="10" fill="#555">感應電流：抵抗增加（向上）</text>
      </g>

      {/* 情境二：磁通量減少 */}
      <g transform="translate(230,10)">
        <text x="95" y="14" textAnchor="middle" fontSize="11" fill="#B33D34" fontWeight="700">磁通量向下減少</text>
        {/* 線圈 */}
        <ellipse cx="95" cy="85" rx="55" ry="24" fill="#FDE8E7" stroke="#E2574C" strokeWidth="2.5" />
        {/* 外部磁力線（向下，減少，較淡） */}
        {[75, 95, 115].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="18" x2={x} y2="61" stroke="#E2574C" strokeWidth="1.2" strokeDasharray="4,3" markerEnd="url(#arrowDownR)" />
            <line x1={x} y1="109" x2={x} y2="145" stroke="#E2574C" strokeWidth="1.2" strokeDasharray="4,3" markerEnd="url(#arrowDownR)" />
          </g>
        ))}
        <defs>
          <marker id="arrowDownR" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L6,0 L3,6 z" fill="#E2574C" />
          </marker>
          <marker id="arrowDownG" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L6,0 L3,6 z" fill="#27AE60" />
          </marker>
        </defs>
        {/* 感應磁場（向下，補充） */}
        <line x1="95" y1="35" x2="95" y2="100" stroke="#27AE60" strokeWidth="2.5" strokeDasharray="5,3" markerEnd="url(#arrowDownG)" />
        <text x="105" y="80" fontSize="10" fill="#27AE60" fontWeight="700">感應B↓</text>
        <text x="95" y="152" textAnchor="middle" fontSize="10" fill="#555">感應電流：抵抗減少（向下）</text>
      </g>
    </svg>
  );
}

// ── 變壓器示意圖 ──
function TransformerDiagram() {
  return (
    <svg viewBox="0 0 400 130" style={{ width: "100%", maxWidth: 400, display: "block", margin: "0 auto" }}>
      {/* 鐵心 */}
      <rect x="140" y="20" width="120" height="90" rx="6" fill="#ddd" stroke="#999" strokeWidth="1.5" />
      <rect x="155" y="35" width="90" height="60" rx="4" fill="#f5f5f5" />
      {/* 原線圈 */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={i} cx="140" cy={35 + i * 18} rx="25" ry="7" fill="none" stroke="#2D9CDB" strokeWidth="2.5" />
      ))}
      <text x="90" y="80" textAnchor="middle" fontSize="11" fill="#1B6FA0" fontWeight="700">N₁ 匝</text>
      {/* 副線圈 */}
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <ellipse key={i} cx="260" cy={26 + i * 9} rx="20" ry="5" fill="none" stroke="#E2574C" strokeWidth="2" />
      ))}
      <text x="310" y="80" textAnchor="middle" fontSize="11" fill="#B33D34" fontWeight="700">N₂ 匝</text>
      {/* 電源（左） */}
      <line x1="50" y1="40" x2="115" y2="40" stroke="#555" strokeWidth="1.5" />
      <line x1="50" y1="90" x2="115" y2="90" stroke="#555" strokeWidth="1.5" />
      <line x1="50" y1="40" x2="50" y2="55" stroke="#555" strokeWidth="1.5" />
      <line x1="50" y1="75" x2="50" y2="90" stroke="#555" strokeWidth="1.5" />
      <line x1="42" y1="55" x2="58" y2="55" stroke="#555" strokeWidth="3" />
      <line x1="44" y1="62" x2="56" y2="62" stroke="#555" strokeWidth="1.5" />
      <line x1="42" y1="68" x2="58" y2="68" stroke="#555" strokeWidth="3" />
      <line x1="44" y1="75" x2="56" y2="75" stroke="#555" strokeWidth="1.5" />
      <text x="50" y="18" textAnchor="middle" fontSize="11" fill="#2D9CDB" fontWeight="700">ε₁ (交流)</text>
      {/* 負載（右） */}
      <line x1="280" y1="30" x2="350" y2="30" stroke="#555" strokeWidth="1.5" />
      <line x1="280" y1="110" x2="350" y2="110" stroke="#555" strokeWidth="1.5" />
      <rect x="340" y="50" width="20" height="30" rx="3" fill="#FDE8E7" stroke="#E2574C" strokeWidth="1.5" />
      <text x="350" y="70" textAnchor="middle" fontSize="10" fill="#B33D34">R</text>
      <line x1="350" y1="30" x2="350" y2="50" stroke="#555" strokeWidth="1.5" />
      <line x1="350" y1="80" x2="350" y2="110" stroke="#555" strokeWidth="1.5" />
      <text x="350" y="18" textAnchor="middle" fontSize="11" fill="#E2574C" fontWeight="700">ε₂</text>
      {/* 公式標示 */}
      <text x="200" y="122" textAnchor="middle" fontSize="12" fill="#555" fontWeight="700">ε₁ / ε₂ = N₁ / N₂</text>
    </svg>
  );
}

// ── 電力輸送示意圖 ──
function PowerTransmissionDiagram() {
  return (
    <svg viewBox="0 0 480 110" style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
      {/* 發電機 */}
      <circle cx="35" cy="55" r="22" fill="#E3F9EC" stroke="#27AE60" strokeWidth="2" />
      <text x="35" y="52" textAnchor="middle" fontSize="10" fill="#1A7D44" fontWeight="700">發電機</text>
      <text x="35" y="65" textAnchor="middle" fontSize="9" fill="#1A7D44">2400V</text>
      {/* 箭頭右 */}
      <path d="M57 55 L85 55" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowRight)" />
      <defs>
        <marker id="arrowRight" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#555" />
        </marker>
      </defs>
      {/* 升壓變壓器 */}
      <rect x="85" y="30" width="70" height="50" rx="6" fill="#FDF0E2" stroke="#F2994A" strokeWidth="2" />
      <text x="120" y="52" textAnchor="middle" fontSize="10" fill="#C47A35" fontWeight="700">升壓</text>
      <text x="120" y="65" textAnchor="middle" fontSize="9" fill="#C47A35">→120,000V</text>
      {/* 高壓輸電線 */}
      <path d="M155 55 L240 55" stroke="#E2574C" strokeWidth="2.5" />
      <text x="197" y="45" textAnchor="middle" fontSize="9" fill="#E2574C" fontWeight="700">高壓輸電</text>
      <text x="197" y="72" textAnchor="middle" fontSize="8" fill="#E2574C">I 極小，P=I²R 損耗小</text>
      {/* 降壓變壓器 */}
      <rect x="240" y="30" width="70" height="50" rx="6" fill="#E8F4FD" stroke="#2D9CDB" strokeWidth="2" />
      <text x="275" y="52" textAnchor="middle" fontSize="10" fill="#1B6FA0" fontWeight="700">降壓</text>
      <text x="275" y="65" textAnchor="middle" fontSize="9" fill="#1B6FA0">→2400V</text>
      <path d="M310 55 L360 55" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowRight)" />
      {/* 再次降壓 */}
      <rect x="360" y="30" width="70" height="50" rx="6" fill="#E8F4FD" stroke="#2D9CDB" strokeWidth="2" />
      <text x="395" y="52" textAnchor="middle" fontSize="10" fill="#1B6FA0" fontWeight="700">再降壓</text>
      <text x="395" y="65" textAnchor="middle" fontSize="9" fill="#1B6FA0">→240V</text>
      {/* 標示 */}
      <text x="240" y="105" textAnchor="middle" fontSize="10" fill="#555">結論：V 越大 → I 越小 → 損耗 P=I²R 越小</text>
    </svg>
  );
}

// ── 主元件 ──
export default function ElectromagneticInduction() {
  return (
    <div style={{ fontFamily: "'Noto Sans TC', -apple-system, sans-serif", color: "#1a1a1a" }}>

      {/* 故事橫幅 */}
      <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)", borderRadius: 16, padding: "28px 24px", marginBottom: 32, border: "1px solid #2a3f5f", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(45,156,219,0.1) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#7DD3C0", marginBottom: 14 }}>⚡ 核心觀念：△磁 → 電</div>
          <div style={{ fontSize: 14, lineHeight: 2, color: "#cbd5e1" }}>
            4-1 學的是「<span style={{ color: "#7DD3C0", fontWeight: 700 }}>電生磁</span>」（電流 → 磁場）；<br />
            4-2 要學的是反過來：「<span style={{ color: C.blue, fontWeight: 700 }}>磁生電</span>」（<b style={{ color: "#fff" }}>磁通量改變</b> → 感應電流）。<br />
            <span style={{ color: C.orange, fontWeight: 600 }}>穩定的磁場不會產生電流</span>——磁場<b style={{ color: "#fff" }}>一定要改變</b>，才能有電流產生。
          </div>
        </div>
      </div>

      {/* 快速跳轉 */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {[
          ["#faraday", "法拉第實驗"],
          ["#flux", "磁通量"],
          ["#induction-law", "法拉第定律"],
          ["#lenz", "冷次定律"],
          ["#transformer", "變壓器"],
          ["#safety", "用電安全"],
        ].map(([href, label]) => (
          <a key={href} href={href} style={{ background: C.blue + "22", color: C.blue, border: `1px solid ${C.blue}55`, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{label}</a>
        ))}
      </div>

      {/* ── 1. 法拉第實驗 ── */}
      <Card>
        <CardHeader title="① 法拉第實驗" subtitle="Faraday's Experiments · 1831" color={C.blue} accent={C.blueAccent} light={C.blueLight} />
        <div style={{ padding: "20px 24px" }} id="faraday">
          <AnalogyBox
            icon="比"
            title="水壩的水位——水位不動沒有電；水位改變才能驅動水輪機"
            desc="磁場就像水庫中的水。水位（磁場強度）穩定時，水輪機（導線）不動，沒有電力輸出。但只要水位改變（上升或下降），水就會流過水輪機產生電力。磁場也是一樣：磁力線數目（磁通量）改變，才能在導線中感應出電流。"
            color={C.blue} accent={C.blueAccent} light={C.blueLight}
          />

          <div style={{ background: C.blueLight, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
            <FaradayExperimentDiagram />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DetailRow label="實驗＜一＞" text="磁鐵插入/抽出線圈：磁力線數改變 → 指針偏轉（產生感應電流）" color={C.blue} accent={C.blueAccent} even={true} />
            <DetailRow label="實驗＜二＞" text="開關 S 導通/切斷瞬間：電流改變 → 磁場改變 → 磁力線數改變 → 產生感應電流" color={C.blue} accent={C.blueAccent} even={false} />
            <DetailRow label="關鍵結論" text="「穩定的磁場」不產生感應電流；磁通量（磁力線數）必須發生改變，才有感應電流" color={C.blue} accent={C.blueAccent} even={true} />
            <DetailRow label="口訣" text="△磁 → 電（磁通量的改變 → 感應電流）" color={C.blue} accent={C.blueAccent} even={false} />
          </div>

          <SideNote
            text={"法拉第（Michael Faraday，1791–1867），英國物理學家，實驗天才。\n他沒有高深數學背景，卻用直覺和實驗發現了電磁感應，改變了人類文明。"}
            color={C.blue}
          />
        </div>
      </Card>

      {/* ── 2. 磁通量 ── */}
      <Card>
        <CardHeader title="② 磁通量" subtitle="Magnetic Flux  Φ_B = B · A · cosθ  （單位：Wb 韋伯）" color={C.purple} accent={C.purpleAccent} light={C.purpleLight} />
        <div style={{ padding: "20px 24px" }} id="flux">
          <AnalogyBox
            icon="比"
            title="陽光照進窗戶——角度決定照進來的光量"
            desc="把磁力線想像成陽光，線圈面積想像成窗戶。正午陽光直射（垂直，θ=0°）→ 進最多光；傍晚斜照（θ大）→ 進較少；陽光完全平行窗戶時（θ=90°）→ 一點光也照不進來。磁通量就是「穿過線圈的磁力線總量」，受到磁場強度 B、面積 A、角度 θ 三個因素共同決定。"
            color={C.purple} accent={C.purpleAccent} light={C.purpleLight}
          />

          <div style={{ background: C.purpleLight, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
            <MagneticFluxDiagram />
          </div>

          {/* 公式展示 */}
          <div style={{ background: "linear-gradient(135deg, #7B3DB5, #9B51E0)", borderRadius: 12, padding: "20px 24px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", fontFamily: "Georgia, serif", letterSpacing: 2 }}>
              Φ<sub style={{ fontSize: 16 }}>B</sub> = B · A · cosθ = <span style={{ color: "#E8C7FF" }}>B⃗ · A⃗</span>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>單位：韋伯（Wb）= T·m²</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DetailRow label="B（磁場）" text="磁場強度，單位 T（特斯拉），越大磁力線越密" color={C.purple} accent={C.purpleAccent} even={true} />
            <DetailRow label="A（面積）" text="線圈圈面面積，m²，線圈面積越大通過的磁力線越多" color={C.purple} accent={C.purpleAccent} even={false} />
            <DetailRow label="θ（角度）" text="磁場 B⃗ 與圈面法向量 A⃗ 的夾角。θ=0° 時最大（B 垂直穿透圈面）；θ=90° 時為零（B 平行圈面）" color={C.purple} accent={C.purpleAccent} even={true} />
            <DetailRow label="跟哪些有關" text="磁通量與①B ②A ③θ 三者有關，三者之一改變，都會導致磁通量改變" color={C.purple} accent={C.purpleAccent} even={false} />
          </div>
        </div>
      </Card>

      {/* ── 3. 法拉第電磁感應定律 ── */}
      <Card>
        <CardHeader title="③ 法拉第電磁感應定律" subtitle="Faraday's Law of Induction" color={C.orange} accent={C.orangeAccent} light={C.orangeLight} />
        <div style={{ padding: "20px 24px" }} id="induction-law">
          <AnalogyBox
            icon="比"
            title="車速計——速度越快，速度計指針偏越多"
            desc="感應電動勢就像車速計的指針：磁通量「每秒改變多少」（時變率），決定了感應電動勢有多大。磁通量變化越快，感應電動勢越大；若磁通量完全靜止不動，感應電動勢就是零。"
            color={C.orange} accent={C.orangeAccent} light={C.orangeLight}
          />

          {/* 公式展示 */}
          <div style={{ background: "linear-gradient(135deg, #C47A35, #F2994A)", borderRadius: 12, padding: "20px 24px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", fontFamily: "Georgia, serif", letterSpacing: 2 }}>
              ε = ΔΦ / Δt
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>感應電動勢 = 磁通量的時變率</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DetailRow label="感應電動勢" text="ε（epsilon），單位伏特（V）。不是固定值，取決於磁通量變化的快慢" color={C.orange} accent={C.orangeAccent} even={true} />
            <DetailRow label="時變率" text="ΔΦ/Δt = 每秒磁通量改變多少 Wb/s = V。變化越快，ε 越大" color={C.orange} accent={C.orangeAccent} even={false} />
            <DetailRow label="磁通量不變" text="即使存在磁通量，只要不隨時間改變（ΔΦ=0），就不產生感應電動勢" color={C.orange} accent={C.orangeAccent} even={true} />
            <DetailRow label="磁通量的改變來自" text="① B 改變（磁場強弱變化）　② A 改變（線圈面積/形變）　③ θ 改變（線圈轉動角度）" color={C.orange} accent={C.orangeAccent} even={false} />
          </div>

          <SideNote
            text={"備註：正負號\n教科書有時寫 ε = -ΔΦ/Δt（有負號），負號代表冷次定律（感應電流方向抵抗變化）。\n學測解題時，通常把「大小」（ε = |ΔΦ/Δt|）和「方向」（冷次定律）分開討論，不需要強記負號。"}
            color={C.orange}
          />
        </div>
      </Card>

      {/* ── 4. 冷次定律 ── */}
      <Card>
        <CardHeader title="④ 冷次定律" subtitle="Lenz's Law — 感應電流的方向" color={C.green} accent={C.greenAccent} light={C.greenLight} />
        <div style={{ padding: "20px 24px" }} id="lenz">
          <AnalogyBox
            icon="比"
            title="「你要往東，我偏不讓你往東」——感應電流永遠抵抗原因"
            desc="冷次定律的精神只有一個字：「抵抗」。感應電流產生的磁場，永遠在對抗造成它的那個磁通量變化。磁通量增加，感應電流就產生一個讓磁通量減少的磁場；磁通量減少，感應電流就產生一個讓磁通量增加的磁場。這是能量守恆定律的必然結果——如果不抵抗，系統就可以永動了！"
            color={C.green} accent={C.greenAccent} light={C.greenLight}
          />

          <div style={{ background: C.greenLight, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
            <LenzLawDiagram />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            <DetailRow label="精神" text="感應電流產生的磁場，抵抗造成感應的磁通量變化" color={C.green} accent={C.greenAccent} even={true} />
            <DetailRow label="磁通量增加" text="感應電流 → 產生與原磁場「相反」方向的磁場 → 使磁通量減少" color={C.green} accent={C.greenAccent} even={false} />
            <DetailRow label="磁通量減少" text="感應電流 → 產生與原磁場「相同」方向的磁場 → 使磁通量增加" color={C.green} accent={C.greenAccent} even={true} />
            <DetailRow label="判斷步驟" text="①判斷磁通量增加或減少　②確認感應磁場方向（抵抗）　③用右手螺旋定則決定感應電流方向" color={C.green} accent={C.greenAccent} even={false} />
            <DetailRow label="本質" text="冷次定律是能量守恆的必然結果（若不抵抗，則感應電流增強磁場 → 磁場更強 → 更多電流，永動機！）" color={C.green} accent={C.greenAccent} even={true} />
          </div>

          <div style={{ background: C.greenLight, borderRadius: 10, padding: "14px 18px", border: `1px solid ${C.green}33` }}>
            <div style={{ fontWeight: 700, color: C.greenAccent, marginBottom: 8, fontSize: 14 }}>記憶法</div>
            <div style={{ fontSize: 14, lineHeight: 1.9, color: "#333" }}>
              你要往東，我就偏不讓你往東；你要往西，我就偏不讓你往西；<br />
              <strong>你要變多，我就偏不讓你變多；你要變少，我就偏不讓你變少。</strong>
            </div>
          </div>
        </div>
      </Card>

      {/* ── 5. 變壓器 ── */}
      <Card>
        <CardHeader title="⑤ 變壓器" subtitle="Transformer  ε₁/ε₂ = N₁/N₂" color={C.red} accent={C.redAccent} light={C.redLight} />
        <div style={{ padding: "20px 24px" }} id="transformer">
          <AnalogyBox
            icon="比"
            title="齒輪組——大齒輪轉一圈，小齒輪轉多圈（匝數比 = 電壓比）"
            desc="變壓器就像一組齒輪：原線圈（主動齒輪）轉動，透過鐵心（共享的軸）帶動副線圈（從動齒輪）。齒輪齒數多（匝數多），轉速慢但力矩大（電壓高但電流小）；齒輪齒數少（匝數少），轉速快但力矩小（電壓低但電流大）。功率不變：大電壓配小電流，小電壓配大電流。"
            color={C.red} accent={C.redAccent} light={C.redLight}
          />

          <div style={{ background: C.redLight, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
            <TransformerDiagram />
          </div>

          {/* 公式卡片組 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              { label: "電壓比", formula: "ε₁ / ε₂ = N₁ / N₂", desc: "匝數多，電壓高（成正比）", color: C.red, light: C.redLight },
              { label: "功率守恆", formula: "P_in = P_out", desc: "理想變壓器：輸入功率=輸出功率", color: C.purple, light: C.purpleLight },
              { label: "電流比", formula: "i₁ / i₂ = N₂ / N₁", desc: "匝數少的那側電流反而大（成反比）", color: C.blue, light: C.blueLight },
              { label: "升降壓", formula: "N₁ > N₂ → 降壓\nN₁ < N₂ → 升壓", desc: "原線圈匝數較多 → 副線圈電壓降低", color: C.green, light: C.greenLight },
            ].map((c, i) => (
              <div key={i} style={{ background: c.light, border: `1px solid ${c.color}33`, borderRadius: 12, padding: "14px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.color, marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a", fontFamily: "Georgia, serif", marginBottom: 6, whiteSpace: "pre-line" }}>{c.formula}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{c.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: C.redLight, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: C.redAccent, marginBottom: 10, fontSize: 14 }}>電力輸送——為什麼要高壓輸電？</div>
            <PowerTransmissionDiagram />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DetailRow label="發電廠輸出" text="功率固定（P = εI），發電廠功率為定值" color={C.red} accent={C.redAccent} even={true} />
            <DetailRow label="輸電導線損耗" text="P_loss = I²R（R 為導線電阻，固定值）→ 電流 I 越小，損耗越小" color={C.red} accent={C.redAccent} even={false} />
            <DetailRow label="結論" text="升高電壓 → 電流減小 → I²R 損耗大幅降低 → 更省電（這就是高壓輸電的原因）" color={C.red} accent={C.redAccent} even={true} />
            <DetailRow label="到住宅前" text="再用降壓變壓器將電壓降回 220V 或 110V，確保用電安全" color={C.red} accent={C.redAccent} even={false} />
          </div>

          <SideNote
            text={"鐵心的作用：讓所有磁力線都留在鐵心內（不散逸），使兩側線圈共享相同的磁通量變化。\n真實變壓器：因導線電阻與鐵心損耗，效率約 95–99%，學測計算時假設為「理想變壓器」（100% 效率）。"}
            color={C.red}
          />
        </div>
      </Card>

      {/* ── 6. 用電安全 ── */}
      <Card>
        <CardHeader title="⑥ 基本用電安全" subtitle="Electrical Safety" color={C.teal} accent={C.tealAccent} light={C.tealLight} />
        <div style={{ padding: "20px 24px" }} id="safety">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            <DetailRow label="火線（活線）" text="輸送電壓的電線，帶有高電壓，接保險絲（先保護）" color={C.teal} accent={C.tealAccent} even={true} />
            <DetailRow label="中性線" text="以地球為電路回流導線，電壓接近零" color={C.teal} accent={C.tealAccent} even={false} />
            <DetailRow label="接地線（外殼）" text="電器外殼接地，萬一漏電時，電流導入大地而非人體，避免觸電" color={C.teal} accent={C.tealAccent} even={true} />
            <DetailRow label="110V 系統" text="一條火線 + 一條中性線（中性線接地）" color={C.teal} accent={C.tealAccent} even={false} />
            <DetailRow label="220V 系統" text="兩條火線（+110V 和 -110V），電位差為 220V" color={C.teal} accent={C.tealAccent} even={true} />
            <DetailRow label="過電流（超載）" text="導線電流超過安全容量 → 導線發熱 → 可能引發火災。保險絲或斷路器負責保護" color={C.teal} accent={C.tealAccent} even={false} />
          </div>

          {/* 觸電三要素 */}
          <div style={{ background: "#FDE8E7", borderRadius: 12, padding: "16px", marginBottom: 16, border: `1px solid ${C.red}33` }}>
            <div style={{ fontWeight: 700, color: C.redAccent, marginBottom: 10, fontSize: 14 }}>觸電危險的三大因素</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { num: "①", title: "電流大小", desc: "危險在電流（非電壓）。1mA 有感，10mA 以上危險，100mA 可能致命" },
                { num: "②", title: "路徑（流過心臟）", desc: "電流流過心臟最危險。單手觸電比雙手觸電危險性低" },
                { num: "③", title: "接觸時間", desc: "接觸時間越長，傷害越大。盡快脫離接觸點" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: C.red }}>{item.num}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.redAccent, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 人體電阻表 */}
          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.teal + "15" }}>
                  {["流過人體的電流（mA）", "直流", "交流 60Hz", "效應"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: C.tealAccent, fontWeight: 700, borderBottom: `2px solid ${C.teal}33` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["最小感知電流", "5.2", "1.1", "有感覺"],
                  ["感痛電流", "62", "9", "感到疼痛"],
                  ["膠著電流", "90", "23", "無法自行鬆脫"],
                  ["致命電流", "500", "100", "心臟無法正常跳動，可能死亡"],
                ].map(([eff, dc, ac, note], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fafaf8" : "transparent" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 600, color: i >= 3 ? C.redAccent : C.tealAccent }}>{eff}</td>
                    <td style={{ padding: "10px 12px", color: "#333" }}>{dc}</td>
                    <td style={{ padding: "10px 12px", color: "#333" }}>{ac}</td>
                    <td style={{ padding: "10px 12px", color: i >= 3 ? C.red : "#555" }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SideNote
            text={"人體電阻：乾燥皮膚 100kΩ～600kΩ；潮濕皮膚僅 1kΩ；人體內部約數百歐姆。\n→ 潮濕時皮膚電阻大幅降低，同樣電壓下流過的電流增大很多倍，危險性急劇上升！\n→ 絕對不可以用潮濕的手觸碰任何電器用品。"}
            color={C.teal}
          />
        </div>
      </Card>

      {/* ── 測驗 ── */}
      <section style={{ marginBottom: 36, background: "#fff", borderRadius: 16, border: "1px solid #e5e3de", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ background: "linear-gradient(135deg, #1B6FA0, #2D9CDB)", padding: "20px 24px", color: "#fff" }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>自我測驗</h2>
          <span style={{ fontSize: 13, opacity: 0.8 }}>8 題，測一測電磁感應的觀念！</span>
        </div>
        <div style={{ padding: "24px" }}>
          <Quiz42 />
        </div>
      </section>

      {/* 頁尾 */}
      <div style={{ textAlign: "center", padding: "8px 0 32px", color: "#aaa", fontSize: 12 }}>
        基礎物理 第四章 電與磁 · 4-2 電磁感應
      </div>
    </div>
  );
}
