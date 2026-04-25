import { MagneticFieldIllustration, ThreeMagneticsIllustration, AmpereForceDiagram } from "./Illustrations4-1";
import { Quiz41 } from "./Quiz4-1";

// ── Color palette for this section ──
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
};

// ── Reusable Card shell ──
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

// ── Main export ──
export default function MagneticEffect() {
  return (
    <div style={{ fontFamily: "'Noto Sans TC', -apple-system, sans-serif", color: "#1a1a1a" }}>

      {/* ─── Story Banner ─── */}
      <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)", borderRadius: 16, padding: "28px 24px", marginBottom: 32, border: "1px solid #2a3f5f", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(39,174,96,0.08) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#7DD3C0", marginBottom: 14 }}>🌊 一個故事串起所有概念</div>
          <div style={{ fontSize: 14, lineHeight: 2, color: "#cbd5e1" }}>
            想像一條河流：<br />
            <span style={{ color: C.blue, fontWeight: 600 }}>水流向前衝</span>（<b style={{ color: "#fff" }}>電流 I</b>）→{" "}
            <span style={{ color: C.green, fontWeight: 600 }}>水流旁邊形成漩渦</span>（<b style={{ color: "#fff" }}>磁場 B</b>）→{" "}
            <span style={{ color: C.orange, fontWeight: 600 }}>水流方向決定漩渦旋轉方向</span>（<b style={{ color: "#fff" }}>右手螺旋定則</b>）→{" "}
            <span style={{ color: C.red, fontWeight: 600 }}>導線在磁場中被推動</span>（<b style={{ color: "#fff" }}>安培力 F</b>）
          </div>
        </div>
      </div>

      {/* ─── Jump links ─── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {[["#discovery", "厄司特的發現"], ["#field-lines", "磁力線特性"], ["#right-hand", "右手螺旋定則"], ["#three-fields", "三種磁場"], ["#ampere", "安培力"], ["#meters", "電流計 vs 電壓計"]].map(([href, label]) => (
          <a key={href} href={href} style={{ background: C.green + "22", color: C.green, border: `1px solid ${C.green}55`, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{label}</a>
        ))}
      </div>

      {/* ─── 1. 電學與磁學的統一 ─── */}
      <Card>
        <CardHeader title="① 電學與磁學的統一" subtitle="厄司特的發現 · 1820" color={C.blue} accent={C.blueAccent} light={C.blueLight} />
        <div style={{ padding: "20px 24px" }} id="discovery">
          <AnalogyBox
            icon="比"
            title="水流旁邊出現漩渦——電流旁邊出現磁場"
            desc="原本大家以為「電學」和「磁學」是完全不同的兩件事：電是電荷的世界，磁是磁鐵的世界。直到 1820 年，丹麥物理學家厄司特在實驗中發現：當他打開電源，旁邊的指南針竟然偏轉了！就像水流在流動時，旁邊的水會形成漩渦——電流流動時，周圍空間會自動形成磁場，這就是「電生磁」。"
            color={C.blue} accent={C.blueAccent} light={C.blueLight}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            <DetailRow label="發現者" text="厄司特（Hans Christian Oersted，1775–1851），丹麥物理學家" color={C.blue} accent={C.blueAccent} even={true} />
            <DetailRow label="時間" text="1820年（嘉慶二十五年）" color={C.blue} accent={C.blueAccent} even={false} />
            <DetailRow label="電生磁" text="電荷的流動（電流）會在周圍產生磁場，又稱「電流的磁效應」" color={C.blue} accent={C.blueAccent} even={true} />
            <DetailRow label="磁生電" text="磁力線數發生變化 → 產生感應電流（感應電壓），由法拉第發現" color={C.blue} accent={C.blueAccent} even={false} />
          </div>

          <SideNote
            text={"因為「電生磁」和「磁生電」的關係，電學和磁學不再分流，合稱「電磁學」。\n電磁學 = 電場（電荷造成）+ 磁場（電流/磁鐵造成）統一的學問。"}
            color={C.blue}
          />
        </div>
      </Card>

      {/* ─── 2. 磁力線特性 ─── */}
      <Card>
        <CardHeader title="② 磁力線特性" subtitle="Magnetic Field Lines" color={C.green} accent={C.greenAccent} light={C.greenLight} />
        <div style={{ padding: "20px 24px" }} id="field-lines">
          <AnalogyBox
            icon="比"
            title="河流的流線——不交叉、密代表流速快"
            desc="就像地圖上描繪河流流向的「流線」：流線越密，水流越急；流線不會交叉（兩個方向只能有一個）；流線是封閉的環形（水最終都回到海洋）。磁力線和流線的規律幾乎一模一樣！"
            color={C.green} accent={C.greenAccent} light={C.greenLight}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["特性①", "磁力線的切線方向 = 該點磁場的方向"],
              ["特性②", "磁鐵外部：由 N 極出發 → 到 S 極；磁鐵內部：由 S 極 → 回到 N 極（形成封閉迴路）"],
              ["特性③", "磁力線封閉（靜磁中無起點終點，不同於電場線）"],
              ["特性④", "磁力線不相交（同一點只有一個磁場方向）"],
              ["特性⑤", "磁力線不是磁鐵的運動軌跡，只是描述磁場分布的工具"],
              ["特性⑥", "磁力線越密 = 磁場越強；磁場強度 B = 磁力線數 / 截面積（m²）"],
            ].map(([label, text], i) => (
              <DetailRow key={i} label={label} text={text} color={C.green} accent={C.greenAccent} even={i % 2 === 0} />
            ))}
          </div>
        </div>
      </Card>

      {/* ─── 3. 右手螺旋定則 + 符號 ─── */}
      <Card>
        <CardHeader title="③ 右手螺旋定則 & 符號約定" subtitle="Right-Hand Screw Rule" color={C.orange} accent={C.orangeAccent} light={C.orangeLight} />
        <div style={{ padding: "20px 24px" }} id="right-hand">
          <AnalogyBox
            icon="比"
            title="扭瓶蓋——大拇指指向電流，手指轉向即磁場"
            desc="想像你在扭瓶蓋：大拇指朝向電流流動的方向（就像把大拇指對準前進方向），然後四指自然彎曲的方向，就是磁力線環繞的方向。這就是「右手螺旋定則」。⊗ 符號就像箭頭的尾巴（飛鏢插入板子），⊙ 符號就像箭頭的頭對著你（飛鏢朝你飛來）。"
            color={C.orange} accent={C.orangeAccent} light={C.orangeLight}
          />

          <div style={{ background: C.orangeLight, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
            <MagneticFieldIllustration />
          </div>

          {/* Symbol table */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
            {[
              { sym: "⊗", label: "穿入紙面（向遠離你）", analogy: "飛鏢尾巴", color: C.red, light: C.redLight },
              { sym: "⊙", label: "穿出紙面（朝向你）", analogy: "飛鏢頭部", color: C.blue, light: C.blueLight },
            ].map((s) => (
              <div key={s.sym} style={{ background: s.light, border: `1px solid ${s.color}33`, borderRadius: 12, padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.sym}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>比喻：{s.analogy}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ─── 4. 三種磁場 ─── */}
      <Card>
        <CardHeader title="④ 常見的三種磁場" subtitle="Here 磁學" color={C.purple} accent={C.purpleAccent} light={C.purpleLight} />
        <div style={{ padding: "20px 24px" }} id="three-fields">
          <AnalogyBox
            icon="比"
            title="直水管 / 游泳圈 / 螺旋彈簧——三種不同磁場形狀"
            desc="把水管的水流比作電流：直水管（長直導線）漣漪向外擴散；把水管彎成游泳圈（圓線圈）磁場集中在圓心；把水管捲成彈簧（螺線管）所有漩渦方向一致疊加，磁場被大幅加強，就像一顆強力磁鐵！"
            color={C.purple} accent={C.purpleAccent} light={C.purpleLight}
          />

          <div style={{ background: C.purpleLight, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
            <ThreeMagneticsIllustration />
          </div>

          {/* Formula comparison table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.purple + "15" }}>
                  {["類型", "公式", "關鍵變數", "比喻"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: C.purpleAccent, fontWeight: 700, borderBottom: `2px solid ${C.purple}33` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["長直導線", "B = μ₀I / 2πR", "R = 距導線距離", "直水管的漣漪"],
                  ["圓線圈中心", "B = μ₀I / 2R", "R = 線圈半徑", "游泳圈圓心"],
                  ["螺線管內部", "B = μ₀nI", "n = N/L（匝/公尺）", "螺旋彈簧磁場疊加"],
                ].map(([type, formula, key, analogy], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fafaf8" : "transparent" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 700, color: C.purpleAccent }}>{type}</td>
                    <td style={{ padding: "10px 12px", fontFamily: "monospace", fontWeight: 700, color: "#333" }}>{formula}</td>
                    <td style={{ padding: "10px 12px", color: "#555" }}>{key}</td>
                    <td style={{ padding: "10px 12px", color: "#888" }}>{analogy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SideNote
            text={"μ₀ = 4π×10⁻⁷ T·m/A，稱為「真空磁導率」（一個常數，不需要記推導，考試會給）。\n三個公式的共同點：B 都和電流 I 成正比——電流越大，磁場越強。"}
            color={C.purple}
          />
        </div>
      </Card>

      {/* ─── 5. 安培力 ─── */}
      <Card>
        <CardHeader title="⑤ 安培力（載流導線在磁場中受力）" subtitle="Ampere Force  F = BIL sinθ" color={C.red} accent={C.redAccent} light={C.redLight} />
        <div style={{ padding: "20px 24px" }} id="ampere">
          <AnalogyBox
            icon="比"
            title="木頭放在水流中——被推向側邊"
            desc="一根木頭（導線）放在流動的河水（磁場）中，木頭方向和水流方向成某個角度。水流會對木頭施加一個垂直於水流和木頭都垂直的側向力——這就是安培力。電流方向和磁場方向的「外積」決定力的方向，用右手定則判斷。"
            color={C.red} accent={C.redAccent} light={C.redLight}
          />

          <div style={{ background: C.redLight, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
            <AmpereForceDiagram />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            <DetailRow label="公式" text="F = BIL sinθ（θ 為電流 I 方向與磁場 B 方向的夾角）" color={C.red} accent={C.redAccent} even={true} />
            <DetailRow label="最大力" text="θ = 90°（I ⊥ B 垂直時）→ F = BIL（最大）" color={C.red} accent={C.redAccent} even={false} />
            <DetailRow label="零安培力" text="θ = 0° 或 180°（I // B 平行時）→ F = 0" color={C.red} accent={C.redAccent} even={true} />
            <DetailRow label="方向判斷①" text="右手螺旋（數學外積）：四指由 I 方向彎向 B 方向，大拇指 = F 方向（最通用）" color={C.red} accent={C.redAccent} even={false} />
            <DetailRow label="方向判斷②" text="右手開掌定則：四指朝 I 方向，磁場 B 穿過掌心，大拇指 = F（只適用 I⊥B）" color={C.red} accent={C.redAccent} even={true} />
            <DetailRow label="方向判斷③" text="左手佛萊明定則：食指 = B，中指 = I，大拇指 = F（三者互相垂直時使用）" color={C.red} accent={C.redAccent} even={false} />
          </div>

          <SideNote
            text={"三種力的統一記憶（學測常考）：\n重力 F = GMm/r²　庫侖力 F = kQq/r²　安培力 F⃗ = iL⃗ × B⃗\n備註：不用三種方向判斷法都學，選最順手的一種就夠了！"}
            color={C.red}
          />
        </div>
      </Card>

      {/* ─── 6. 電流計 vs 電壓計 ─── */}
      <Card>
        <CardHeader title="⑥ 電流計 vs 電壓計" subtitle="安培計 · 伏特計 · 三用電表" color={C.green} accent={C.greenAccent} light={C.greenLight} />
        <div style={{ padding: "20px 24px" }} id="meters">
          <AnalogyBox
            icon="比"
            title="計流量 vs 量水位——串在水管內 vs 量兩端落差"
            desc="要量水管的「流量」（電流），要把測量儀器裝進水管裡一起測（串聯）；要量「水位落差」（電壓），只需要在管子兩端各插一根探針比高低（並聯）。串聯的儀器本身阻力要越小越好（不影響水流）；並聯的儀器本身阻力要越大越好（不分走水流）。"
            color={C.green} accent={C.greenAccent} light={C.greenLight}
          />

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.green + "15" }}>
                  {["", "電流計（安培計）", "電壓計（伏特計）"].map((h, i) => (
                    <th key={i} style={{ padding: "10px 14px", textAlign: "left", color: C.greenAccent, fontWeight: 700, borderBottom: `2px solid ${C.green}33` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["別名", "安培計 / 電流計", "伏特計 / 電壓計"],
                  ["符號", "A（圓圈內）", "V（圓圈內）"],
                  ["接法", "串聯", "並聯"],
                  ["理想電阻", "→ 0（越小越好，不影響電流）", "→ ∞（越大越好，不分走電流）"],
                  ["測量原理", "利用電流磁效應：電流通過線圈產生磁場，線圈在場中偏轉", "與電流計串聯大電阻，再並聯測量"],
                  ["偏向", "指針偏向 = 電子流方向（注意！不是電流方向）", "—"],
                ].map(([label, a, b], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fafaf8" : "transparent" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 700, color: C.greenAccent }}>{label}</td>
                    <td style={{ padding: "10px 12px", color: "#333" }}>{a}</td>
                    <td style={{ padding: "10px 12px", color: "#333" }}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SideNote
            text={"三用電表（萬用表）= 可測電壓(V) + 電流(A) + 電阻(Ω) 三合一。\n測電阻時，利用電表內的電池提供電壓，不需外部電源。"}
            color={C.green}
          />
        </div>
      </Card>

      {/* ─── Quiz ─── */}
      <section style={{ marginBottom: 36, background: "#fff", borderRadius: 16, border: "1px solid #e5e3de", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ background: "linear-gradient(135deg, #1A7D44, #27AE60)", padding: "20px 24px", color: "#fff" }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>自我測驗</h2>
          <span style={{ fontSize: 13, opacity: 0.8 }}>7 題，測一測電流磁效應的觀念！</span>
        </div>
        <div style={{ padding: "24px" }}>
          <Quiz41 />
        </div>
      </section>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "8px 0 32px", color: "#aaa", fontSize: 12 }}>
        基礎物理 第四章 電與磁 · 4-1 電流的磁效應
      </div>
    </div>
  );
}
