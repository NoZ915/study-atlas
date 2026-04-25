import { useState } from "react";

export function OhmCalculator() {
  const [v, setV] = useState(12);
  const [r, setR] = useState(4);
  const curr = r > 0 ? (v / r).toFixed(2) : "∞";
  const pwr = r > 0 ? ((v * v) / r).toFixed(1) : "∞";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ fontSize: 13, color: "#666", fontWeight: 600 }}>
            坡高（電壓）V = {v} V
          </label>
          <input
            type="range" min="1" max="24" value={v}
            onChange={(e) => setV(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#E2574C" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ fontSize: 13, color: "#666", fontWeight: 600 }}>
            路況（電阻）R = {r} Ω
          </label>
          <input
            type="range" min="1" max="20" value={r}
            onChange={(e) => setR(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F2994A" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 140, background: "#E8F4FD", borderRadius: 12, padding: "16px 20px", color: "#2D9CDB", textAlign: "center" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>車流（電流）I = V/R</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{curr} A</div>
        </div>
        <div style={{ flex: 1, minWidth: 140, background: "#F3EAFC", borderRadius: 12, padding: "16px 20px", color: "#9B51E0", textAlign: "center" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>做功速率（功率）P = V²/R</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{pwr} W</div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7, background: "#f8f7f4", borderRadius: 10, padding: "12px 16px" }}>
        試試看：把坡調陡（V↑）或把路變寬（R↓），車流量和做功速率都會增加！
      </div>
    </div>
  );
}
