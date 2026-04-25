import { useState, useEffect } from "react";

export function CurrentIllustration() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + 1), 50);
    return () => clearInterval(t);
  }, []);
  const cars = Array.from({ length: 6 }, (_, i) => {
    const x = ((i * 80 + count * 2.5) % 520) - 30;
    return (
      <g key={i} transform={`translate(${x}, 52)`}>
        <rect x="-16" y="-10" width="32" height="16" rx="4" fill="#2D9CDB" opacity="0.85" />
        <rect x="-12" y="-16" width="24" height="8" rx="3" fill="#1B6FA0" opacity="0.6" />
        <circle cx="-10" cy="8" r="4" fill="#444" />
        <circle cx="10" cy="8" r="4" fill="#444" />
      </g>
    );
  });
  return (
    <svg viewBox="0 0 480 120" style={{ width: "100%" }}>
      <rect x="0" y="40" width="480" height="40" rx="6" fill="#d4ecf7" />
      <line x1="0" y1="60" x2="480" y2="60" stroke="#fff" strokeWidth="2" strokeDasharray="20 14" />
      <rect x="222" y="28" width="36" height="64" rx="3" fill="#1B6FA0" opacity="0.18" />
      <text x="240" y="108" textAnchor="middle" fill="#1B6FA0" fontSize="11" fontWeight="600">
        收費站閘門（= 導線截面）
      </text>
      {cars}
      <text x="80" y="30" textAnchor="middle" fill="#1B6FA0" fontSize="11" fontWeight="600">
        🚗 → → →
      </text>
    </svg>
  );
}

export function VoltageIllustration() {
  const [level, setLevel] = useState(70);
  const slopeY2 = 130 - (level / 100) * 80;
  return (
    <div>
      <svg viewBox="0 0 480 150" style={{ width: "100%" }}>
        <polygon
          points={`60,${slopeY2} 300,130 300,150 60,150`}
          fill="#E2574C"
          opacity="0.15"
        />
        <line x1="60" y1={slopeY2} x2="300" y2="130" stroke="#E2574C" strokeWidth="2.5" />
        <line x1="60" y1={slopeY2} x2="60" y2="130" stroke="#B33D34" strokeWidth="1" strokeDasharray="4 3" />
        <text x="40" y={(slopeY2 + 130) / 2 + 4} textAnchor="middle" fill="#B33D34" fontSize="11" fontWeight="700">
          {level}%
        </text>
        <text x="48" y={slopeY2 - 8} fill="#B33D34" fontSize="10">高</text>
        <text x="48" y="142" fill="#B33D34" fontSize="10">低</text>
        <g transform={`translate(${100 + (level > 30 ? (100 - level) * 1.5 : 105)}, ${slopeY2 + (130 - slopeY2) * 0.35 - 14})`}>
          <rect x="-14" y="-8" width="28" height="14" rx="4" fill="#E2574C" opacity="0.9" />
          <rect x="-10" y="-14" width="20" height="7" rx="3" fill="#B33D34" opacity="0.7" />
          <circle cx="-8" cy="8" r="3.5" fill="#666" />
          <circle cx="8" cy="8" r="3.5" fill="#666" />
        </g>
        <text x="380" y="40" textAnchor="middle" fill="#B33D34" fontSize="12" fontWeight="600">坡越陡</text>
        <text x="380" y="58" textAnchor="middle" fill="#B33D34" fontSize="12" fontWeight="600">推力越大</text>
        <text x="380" y="78" textAnchor="middle" fill="#B33D34" fontSize="11">= 電壓越高</text>
      </svg>
      <input
        type="range" min="15" max="95" value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#E2574C", marginTop: 2 }}
      />
      <div style={{ textAlign: "center", fontSize: 12, color: "#B33D34", marginTop: 2 }}>
        拖拉調整斜坡高度（電壓大小）
      </div>
    </div>
  );
}

export function ResistanceIllustration() {
  const [roadWidth, setRoadWidth] = useState(40);
  const speed = Math.max(0.8, (roadWidth / 40) * 2.5);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setOffset((o) => o + speed), 50);
    return () => clearInterval(t);
  }, [speed]);
  const cars = Array.from({ length: 6 }, (_, i) => {
    const x = ((i * 80 + offset) % 500) - 10;
    const s = Math.max(0.5, roadWidth / 50);
    return (
      <g key={i} transform={`translate(${x}, 75) scale(${s})`}>
        <rect x="-12" y="-8" width="24" height="12" rx="3" fill="#F2994A" opacity="0.8" />
        <circle cx="-7" cy="5" r="3" fill="#555" />
        <circle cx="7" cy="5" r="3" fill="#555" />
      </g>
    );
  });
  return (
    <div>
      <svg viewBox="0 0 480 150" style={{ width: "100%" }}>
        <rect x="0" y={75 - roadWidth / 2} width="480" height={roadWidth} rx="4" fill="#FDF0E2" stroke="#F2994A" strokeWidth="1.5" />
        {roadWidth > 20 && (
          <line x1="0" y1="75" x2="480" y2="75" stroke="#F2994A" strokeWidth="1" strokeDasharray="14 10" opacity="0.3" />
        )}
        {cars}
        <text x="240" y="135" textAnchor="middle" fill="#C47A35" fontSize="12" fontWeight="600">
          路寬 = {roadWidth}（越窄 = 電阻越大 = 車速越慢）
        </text>
      </svg>
      <input
        type="range" min="12" max="60" value={roadWidth}
        onChange={(e) => setRoadWidth(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#F2994A", marginTop: 2 }}
      />
      <div style={{ textAlign: "center", fontSize: 12, color: "#C47A35", marginTop: 2 }}>
        拖拉調整道路寬度（電阻大小）
      </div>
    </div>
  );
}

export function PowerIllustration() {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRot((r) => r + 3), 40);
    return () => clearInterval(t);
  }, []);
  return (
    <svg viewBox="0 0 480 150" style={{ width: "100%" }}>
      <polygon points="40,40 180,110 180,130 40,130" fill="#9B51E0" opacity="0.1" />
      <line x1="40" y1="40" x2="180" y2="110" stroke="#9B51E0" strokeWidth="2" />
      <g transform="translate(120, 82)">
        <rect x="-12" y="-8" width="24" height="12" rx="3" fill="#9B51E0" opacity="0.8" />
        <circle cx="-7" cy="5" r="3" fill="#555" />
        <circle cx="7" cy="5" r="3" fill="#555" />
      </g>
      <text x="70" y="30" fill="#7B3DB5" fontSize="10" fontWeight="500">車子衝下坡</text>
      <line x1="180" y1="115" x2="220" y2="115" stroke="#9B51E0" strokeWidth="2" strokeDasharray="4 3" />
      <g transform={`translate(268, 105) rotate(${rot})`}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <rect key={a} x="-4" y="-30" width="8" height="22" rx="3" fill="#9B51E0" opacity="0.65" transform={`rotate(${a})`} />
        ))}
        <circle r="9" fill="#F3EAFC" stroke="#9B51E0" strokeWidth="2" />
        <text textAnchor="middle" y="4" fill="#7B3DB5" fontSize="7" fontWeight="700">G</text>
      </g>
      <text x="268" y="148" textAnchor="middle" fill="#7B3DB5" fontSize="11" fontWeight="600">發電機</text>
      <text x="400" y="50" fill="#7B3DB5" fontSize="12" fontWeight="600" textAnchor="middle">P = IV</text>
      <text x="400" y="72" fill="#9B51E0" fontSize="11" textAnchor="middle">坡高(V) × 車流(I)</text>
      <text x="400" y="92" fill="#9B51E0" fontSize="11" textAnchor="middle">= 每秒做的功</text>
      <text x="400" y="120" fill="#7B3DB5" fontSize="13" fontWeight="700" textAnchor="middle">也 = I²R = V²/R</text>
    </svg>
  );
}
