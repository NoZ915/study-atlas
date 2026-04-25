import { useState, useEffect } from "react";

// ── 1. 電流產生磁場 ── 可切換方向的互動動畫
export function MagneticFieldIllustration() {
  const [isOut, setIsOut] = useState(true); // ⊙ = 穿出紙面
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((c) => c + 1), 60);
    return () => clearInterval(t);
  }, []);

  const radii = [38, 60, 82, 104];
  const colors = ["#E2574C", "#F2994A", "#27AE60", "#9B51E0"];

  return (
    <div>
      <svg viewBox="0 0 300 300" style={{ width: "100%", maxWidth: 340 }}>
        <rect width="300" height="300" fill="#fafaf8" rx="12" />

        {/* B-field circles with animated arrowheads */}
        {radii.map((r, ri) => {
          // 4 arrowhead positions around each circle, rotate slowly
          const baseAngle = isOut ? tick * 1.8 : -tick * 1.8;
          return (
            <g key={ri}>
              <circle
                cx="150" cy="150" r={r}
                fill="none"
                stroke={colors[ri]}
                strokeWidth="1.8"
                opacity="0.6"
              />
              {[0, 90, 180, 270].map((a, ai) => {
                const deg = a + baseAngle;
                const rad = (deg * Math.PI) / 180;
                const x = 150 + r * Math.cos(rad);
                const y = 150 + r * Math.sin(rad);
                // tangent direction for CCW: (-sin, cos), CW: (sin, -cos)
                const arrowRot = isOut ? deg + 90 : deg - 90;
                return (
                  <text
                    key={ai}
                    x={x} y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={9 + ri}
                    fill={colors[ri]}
                    transform={`rotate(${arrowRot - 90}, ${x}, ${y})`}
                    fontWeight="bold"
                  >
                    ▶
                  </text>
                );
              })}
            </g>
          );
        })}

        {/* Wire cross section */}
        <circle cx="150" cy="150" r="20" fill="#2D9CDB" />
        <circle cx="150" cy="150" r="18" fill="#1B6FA0" opacity="0.3" />
        <text x="150" y="157" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          {isOut ? "⊙" : "⊗"}
        </text>

        {/* Label */}
        <text x="150" y="285" textAnchor="middle" fill="#555" fontSize="11" fontWeight="600">
          {isOut ? "⊙ 穿出紙面 → 磁場逆時針（反時針）" : "⊗ 穿入紙面 → 磁場順時針"}
        </text>
      </svg>

      {/* Toggle button */}
      <button
        onClick={() => setIsOut((v) => !v)}
        style={{ display: "block", margin: "8px auto 0", background: "#2D9CDB", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
      >
        切換電流方向 {isOut ? "（⊙ → ⊗）" : "（⊗ → ⊙）"}
      </button>
      <p style={{ textAlign: "center", fontSize: 11, color: "#888", marginTop: 6 }}>
        記憶訣：右手大拇指 = 電流方向，四指彎曲 = 磁力線方向
      </p>
    </div>
  );
}

// ── 2. 三種常見磁場視覺化（長直導線 / 圓線圈 / 螺線管）
export function ThreeMagneticsIllustration() {
  const [tab, setTab] = useState(0);

  const tabs = ["長直導線", "圓線圈", "螺線管"];
  const colors = ["#2D9CDB", "#E2574C", "#27AE60"];

  return (
    <div>
      {/* Tab buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {tabs.map((t, i) => (
          <button
            key={i} onClick={() => setTab(i)}
            style={{ flex: 1, minWidth: 80, padding: "8px 0", borderRadius: 8, border: `2px solid ${colors[i]}`, background: tab === i ? colors[i] : "transparent", color: tab === i ? "#fff" : colors[i], fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Long straight wire — 3-D perspective */}
      {tab === 0 && (
        <div>
          <svg viewBox="0 0 420 230" style={{ width: "100%" }}>
            <defs>
              {/* Wire gradient: bright near → dim far */}
              <linearGradient id="wg3d" gradientUnits="userSpaceOnUse"
                x1="52" y1="185" x2="355" y2="95">
                <stop offset="0%"   stopColor="#2D9CDB" stopOpacity="1"/>
                <stop offset="100%" stopColor="#2D9CDB" stopOpacity="0.3"/>
              </linearGradient>
            </defs>

            <rect width="420" height="230" fill="#E8F4FD" rx="10" />

            {/* ── Field rings ── rendered BEHIND wire */}
            {/*   wire: (52,185)→(355,95)  angle≈-16.7°
                  rings at t=.12,.30,.50,.70 along wire
                  rx = ry * 0.22  (foreshortening) */}
            {[
              { t: 0.12, ry: 54, color: "#E2574C" },
              { t: 0.32, ry: 45, color: "#F2994A" },
              { t: 0.52, ry: 36, color: "#27AE60" },
              { t: 0.72, ry: 28, color: "#9B51E0" },
            ].map(({ t, ry, color }, i) => {
              const cx = 52  + 303 * t;
              const cy = 185 - 90  * t;
              const rx = ry * 0.22;
              const ang = -16.7; // wire angle deg

              // Top of ellipse in world-space (for R label on ring 1)
              const φ = ang * Math.PI / 180;
              const topWx = cx + ry * Math.sin(φ);   // rotate (0,−ry) by ang
              const topWy = cy - ry * Math.cos(φ);

              return (
                <g key={i}>
                  {/* Back half of ring (dashed) — drawn first so wire covers it */}
                  <g transform={`translate(${cx},${cy}) rotate(${ang})`}>
                    <ellipse cx={0} cy={0} rx={rx} ry={ry}
                      fill="none" stroke={color} strokeWidth="1.8"
                      strokeDasharray="4 3" opacity={0.35}/>
                  </g>
                  {/* Solid front half */}
                  <g transform={`translate(${cx},${cy}) rotate(${ang})`}>
                    {/* Use clipPath trick: draw only the half in front of the wire
                        by splitting into left semicircle (x<0 in local coords) */}
                    <path
                      d={`M 0 ${-ry} A ${rx} ${ry} 0 0 0 0 ${ry}`}
                      fill="none" stroke={color} strokeWidth="2.2"
                      opacity={0.9 - i * 0.07}/>
                    <path
                      d={`M 0 ${-ry} A ${rx} ${ry} 0 0 1 0 ${ry}`}
                      fill="none" stroke={color} strokeWidth="2.2"
                      opacity={0.45 - i * 0.04} strokeDasharray="3 2"/>
                    {/* Arrow at top — points right for ⊙ (CCW in physics) */}
                    <text x={0} y={-ry} textAnchor="middle" dominantBaseline="middle"
                      fontSize={9} fill={color} fontWeight="bold"
                      transform={`rotate(90, 0, ${-ry})`}>▶</text>
                    {/* Arrow at bottom — points left */}
                    <text x={0} y={ry} textAnchor="middle" dominantBaseline="middle"
                      fontSize={9} fill={color} fontWeight="bold"
                      transform={`rotate(-90, 0, ${ry})`}>▶</text>
                  </g>
                  {/* R dashed label on 2nd ring */}
                  {i === 1 && (
                    <g>
                      <line x1={cx} y1={cy} x2={topWx} y2={topWy}
                        stroke="#F2994A" strokeWidth="1.4" strokeDasharray="3 2"/>
                      <text x={topWx - 10} y={topWy - 3}
                        fill="#F2994A" fontSize="12" fontWeight="700">R</text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* ── Wire ── */}
            {/* Shadow */}
            <line x1="54" y1="188" x2="357" y2="98"
              stroke="#1B6FA0" strokeWidth="13" strokeLinecap="round" opacity="0.13"/>
            {/* Body with depth gradient */}
            <line x1="52" y1="185" x2="355" y2="95"
              stroke="url(#wg3d)" strokeWidth="9" strokeLinecap="round"/>
            {/* Specular highlight */}
            <line x1="52" y1="180" x2="355" y2="90"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.3"/>

            {/* ── Near-end cross-section (⊙) ── */}
            <circle cx="52" cy="185" r="18" fill="#2D9CDB" stroke="white" strokeWidth="2.5"/>
            <circle cx="52" cy="185" r="11" fill="none" stroke="white" strokeWidth="1.5"/>
            <circle cx="52" cy="185" r="3"  fill="white"/>
            <text x="52" y="210" textAnchor="middle" fill="#1B6FA0" fontSize="10" fontWeight="700">
              ⊙ 電流 I
            </text>

            {/* Current arrow along wire */}
            <text x="200" y="133" fill="white" fontSize="13" fontWeight="bold"
              transform="rotate(-16.7, 200, 133)" opacity="0.85">→ I</text>

            {/* ── Formula ── */}
            <text x="355" y="42" textAnchor="middle" fill="#1B6FA0" fontSize="13" fontWeight="700">B = μ₀I</text>
            <line x1="323" y1="47" x2="387" y2="47" stroke="#1B6FA0" strokeWidth="1.5"/>
            <text x="355" y="60" textAnchor="middle" fill="#1B6FA0" fontSize="13" fontWeight="700">2πR</text>

            {/* Legend */}
            <text x="290" y="170" fill="#555" fontSize="10" fontWeight="600">磁力線（同心圓環繞導線）</text>
            <line x1="258" y1="168" x2="287" y2="168" stroke="#E2574C" strokeWidth="1.5"/>
          </svg>

          <p style={{ fontSize: 13, color: "#444", marginTop: 8, lineHeight: 1.7 }}>
            磁力線是以導線為圓心、<b>垂直包覆整條導線</b>的同心圓環。<br />
            電流越強（I↑）、距離越近（R↓），磁場越強。用右手螺旋定則判斷繞向。
          </p>
        </div>
      )}

      {/* Circular loop */}
      {tab === 1 && (
        <div>
          <svg viewBox="0 0 400 200" style={{ width: "100%" }}>
            <rect width="400" height="200" fill="#FDE8E7" rx="10" />
            {/* Ellipse (loop in perspective) */}
            <ellipse cx="200" cy="100" rx="70" ry="35" fill="none" stroke="#E2574C" strokeWidth="3" />
            {/* Current direction arrows on loop */}
            <text x="200" y="67" textAnchor="middle" fill="#E2574C" fontSize="14" fontWeight="bold">◀</text>
            <text x="200" y="137" textAnchor="middle" fill="#E2574C" fontSize="14" fontWeight="bold">▶</text>
            {/* B field lines through center */}
            {[-40, -20, 0, 20, 40].map((dx) => (
              <line key={dx} x1={200 + dx} y1="30" x2={200 + dx} y2="170" stroke="#9B51E0" strokeWidth="1.2" opacity={1 - Math.abs(dx) * 0.01} strokeDasharray="4 3" />
            ))}
            <text x="200" y="25" textAnchor="middle" fill="#7B3DB5" fontSize="12" fontWeight="700">↑ B 穿過圓心</text>
            {/* Formula */}
            <text x="340" y="90" textAnchor="middle" fill="#B33D34" fontSize="13" fontWeight="700">B = μ₀I</text>
            <line x1="310" y1="95" x2="370" y2="95" stroke="#B33D34" strokeWidth="1.5" />
            <text x="340" y="108" textAnchor="middle" fill="#B33D34" fontSize="13" fontWeight="700">2R</text>
            <text x="340" y="125" fill="#B33D34" fontSize="10" textAnchor="middle">R = 線圈半徑</text>
          </svg>
          <p style={{ fontSize: 13, color: "#444", marginTop: 8, lineHeight: 1.7 }}>
            圓形線圈：磁場集中在圓心處，方向用右手螺旋定則—四指彎向電流方向，大拇指朝向即為磁場方向。
          </p>
        </div>
      )}

      {/* Solenoid */}
      {tab === 2 && (
        <div>
          <svg viewBox="0 0 420 180" style={{ width: "100%" }}>
            <rect width="420" height="180" fill="#E3F9EC" rx="10" />
            {/* Solenoid coils */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const x = 60 + i * 45;
              return (
                <g key={i}>
                  <ellipse cx={x} cy="90" rx="16" ry="40" fill="none" stroke="#27AE60" strokeWidth="2.5" strokeDasharray={i % 2 === 0 ? "none" : "4 4"} />
                </g>
              );
            })}
            {/* Internal B field lines */}
            {[-20, -8, 4, 16, 28].map((dy) => (
              <line key={dy} x1="60" y1={90 + dy} x2="360" y2={90 + dy} stroke="#1A7D44" strokeWidth="1.3" opacity="0.5" markerEnd="url(#arr)" />
            ))}
            {/* Arrow markers label */}
            <text x="210" y="52" textAnchor="middle" fill="#1A7D44" fontSize="12" fontWeight="700">→ → → B → → →</text>
            {/* N S poles */}
            <rect x="40" y="70" width="20" height="40" rx="4" fill="#E2574C" opacity="0.8" />
            <text x="50" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">S</text>
            <rect x="360" y="70" width="20" height="40" rx="4" fill="#2D9CDB" opacity="0.8" />
            <text x="370" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">N</text>
            {/* Formula */}
            <text x="210" y="155" textAnchor="middle" fill="#1A7D44" fontSize="13" fontWeight="700">
              B = μ₀nI　（n = 匝數/長度 = N/L）
            </text>
          </svg>
          <p style={{ fontSize: 13, color: "#444", marginTop: 8, lineHeight: 1.7 }}>
            螺線管 = 把導線捲成彈簧狀。每一圈的磁場<b>疊加</b>，內部磁場非常均勻且強。<br />
            匝數越多（n↑）、電流越大（I↑），磁場越強，等同一顆條形磁鐵！
          </p>
        </div>
      )}
    </div>
  );
}

// ── 3. 安培力方向示意
export function AmpereForceDiagram() {
  const [currentDir, setCurrentDir] = useState<"right" | "left">("right"); // I 方向
  const [fieldDir, setFieldDir] = useState<"up" | "down">("up");           // B 方向

  // F = I×B：右手螺旋（數學外積）
  // i右B上 → F 穿出紙面；i左B上 → F 穿入紙面
  // i右B下 → F 穿入；i左B下 → F 穿出
  const getForce = () => {
    if (currentDir === "right" && fieldDir === "up") return "⊙ 穿出紙面（向你）";
    if (currentDir === "right" && fieldDir === "down") return "⊗ 穿入紙面（遠離你）";
    if (currentDir === "left" && fieldDir === "up") return "⊗ 穿入紙面（遠離你）";
    return "⊙ 穿出紙面（向你）";
  };
  const forceOut = getForce().startsWith("⊙");

  return (
    <div>
      <svg viewBox="0 0 360 220" style={{ width: "100%" }}>
        <rect width="360" height="220" fill="#f8f7f4" rx="12" />

        {/* Current (I) - horizontal wire */}
        <line x1="50" y1="110" x2="310" y2="110" stroke="#2D9CDB" strokeWidth="5" strokeLinecap="round" />
        <text x="185" y="107" textAnchor="middle" fill="#2D9CDB" fontSize="22">
          {currentDir === "right" ? "→" : "←"}
        </text>
        <text x="185" y="135" textAnchor="middle" fill="#1B6FA0" fontSize="12" fontWeight="700">
          電流 I
        </text>

        {/* Magnetic field (B) - vertical arrows */}
        {[80, 130, 180, 230, 280].map((x) => (
          <text key={x} x={x} y={fieldDir === "up" ? 75 : 155} textAnchor="middle" fill="#E2574C" fontSize="18" fontWeight="bold">
            {fieldDir === "up" ? "↑" : "↓"}
          </text>
        ))}
        <text x="50" y={fieldDir === "up" ? 72 : 158} fill="#B33D34" fontSize="11" fontWeight="700">B</text>

        {/* Force result */}
        <circle cx="185" cy="178" r="22" fill={forceOut ? "#E8F4FD" : "#FDE8E7"} stroke={forceOut ? "#2D9CDB" : "#E2574C"} strokeWidth="2" />
        <text x="185" y="185" textAnchor="middle" fontSize="20" fill={forceOut ? "#1B6FA0" : "#B33D34"}>
          {forceOut ? "⊙" : "⊗"}
        </text>
        <text x="185" y="215" textAnchor="middle" fill="#555" fontSize="11" fontWeight="600">
          安培力 F：{getForce()}
        </text>
      </svg>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 140 }}>
          <div style={{ fontSize: 12, color: "#666", fontWeight: 600, marginBottom: 6 }}>電流方向 I</div>
          <div style={{ display: "flex", gap: 6 }}>
            {(["right", "left"] as const).map((d) => (
              <button key={d} onClick={() => setCurrentDir(d)} style={{ flex: 1, padding: "6px 0", borderRadius: 7, border: `2px solid #2D9CDB`, background: currentDir === d ? "#2D9CDB" : "transparent", color: currentDir === d ? "#fff" : "#2D9CDB", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                {d === "right" ? "→" : "←"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 140 }}>
          <div style={{ fontSize: 12, color: "#666", fontWeight: 600, marginBottom: 6 }}>磁場方向 B</div>
          <div style={{ display: "flex", gap: 6 }}>
            {(["up", "down"] as const).map((d) => (
              <button key={d} onClick={() => setFieldDir(d)} style={{ flex: 1, padding: "6px 0", borderRadius: 7, border: `2px solid #E2574C`, background: fieldDir === d ? "#E2574C" : "transparent", color: fieldDir === d ? "#fff" : "#E2574C", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                {d === "up" ? "↑" : "↓"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#888", textAlign: "center", marginTop: 8 }}>
        記憶法：右手外積 — 四指由 I 方向彎向 B 方向，大拇指即為 F 方向
      </p>
    </div>
  );
}
