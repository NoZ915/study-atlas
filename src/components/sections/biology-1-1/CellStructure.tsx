import { CellMembrane, OrganelleScale, CellComparison } from "./Illustrations1-1";
import { Quiz11 } from "./Quiz1-1";

// ── Color palette ──
const C = {
  purple: "#9B51E0",
  purpleAccent: "#7B3DB5",
  purpleLight: "#F3EAFC",
  green: "#27AE60",
  greenAccent: "#1A7D44",
  greenLight: "#E3F9EC",
  blue: "#2D9CDB",
  blueAccent: "#1B6FA0",
  blueLight: "#E8F4FD",
  orange: "#F2994A",
  orangeAccent: "#C47A35",
  orangeLight: "#FDF0E2",
  red: "#E2574C",
  redAccent: "#B33D34",
  redLight: "#FDE8E7",
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

// ── Comparison table helper ──
function CompareTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: "auto", padding: "0 16px 16px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: "8px 12px", background: i === 0 ? "#f5f4f2" : i === 1 ? C.purpleLight : C.blueLight, color: i === 0 ? "#555" : i === 1 ? C.purpleAccent : C.blueAccent, fontWeight: 700, textAlign: "center", border: "1px solid #e5e3de" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} style={{ background: r % 2 === 0 ? "#fff" : "#fafaf8" }}>
              {row.map((cell, c) => (
                <td key={c} style={{ padding: "8px 12px", border: "1px solid #e5e3de", textAlign: c === 0 ? "left" : "center", fontWeight: c === 0 ? 600 : 400, color: "#333" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Organelle chip ──
function OrganelleTag({ name, layers, color }: { name: string; layers: string; color: string }) {
  return (
    <div style={{ background: color + "15", border: `1px solid ${color}40`, borderRadius: 10, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontWeight: 700, color, fontSize: 14 }}>{name}</span>
      <span style={{ fontSize: 12, color: "#666" }}>{layers}</span>
    </div>
  );
}

// ── Main export ──
export default function CellStructure() {
  return (
    <div style={{ fontFamily: "'Noto Sans TC', -apple-system, sans-serif", color: "#1a1a1a" }}>

      {/* ─── Story Banner ─── */}
      <div style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #2d1060 100%)", borderRadius: 16, padding: "28px 24px", marginBottom: 32, border: "1px solid #4a2080", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(155,81,224,0.15) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 28 }}>🧬</span>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#fff" }}>生命的基本單位——細胞</h1>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
            你的身體由 <strong style={{ color: "#C9A0E8" }}>37 兆個細胞</strong> 組成。每個細胞都是一個微型工廠——有能量生產線（粒線體）、蛋白質生產線（核糖體）、分泌包裝部門（高基氏體）……理解細胞的構造，就是理解生命運作的基礎。
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["細胞學說", "原核 vs 真核", "細胞膜", "各種胞器", "動植物比較"].map((tag) => (
              <span key={tag} style={{ background: "rgba(155,81,224,0.25)", color: "#C9A0E8", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Jump links ─── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {[
          { href: "#cell-theory", label: "細胞學說" },
          { href: "#cell-size", label: "大小與顯微鏡" },
          { href: "#prokaryote", label: "原核 vs 真核" },
          { href: "#membrane", label: "細胞膜" },
          { href: "#organelles", label: "各種胞器" },
          { href: "#compare", label: "動植物比較" },
        ].map(({ href, label }) => (
          <a key={href} href={href} style={{ fontSize: 13, padding: "6px 14px", borderRadius: 20, background: C.purpleLight, color: C.purpleAccent, textDecoration: "none", fontWeight: 600, border: `1px solid ${C.purple}30` }}>{label}</a>
        ))}
      </div>

      {/* ─── Card 1: 細胞學說 ─── */}
      <Card>
        <div id="cell-theory">
          <CardHeader title="細胞學說的發展" subtitle="Cell Theory — 誰發現了細胞？" color={C.purple} accent={C.purpleAccent} light={C.purpleLight} />
        </div>
        <div style={{ padding: "20px 24px" }}>
          <AnalogyBox
            icon="🏛"
            title="三大要點（現今細胞學說）"
            desc="① 所有生物體皆由細胞所組成。② 細胞是生物體構造和功能的基本單位，是生命最基本的單位。③ 細胞皆由原已存在的細胞分裂產生。"
            color={C.purple} accent={C.purpleAccent} light={C.purpleLight}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
            {[
              { label: "虎克（1665）", text: "用顯微鏡觀察軟木塞，看到蜂巢狀小空格，命名為「cell（細胞）」——實為死細胞，僅具細胞壁。", even: false },
              { label: "雷文霍克（1676）", text: "利用自製單式顯微鏡觀察到細菌、精子等微生物，是最早看到活細胞的人。", even: true },
              { label: "布朗（1831）", text: "觀察蘭花瓣細胞，發現細胞內有一球狀構造，命名為「nucleus（細胞核）」。", even: false },
              { label: "許來登（1838）", text: "提出「植物都是由細胞所構成」；觀察許多植物及不同部位後提出。", even: true },
              { label: "許旺（1839）", text: "提出「動物都是由細胞所構成」；與許來登共同提出細胞學說雛形。", even: false },
              { label: "魏修（1855）", text: "提出「細胞均由已存在的細胞分裂而來」，完善了現代細胞學說第三點。", even: true },
            ].map((r) => (
              <DetailRow key={r.label} label={r.label} text={r.text} color={C.purple} accent={C.purpleAccent} even={r.even} />
            ))}
          </div>

          <SideNote
            color={C.purple}
            text={"⚠ 辨正是非：虎克看到的是死細胞（軟木塞），僅有細胞壁，與一般所說的細胞構造不同。\n⚠ 細胞學說三要點提出者：許旺 + 許來登（①②）；魏修（③）。"}
          />
        </div>
      </Card>

      {/* ─── Card 2: 細胞大小 ─── */}
      <Card>
        <div id="cell-size">
          <CardHeader title="細胞的大小與顯微鏡" subtitle="多小才叫細胞？怎麼觀察？" color={C.blue} accent={C.blueAccent} light={C.blueLight} />
        </div>
        <div style={{ padding: "20px 24px" }}>
          <OrganelleScale />

          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "一般大小", text: "1～100 μm（微米）；原核細胞約 1～10 μm，真核細胞約 10～100 μm", even: false },
              { label: "最小細胞", text: "球菌，細菌 0.1～10 μm，絕大多數介於 0.2～2.0 μm", even: true },
              { label: "最大細胞", text: "鴕鳥的卵細胞（雞卵約 5 cm，蛙卵 1～2 mm）", even: false },
              { label: "最長細胞", text: "人類坐骨神經細胞延伸出的神經纖維可長達 1 米", even: true },
            ].map((r) => (
              <DetailRow key={r.label} label={r.label} text={r.text} color={C.blue} accent={C.blueAccent} even={r.even} />
            ))}
          </div>

          <div style={{ marginTop: 16, padding: "14px 16px", background: C.blueLight, borderRadius: 10 }}>
            <p style={{ margin: "0 0 8px", fontWeight: 700, color: C.blueAccent, fontSize: 14 }}>顯微鏡種類</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#444" }}>
              <div><strong>光學顯微鏡（L.M.）</strong>：解像力約 0.2 μm，放大約 1000～1500 倍；可觀察細胞核等構造。</div>
              <div><strong>穿透式電子顯微鏡（TEM）</strong>：解像力約 0.002 μm（2 nm），可觀察細胞內微細構造（如病毒、核糖體）。</div>
              <div><strong>掃描式電子顯微鏡（SEM）</strong>：可觀察細胞外部三維形態，放大約數萬倍。</div>
            </div>
          </div>

          <SideNote
            color={C.blue}
            text={"長度換算：1 m = 10³ mm = 10⁶ μm = 10⁹ nm\n細胞大小限制原因：表面積 / 體積比過低 → 物質補給速率不足 → 細胞不能無限變大"}
          />
        </div>
      </Card>

      {/* ─── Card 3: 原核 vs 真核 ─── */}
      <Card>
        <div id="prokaryote">
          <CardHeader title="原核細胞 vs 真核細胞" subtitle="Prokaryote vs Eukaryote" color={C.green} accent={C.greenAccent} light={C.greenLight} />
        </div>
        <div style={{ padding: "20px 24px" }}>
          <CellComparison />
          <div style={{ height: 16 }} />
          <CompareTable
            headers={["比較項目", "原核細胞", "真核細胞"]}
            rows={[
              ["細胞核（核膜、核仁）", "✗ 不具有", "✓ 具有"],
              ["膜狀胞器", "✗ 不具有", "✓ 具有"],
              ["核糖體", "✓ 具有（70S）", "✓ 具有（80S）"],
              ["染色體形狀", "環狀 DNA（大多數）", "線狀 DNA，多條"],
              ["細胞壁成分", "肽聚糖（peptidoglycan）", "植物：纖維素；真菌：幾丁質"],
              ["分裂方式", "無絲分裂（二分裂）", "有絲分裂 / 減數分裂"],
              ["ATP 合成位置", "細胞質、細胞膜", "細胞質、粒線體"],
              ["代表生物", "藍綠菌、細菌（真細菌界）；古細菌界", "原生生物界、菌物界、植物界、動物界"],
            ]}
          />
          <SideNote
            color={C.green}
            text={"相同點：原核與真核細胞皆具有——細胞膜、細胞質、核酸（DNA 為遺傳物質）、核糖體。\n口訣：原核細胞「膜膜膜都沒有」——無核膜、無膜狀胞器。"}
          />
        </div>
      </Card>

      {/* ─── Card 4: 細胞膜 ─── */}
      <Card>
        <div id="membrane">
          <CardHeader title="細胞膜的構造" subtitle="Cell Membrane — 液體鑲嵌模型" color={C.orange} accent={C.orangeAccent} light={C.orangeLight} />
        </div>
        <div style={{ padding: "20px 24px" }}>
          <CellMembrane />

          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "磷脂", text: "排列成磷脂雙層（bilayer）；親水性頭部（磷酸基）朝外，疏水性尾部（脂肪酸）朝內。功能：區隔細胞內部與外在環境。", even: false },
              { label: "蛋白質（膜蛋白）", text: "鑲嵌於膜內、外側或貫穿；功能：運輸（通道蛋白/載體蛋白）、受體、標記（醣蛋白）、酶。", even: true },
              { label: "醣類", text: "位於細胞膜外側，附著於磷脂或蛋白質上（含量很少）。可作為生物體辨別自己或外來細胞的依據（如器官移植配對）。", even: false },
              { label: "膽固醇", text: "只見於動物細胞膜，位於脂雙層中。穩固細胞膜的流體特性，有助於維持膜的流動性。植物細胞膜不含膽固醇。", even: true },
            ].map((r) => (
              <DetailRow key={r.label} label={r.label} text={r.text} color={C.orange} accent={C.orangeAccent} even={r.even} />
            ))}
          </div>

          <AnalogyBox
            icon="🌊"
            title="液體鑲嵌模型（Fluid Mosaic Model）"
            desc="細胞膜組成分子是動態的，可以個別移動。蛋白質像浮島鑲嵌在磷脂海洋中——故稱「液體鑲嵌模型」。實驗證明：將人類細胞（紅色膜蛋白）與老鼠細胞（綠色膜蛋白）融合，40分鐘後兩種顏色均勻分布於整個細胞膜。"
            color={C.orange} accent={C.orangeAccent} light={C.orangeLight}
          />

          <SideNote
            color={C.orange}
            text={"細胞膜 = 原生質膜（plasmalemma / plasma membrane），為單層膜。\n內膜系統（endomembrane system）：細胞膜、核膜、內質網、高基氏體、溶體等，皆源自內質網膜；粒線體、葉綠體不屬於內膜系統。"}
          />
        </div>
      </Card>

      {/* ─── Card 5: 各種胞器 ─── */}
      <Card>
        <div id="organelles">
          <CardHeader title="各種胞器的構造與功能" subtitle="Organelles — 細胞內的分工" color={C.red} accent={C.redAccent} light={C.redLight} />
        </div>
        <div style={{ padding: "20px 24px" }}>

          {/* Membrane type overview */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontWeight: 700, color: C.redAccent, fontSize: 14, marginBottom: 10 }}>胞器依膜層分類</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
              <OrganelleTag name="葉綠體" layers="雙層膜" color={C.green} />
              <OrganelleTag name="粒線體" layers="雙層膜" color={C.green} />
              <OrganelleTag name="核膜" layers="雙層膜" color={C.blue} />
              <OrganelleTag name="內質網" layers="單層膜" color={C.orange} />
              <OrganelleTag name="高基氏體" layers="單層膜" color={C.orange} />
              <OrganelleTag name="溶體" layers="單層膜" color={C.orange} />
              <OrganelleTag name="液泡" layers="單層膜" color={C.orange} />
              <OrganelleTag name="核糖體" layers="不具膜" color={C.purple} />
              <OrganelleTag name="中心體" layers="不具膜" color={C.purple} />
            </div>
          </div>

          {/* Individual organelles */}
          {[
            {
              name: "葉綠體（Chloroplast）",
              color: C.green, accent: C.greenAccent, light: C.greenLight,
              rows: [
                { label: "構造", text: "雙層膜；內有基質（stroma，進行碳反應）與葉綠餅（grana，由類囊體堆疊而成，進行光反應）。" },
                { label: "功能", text: "進行光合作用，將光能轉為化學能（葡萄糖）。" },
                { label: "特點", text: "半自主胞器：含 DNA、RNA、核糖體，能自行合成部分蛋白質並自我複製，但仍受細胞核調控。來源：光合原核生物共生（內共生學說）。" },
                { label: "分布", text: "植物綠色細胞與藻類細胞特有；分布於整個細胞質中。" },
              ],
            },
            {
              name: "粒線體（Mitochondria）",
              color: C.blue, accent: C.blueAccent, light: C.blueLight,
              rows: [
                { label: "構造", text: "雙層膜；外膜平滑，內膜向內凹陷形成許多皺褶（cristae，內嶺）。基質（內隔室）含 DNA、RNA、核糖體及克氏循環相關的酶。" },
                { label: "功能", text: "進行有氧呼吸，產生 ATP（「細胞的能量工廠」）。" },
                { label: "特點", text: "半自主胞器；粒線體為母系遺傳（來自卵細胞）；代謝旺盛的細胞（心肌、肝、精子）含較多粒線體。原核生物 ATP 合成在細胞膜上。" },
                { label: "分布", text: "所有真核細胞均具有；分布於整個細胞質中。" },
              ],
            },
            {
              name: "核糖體（Ribosome）",
              color: C.purple, accent: C.purpleAccent, light: C.purpleLight,
              rows: [
                { label: "構造", text: "不具膜，呈顆粒狀，有大、小兩個次單元（均由 rRNA 和蛋白質組成）。原核：70S；真核：80S。" },
                { label: "功能", text: "合成蛋白質的場所。" },
                { label: "位置", text: "①附著在內質網和細胞核表面（合成分泌性蛋白）；②游離於細胞質中（合成細胞質內的酶）；③葉綠體內；④粒線體內。" },
                { label: "分布", text: "所有細胞內均有（原核與真核皆有）。" },
              ],
            },
            {
              name: "內質網（Endoplasmic Reticulum, ER）",
              color: C.orange, accent: C.orangeAccent, light: C.orangeLight,
              rows: [
                { label: "構造", text: "單層膜；由膜摺疊成的扁平囊狀或細管狀構造，形成連續的網狀系統；一端連核膜，另一端靠近細胞膜。" },
                { label: "粗糙內質網（RER）", text: "表面有核糖體附著，呈扁平囊狀。功能：進行蛋白質的修飾（糖化形成醣蛋白）與運輸 → 細胞膜蛋白、分泌性蛋白、溶體蛋白。" },
                { label: "平滑內質網（SER）", text: "無核糖體附著，細管狀。功能：脂類合成的場所（磷脂質、膽固醇的合成）；肝細胞的解毒作用。" },
                { label: "分布", text: "所有真核細胞均有。" },
              ],
            },
            {
              name: "高基氏體（Golgi Body）",
              color: C.teal, accent: C.tealAccent, light: C.tealLight,
              rows: [
                { label: "構造", text: "單層膜；由數個排列整齊的扁囊相疊而成，周圍有許多大小不等的囊泡；光學顯微鏡下可見。" },
                { label: "功能", text: "細胞的分泌中心：修飾、分類、包裝合成物（蛋白質、脂質、多醣類），形成囊泡運輸或分泌。溶體也由高基氏體形成。" },
                { label: "特點", text: "分泌旺盛的細胞（腺體細胞、神經細胞）內特別發達；除成熟精細胞及紅血球外，其他真核細胞均有高基氏體。" },
              ],
            },
            {
              name: "溶體（Lysosome）",
              color: C.red, accent: C.redAccent, light: C.redLight,
              rows: [
                { label: "構造", text: "單層膜，囊泡狀；來自高基氏體；含多種水解酶（適合在酸性下作用）。" },
                { label: "功能", text: "①分解經吞噬作用進入細胞的物質（胞內消化），如白血球消化細菌；②分解老舊或損壞的胞器；③胚胎發育中分解特定組織（如手指間的蹼）。" },
                { label: "特點", text: "老化或死亡細胞的溶體會自發破裂，釋出水解酶消化細胞，稱為「自解作用（autolysis）」，故又稱「自殺袋」。" },
              ],
            },
            {
              name: "液泡（Vacuole）",
              color: C.orange, accent: C.orangeAccent, light: C.orangeLight,
              rows: [
                { label: "植物細胞液泡", text: "大型（成熟細胞常有中央液泡）；功能：①貯存水分，產生膨壓以維持細胞形狀；②儲存醣類、蛋白質、色素（花青素）及有毒代謝物等。" },
                { label: "伸縮泡", text: "草履蟲、單細胞藻、變形蟲等具有，功能為排除體內多餘水分。" },
                { label: "食泡", text: "溶體 + 食泡 → 融合後進行胞內消化（草履蟲、變形蟲）。" },
              ],
            },
            {
              name: "中心體（Centrosome）",
              color: C.purple, accent: C.purpleAccent, light: C.purpleLight,
              rows: [
                { label: "構造", text: "不具膜；動物細胞的中心體含兩個中心粒（centriole），每個中心粒由 9 束三聯微管（9+0）排列而成，彼此垂直。" },
                { label: "功能", text: "與細胞分裂時紡錘絲的形成有關；與鞭毛、纖毛的形成有關。" },
                { label: "分布", text: "動物細胞具有中心粒；高等植物細胞沒有中心粒（但仍有微管組織中心 MTOC，可形成紡錘絲）。" },
              ],
            },
          ].map(({ name, color, accent, light, rows }) => (
            <div key={name} style={{ marginBottom: 16, border: `1px solid ${color}30`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: light, padding: "10px 14px", borderBottom: `1px solid ${color}25` }}>
                <span style={{ fontWeight: 700, color: accent, fontSize: 14 }}>{name}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "8px" }}>
                {rows.map((r, i) => (
                  <DetailRow key={r.label} label={r.label} text={r.text} color={color} accent={accent} even={i % 2 === 1} />
                ))}
              </div>
            </div>
          ))}

          <SideNote
            color={C.red}
            text={"重要整理：\n• 含 DNA 的構造：葉綠體、粒線體、細胞核（染色質）\n• 能自行合成 ATP 的構造：葉綠體、粒線體\n• 半自主胞器：葉綠體、粒線體（有自己的 DNA、RNA、核糖體）\n• 必須在電子顯微鏡下才可見：核糖體、內質網\n• 光學顯微鏡下可見：高基氏體、溶體、液泡、粒線體（光鏡下呈粒狀或線狀）"}
          />
        </div>
      </Card>

      {/* ─── Card 6: 動植物比較 ─── */}
      <Card>
        <div id="compare">
          <CardHeader title="動物細胞 vs 植物細胞" subtitle="誰有誰沒有？一表搞定" color={C.teal} accent={C.tealAccent} light={C.tealLight} />
        </div>
        <div style={{ padding: "4px 0 20px" }}>
          <CompareTable
            headers={["構造", "植物細胞", "動物細胞"]}
            rows={[
              ["細胞壁", "✓（纖維素）", "✗"],
              ["葉綠體", "✓（綠色細胞）", "✗"],
              ["中心粒", "✗（高等植物）", "✓"],
              ["液泡", "✓（大型中央液泡）", "✓（小型）"],
              ["細胞核", "✓", "✓"],
              ["粒線體", "✓", "✓"],
              ["核糖體", "✓", "✓"],
              ["內質網", "✓", "✓"],
              ["高基氏體", "✓", "✓（分泌細胞發達）"],
              ["溶體", "有爭議", "✓"],
              ["細胞膜", "✓（無膽固醇）", "✓（含膽固醇）"],
            ]}
          />
          <div style={{ padding: "0 16px" }}>
            <SideNote
              color={C.teal}
              text={"植物細胞特有（動物沒有）：細胞壁、葉綠體、大型液泡\n動物細胞特有（植物沒有）：中心粒、膽固醇（細胞膜中）\n共同特有：細胞膜、細胞核、細胞質、粒線體、核糖體、內質網、高基氏體、液泡"}
            />
          </div>
        </div>
      </Card>

      {/* ─── Quiz ─── */}
      <div style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.purpleAccent, marginBottom: 16 }}>🧪 觀念測驗</h2>
        <Quiz11 />
      </div>

      {/* ─── Footer ─── */}
      <div style={{ textAlign: "center", padding: "20px 0", color: "#aaa", fontSize: 12 }}>
        生物 1-1 細胞的構造｜內容依據 113 年高中基礎生物精通及龍騰複習講義
      </div>
    </div>
  );
}
