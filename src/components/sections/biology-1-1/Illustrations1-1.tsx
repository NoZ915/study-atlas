// SVG illustrations for Biology 1-1: 細胞的構造

/** Cell Membrane cross-section */
export function CellMembrane() {
  return (
    <svg viewBox="0 0 420 200" style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto" }}>
      {/* Background */}
      <rect width="420" height="200" fill="#f8f4ff" rx="12" />

      {/* Labels */}
      <text x="210" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7B3DB5">細胞膜構造</text>
      <text x="10" y="60" fontSize="10" fill="#555">細胞外</text>
      <text x="10" y="150" fontSize="10" fill="#555">細胞內</text>

      {/* Phospholipid bilayer — two rows of lipid heads + tails */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 50 + i * 38;
        return (
          <g key={i}>
            {/* Outer head (hydrophilic) */}
            <circle cx={x} cy={72} r={10} fill="#9B51E0" opacity={0.85} />
            {/* Outer tail */}
            <line x1={x} y1={82} x2={x - 5} y2={108} stroke="#C9A0E8" strokeWidth={2.5} />
            <line x1={x} y1={82} x2={x + 5} y2={108} stroke="#C9A0E8" strokeWidth={2.5} />
            {/* Inner tail */}
            <line x1={x - 5} y1={112} x2={x} y2={138} stroke="#C9A0E8" strokeWidth={2.5} />
            <line x1={x + 5} y1={112} x2={x} y2={138} stroke="#C9A0E8" strokeWidth={2.5} />
            {/* Inner head (hydrophilic) */}
            <circle cx={x} cy={148} r={10} fill="#9B51E0" opacity={0.85} />
          </g>
        );
      })}

      {/* Membrane protein (spans both layers) */}
      <rect x={154} y={62} width={28} height={96} rx={8} fill="#F2994A" opacity={0.85} />
      <text x={168} y={118} textAnchor="middle" fontSize={9} fill="#fff" fontWeight="700">蛋白質</text>

      {/* Cholesterol */}
      <rect x={278} y={85} width={16} height={50} rx={4} fill="#27AE60" opacity={0.8} />
      <text x={286} y={118} textAnchor="middle" fontSize={8} fill="#fff" fontWeight="700">膽</text>

      {/* Glycan chain on outer surface */}
      {[64, 80, 96].map((x, i) => (
        <g key={i}>
          <circle cx={x + 50 * i * 0.6 + 330} cy={58 - i * 6} r={5} fill="#E2574C" opacity={0.7} />
          <line x1={x + 50 * i * 0.6 + 330} y1={63 - i * 6} x2={x + 50 * i * 0.6 + 330} y2={72} stroke="#E2574C" strokeWidth={1.5} />
        </g>
      ))}
      <text x={380} y={55} textAnchor="middle" fontSize={9} fill="#B33D34" fontWeight="600">醣類</text>

      {/* Legend */}
      <circle cx={35} cy={180} r={5} fill="#9B51E0" />
      <text x={44} y={184} fontSize={10} fill="#555">磷脂（親水頭）</text>
      <rect x={145} y={175} width={10} height={10} rx={2} fill="#F2994A" />
      <text x={158} y={184} fontSize={10} fill="#555">膜蛋白</text>
      <rect x={245} y={175} width={10} height={10} rx={2} fill="#27AE60" />
      <text x={258} y={184} fontSize={10} fill="#555">膽固醇</text>
      <circle cx={335} cy={180} r={5} fill="#E2574C" />
      <text x={344} y={184} fontSize={10} fill="#555">醣類</text>
    </svg>
  );
}

/** Organelle size scale */
export function OrganelleScale() {
  const items = [
    { label: "DNA直徑", pos: 8, color: "#7B3DB5" },
    { label: "蛋白質", pos: 20, color: "#7B3DB5" },
    { label: "病毒", pos: 50, color: "#E2574C" },
    { label: "核糖體", pos: 70, color: "#9B51E0" },
    { label: "粒線體", pos: 120, color: "#27AE60" },
    { label: "葉綠體", pos: 150, color: "#27AE60" },
    { label: "紅血球", pos: 195, color: "#F2994A" },
    { label: "草履蟲", pos: 240, color: "#2D9CDB" },
  ];

  return (
    <svg viewBox="0 0 420 160" style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto" }}>
      <rect width="420" height="160" fill="#f8f4ff" rx="12" />
      <text x="210" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7B3DB5">細胞大小比較尺</text>

      {/* Scale bar */}
      <line x1="30" y1="85" x2="390" y2="85" stroke="#ccc" strokeWidth="2" />
      {/* Scale ticks */}
      {[
        { x: 30, label: "0.1nm" },
        { x: 90, label: "1nm" },
        { x: 150, label: "10nm" },
        { x: 210, label: "100nm" },
        { x: 270, label: "1μm" },
        { x: 330, label: "10μm" },
        { x: 390, label: "100μm" },
      ].map(({ x, label }) => (
        <g key={x}>
          <line x1={x} y1="80" x2={x} y2="90" stroke="#999" strokeWidth="1.5" />
          <text x={x} y="105" textAnchor="middle" fontSize="9" fill="#777">{label}</text>
        </g>
      ))}

      {/* Range bars */}
      {/* 電子顯微鏡 range */}
      <rect x="30" y="60" width="240" height="8" rx="4" fill="#9B51E0" opacity="0.2" />
      <text x="35" y="58" fontSize="9" fill="#7B3DB5">電子顯微鏡</text>
      {/* 光學顯微鏡 range */}
      <rect x="210" y="50" width="120" height="8" rx="4" fill="#2D9CDB" opacity="0.2" />
      <text x="215" y="48" fontSize="9" fill="#1B6FA0">光學顯微鏡</text>
      {/* 肉眼 range */}
      <rect x="330" y="40" width="60" height="8" rx="4" fill="#27AE60" opacity="0.2" />
      <text x="335" y="38" fontSize="9" fill="#1A7D44">肉眼</text>

      {/* Item markers */}
      {items.map(({ label, pos, color }) => (
        <g key={label}>
          <circle cx={pos + 30} cy={85} r={4} fill={color} />
          <text x={pos + 30} y={130} textAnchor="middle" fontSize={9} fill={color} fontWeight="600"
            transform={`rotate(-30, ${pos + 30}, 130)`}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

/** Prokaryote vs Eukaryote simple diagram */
export function CellComparison() {
  return (
    <svg viewBox="0 0 420 180" style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto" }}>
      <rect width="420" height="180" fill="#f0faf4" rx="12" />
      <text x="210" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1A7D44">原核細胞 vs 真核細胞</text>

      {/* Prokaryote */}
      <ellipse cx="100" cy="100" rx="70" ry="50" fill="#fff" stroke="#27AE60" strokeWidth="2" />
      <text x="100" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1A7D44">原核細胞</text>
      {/* Ribosome dots */}
      {[70, 85, 100, 115, 130].map((x) => (
        <circle key={x} cx={x} cy={105} r={3} fill="#9B51E0" opacity={0.7} />
      ))}
      {/* Circular DNA */}
      <ellipse cx="100" cy="95" rx="22" ry="14" fill="none" stroke="#E2574C" strokeWidth="2" strokeDasharray="4,2" />
      <text x="100" y="99" textAnchor="middle" fontSize="8" fill="#E2574C">環狀DNA</text>
      {/* Cell wall */}
      <ellipse cx="100" cy="100" rx="74" ry="54" fill="none" stroke="#F2994A" strokeWidth="3" strokeDasharray="5,3" />
      <text x="50" y="165" textAnchor="middle" fontSize="9" fill="#C47A35">細胞壁（肽聚糖）</text>

      {/* Labels */}
      <text x="100" y="130" textAnchor="middle" fontSize="9" fill="#555">核糖體（70S）</text>
      <text x="100" y="145" textAnchor="middle" fontSize="9" fill="#555">無核膜・無膜狀胞器</text>

      {/* Eukaryote */}
      <ellipse cx="320" cy="100" rx="80" ry="60" fill="#fff" stroke="#2D9CDB" strokeWidth="2" />
      <text x="320" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1B6FA0">真核細胞</text>
      {/* Nucleus */}
      <ellipse cx="310" cy="95" rx="28" ry="22" fill="#E8F4FD" stroke="#2D9CDB" strokeWidth="2" />
      <text x="310" y="99" textAnchor="middle" fontSize="8" fill="#1B6FA0">細胞核</text>
      {/* Mitochondria */}
      <ellipse cx="355" cy="110" rx="15" ry="9" fill="#E3F9EC" stroke="#27AE60" strokeWidth="1.5" />
      <text x="355" y="127" textAnchor="middle" fontSize="8" fill="#1A7D44">粒線體</text>
      {/* Ribosome dots */}
      {[265, 278, 291].map((x) => (
        <circle key={x} cx={x} cy={115} r={2.5} fill="#9B51E0" opacity={0.7} />
      ))}
      <text x="278" y="130" textAnchor="middle" fontSize="8" fill="#7B3DB5">核糖體（80S）</text>
    </svg>
  );
}
