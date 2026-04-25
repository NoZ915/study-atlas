import katex from "katex";
import "katex/dist/katex.min.css";

const C = {
  red: "#E2574C",
  redAccent: "#B33D34",
  redLight: "#FDE8E7",
  orange: "#F2994A",
  orangeAccent: "#C47A35",
  orangeLight: "#FDF0E2",
  blue: "#2D9CDB",
  blueAccent: "#1B6FA0",
  blueLight: "#E8F4FD",
  green: "#27AE60",
  greenAccent: "#1A7D44",
  greenLight: "#E3F9EC",
};

type Formula = {
  title: string;
  latex: string;
  note?: string;
};

type StudySection = {
  id: string;
  code: string;
  title: string;
  summary: string;
  color: string;
  accent: string;
  light: string;
  cues: React.ReactNode[];
  pitfalls: React.ReactNode[];
  formulas: Formula[];
};

function renderLatex(latex: string, displayMode = false) {
  return katex.renderToString(latex, {
    throwOnError: false,
    displayMode,
    output: "html",
    strict: "ignore",
  });
}

function InlineMath({ latex }: { latex: string }) {
  return <span dangerouslySetInnerHTML={{ __html: renderLatex(latex) }} />;
}

function BlockMath({ latex }: { latex: string }) {
  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: renderLatex(latex, true) }}
        style={{
          width: "100%",
          boxSizing: "border-box",
          overflowX: "auto",
          overflowY: "hidden",
          padding: "4px 0",
          color: "#2f2420",
        }}
      />
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section
      style={{
        marginBottom: 24,
        width: "100%",
        boxSizing: "border-box",
        background: "#fff",
        borderRadius: 18,
        border: "1px solid #eadfd8",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(113,71,46,0.05)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function Pill({
  children,
  color,
  background,
}: {
  children: React.ReactNode;
  color: string;
  background: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        color,
        background,
      }}
    >
      {children}
    </span>
  );
}

function BulletList({
  title,
  items,
  color,
}: {
  title: string;
  items: React.ReactNode[];
  color: string;
}) {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 900, color, marginBottom: 10 }}>{title}</div>
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              fontSize: 15,
              lineHeight: 1.85,
              color: "#3f332f",
            }}
          >
            <span style={{ color, fontWeight: 900, lineHeight: 1.6 }}>•</span>
            <div style={{ flex: 1, minWidth: 0 }}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormulaCard({
  title,
  latex,
  note,
  color,
  light,
}: Formula & { color: string; light: string }) {
  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 16,
        border: `1px solid ${color}2c`,
        background: light,
        padding: 16,
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 900, color, marginBottom: 10 }}>{title}</div>
      <BlockMath latex={latex} />
      {note && <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.8, color: "#6b5953" }}>{note}</div>}
    </div>
  );
}

const sections: StudySection[] = [
  {
    id: "part-1-1",
    code: "1-1",
    title: "乘法公式與有理數",
    summary: "先把代數底層穩住。這一節是後面多項式、數列、機率和指對數的共同起點。",
    color: C.red,
    accent: C.redAccent,
    light: C.redLight,
    cues: [
      <>看到平方差、完全平方、立方和差時，先想能不能直接因式分解。</>,
      <>看到循環小數時，先問自己能不能化成分數。</>,
      <>遇到分式限制時，先檢查分母是否可能等於 <InlineMath latex="0" />。</>,
    ],
    pitfalls: [
      <>完全平方和平方差混在一起，展開前沒有先判斷是哪一種公式。</>,
      <>
        忘記有理數一定可以寫成 <InlineMath latex="\dfrac{p}{q}" />，而且 <InlineMath latex="q\neq 0" />。
      </>,
      <>看到循環節很多位時，沒有先設未知數再消去循環部分。</>,
    ],
    formulas: [
      {
        title: "有理數定義",
        latex: String.raw`\frac{p}{q},\quad p,q\in\mathbb{Z},\quad q\neq 0`,
        note: "整數、有限小數、循環小數都屬於有理數。",
      },
      {
        title: "平方公式",
        latex: String.raw`(a+b)^2=a^2+2ab+b^2,\qquad (a-b)^2=a^2-2ab+b^2`,
      },
      {
        title: "平方差",
        latex: String.raw`a^2-b^2=(a+b)(a-b)`,
      },
      {
        title: "立方公式",
        latex: String.raw`(a+b)^3=a^3+3a^2b+3ab^2+b^3,\qquad (a-b)^3=a^3-3a^2b+3ab^2-b^3`,
      },
      {
        title: "立方和差",
        latex: String.raw`a^3+b^3=(a+b)(a^2-ab+b^2),\qquad a^3-b^3=(a-b)(a^2+ab+b^2)`,
      },
    ],
  },
  {
    id: "part-1-2",
    code: "1-2",
    title: "根數運算與實數",
    summary: "把數系從有理數擴到實數，核心是根式化簡、有理化和實數分類。",
    color: C.orange,
    accent: C.orangeAccent,
    light: C.orangeLight,
    cues: [
      <>根號內有完全平方因數時，先提出來再運算。</>,
      <>分母有根號時，通常要先有理化。</>,
      <>看到無限不循環小數時，要辨認它屬於無理數。</>,
    ],
    pitfalls: [
      <>把根號對加法也直接拆開，沒有先確認是不是乘法或除法結構。</>,
      <>
        忘記 <InlineMath latex="\sqrt{x^2}=|x|" />，不是直接等於 <InlineMath latex="x" />。
      </>,
      <>分類實數時，把無理數誤當成有理數。</>,
    ],
    formulas: [
      {
        title: "根式基本性質",
        latex: String.raw`\sqrt{ab}=\sqrt a\,\sqrt b\ (a,b\ge 0),\qquad \sqrt{\frac{a}{b}}=\frac{\sqrt a}{\sqrt b}\ (a\ge 0,b>0)`,
      },
      {
        title: "有理化分母",
        latex: String.raw`\frac{1}{\sqrt a}=\frac{\sqrt a}{a},\qquad \frac{1}{a+\sqrt b}=\frac{a-\sqrt b}{a^2-b}`,
      },
      {
        title: "雙重根號常見拆法",
        latex: String.raw`\sqrt{m+2\sqrt n}=\sqrt a+\sqrt b,\qquad a+b=m,\quad ab=n`,
        note: "當題目長得像兩個根號相加的平方時，可以用和與積回推。",
      },
      {
        title: "實數包含關係",
        latex: String.raw`\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}`,
        note: "無理數屬於實數，但不屬於有理數。",
      },
    ],
  },
  {
    id: "part-1-3",
    code: "1-3",
    title: "絕對值",
    summary: "絕對值本質上是距離。這一節會直接連到不等式、座標距離和函數圖形。",
    color: C.blue,
    accent: C.blueAccent,
    light: C.blueLight,
    cues: [
      <>
        看到 <InlineMath latex="|x-a|" /> 時，先想成數線上離 <InlineMath latex="a" /> 的距離。
      </>,
      <>解絕對值方程式前，先判斷右邊是否可能為負。</>,
      <>解絕對值不等式時，要分清楚「距離小於某值」和「距離大於某值」。</>,
    ],
    pitfalls: [
      <>沒有分段或沒有用距離圖像，就直接把絕對值拆掉。</>,
      <>
        把 <InlineMath latex="|x|<a" /> 和 <InlineMath latex="|x|>a" /> 的解集方向搞反。
      </>,
      <>
        忘記當 <InlineMath latex="a<0" /> 時，<InlineMath latex="|x|=a" /> 無解。
      </>,
    ],
    formulas: [
      {
        title: "絕對值定義",
        latex: String.raw`|x|=\begin{cases}x,&x\ge 0\\-x,&x<0\end{cases}`,
      },
      {
        title: "距離觀念",
        latex: String.raw`|x-a|=\text{點 }x\text{ 到 }a\text{ 的距離}`,
      },
      {
        title: "絕對值方程式",
        latex: String.raw`|x-a|=r\ (r\ge 0)\iff x=a\pm r`,
      },
      {
        title: "絕對值不等式",
        latex: String.raw`|x-a|<r\iff a-r<x<a+r,\qquad |x-a|>r\iff x<a-r\ \text{或}\ x>a+r`,
      },
    ],
  },
  {
    id: "part-1-4",
    code: "1-4",
    title: "指數與常用對數",
    summary: "這節不只是背公式，重點是把指數、對數、常用對數的語言接起來。後面第九章的指對數函數，基本上就是建在這裡。",
    color: C.green,
    accent: C.greenAccent,
    light: C.greenLight,
    cues: [
      <>看到同底數冪次時，先整理成同底再計算。</>,
      <>
        位數估算題通常要先轉成 <InlineMath latex="10^n" /> 的形式。
      </>,
      <>
        對數式先檢查：真數 <InlineMath latex=">0" />、底數 <InlineMath latex=">0" /> 且 <InlineMath latex="\neq 1" />。
      </>,
      <>
        看到常用對數時，預設底數就是 <InlineMath latex="10" />，也就是 <InlineMath latex="\log x=\log_{10}x" />。
      </>,
    ],
    pitfalls: [
      <>把對數律亂套到加法或減法，沒有先確認題目是乘法、除法還是次方。</>,
      <>忘記檢查對數的定義條件。</>,
      <>
        位數題沒有先想到 <InlineMath latex="\lfloor \log_{10}N\rfloor+1" />。
      </>,
      <>
        把 <InlineMath latex="\log_a b" /> 和 <InlineMath latex="\log_b a" /> 當成一樣的量。
      </>,
    ],
    formulas: [
      {
        title: "指數律",
        latex: String.raw`a^m\cdot a^n=a^{m+n},\qquad \frac{a^m}{a^n}=a^{m-n},\qquad (a^m)^n=a^{mn}`,
      },
      {
        title: "負指數與分數指數",
        latex: String.raw`a^{-n}=\frac{1}{a^n},\qquad a^{\frac{m}{n}}=\sqrt[n]{a^m}`,
      },
      {
        title: "對數定義",
        latex: String.raw`\log_a b=c\iff a^c=b,\qquad a>0,\ a\neq 1,\ b>0`,
      },
      {
        title: "常用對數",
        latex: String.raw`\log x=\log_{10}x`,
        note: "你 PDF 裡做位數估算時用的就是常用對數，底數沒有特別寫時通常就是 10。",
      },
      {
        title: "對數律",
        latex: String.raw`\log_a(xy)=\log_a x+\log_a y,\qquad \log_a\left(\frac{x}{y}\right)=\log_a x-\log_a y,\qquad \log_a(x^r)=r\log_a x`,
      },
      {
        title: "換底公式",
        latex: String.raw`\log_a b=\frac{\log_c b}{\log_c a}`,
      },
      {
        title: "位數估算",
        latex: String.raw`\text{若 }N\in\mathbb{N},\qquad \text{位數}=\lfloor \log_{10}N\rfloor+1`,
        note: "你 PDF 裡那種用常用對數估位數的題目，核心就是這條。",
      },
      {
        title: "估算大型數字的寫法",
        latex: String.raw`N=a\times 10^n,\qquad 1\le a<10`,
        note: "先把數字寫成這種形式，再用對數拆成整數部分和小數部分，會比較好判斷位數與首位數量級。",
      },
    ],
  },
];

export default function NumberAndExpression() {
  return (
    <div style={{ fontFamily: "'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif", color: "#1a1a1a" }}>
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          background: "linear-gradient(135deg, #2b1310 0%, #5e261e 56%, #a53d2e 100%)",
          borderRadius: 20,
          padding: "28px 24px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -20,
            top: -20,
            width: 180,
            height: 180,
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            filter: "blur(10px)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.24em", color: "rgba(255,255,255,0.74)", marginBottom: 10 }}>
            ROUND 1 · CHAPTER 1
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>第一章 數與式</h1>
          <p style={{ margin: "12px 0 0", maxWidth: 760, fontSize: 14, lineHeight: 1.9, color: "rgba(255,255,255,0.84)" }}>
            我先依照你原本 PDF 的第一章重整成可複習版。這版不是單純把筆記貼上來，而是把內容拆成四個可收合的小節，
            每節都整理成「題目訊號、常見錯誤、核心公式」三層，方便你之後重讀時快速叫回來。
          </p>
        </div>
      </div>

      <Card style={{ background: "#fffaf7" }}>
        <div style={{ padding: 18 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <Pill color={C.redAccent} background={C.redLight}>1-1 代數底層</Pill>
            <Pill color={C.orangeAccent} background={C.orangeLight}>1-2 根式與實數</Pill>
            <Pill color={C.blueAccent} background={C.blueLight}>1-3 距離與不等式</Pill>
            <Pill color={C.greenAccent} background={C.greenLight}>1-4 指對數前置</Pill>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.9, color: "#584742" }}>
            這章和後面很多單元會連在一起：
            <span style={{ fontWeight: 800, color: C.redAccent }}> 多項式</span> 會一直回來用乘法公式，
            <span style={{ fontWeight: 800, color: C.blueAccent }}> 直線與座標</span> 會吃絕對值的距離觀念，
            <span style={{ fontWeight: 800, color: C.greenAccent }}> 第九章指對數函數</span> 則是直接接在 1-4 後面。
          </div>
        </div>
      </Card>

      {sections.map((section) => (
        <Card key={section.id}>
          <details>
            <summary
              style={{
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                listStyle: "none",
                cursor: "pointer",
                padding: "18px 20px",
                background: section.light,
                borderBottom: `1px solid ${section.color}24`,
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ maxWidth: 720 }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: section.accent }}>{section.code}</div>
                  <div style={{ marginTop: 4, fontSize: 22, fontWeight: 900, color: section.accent }}>{section.title}</div>
                  <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.8, color: "#5f4b45" }}>{section.summary}</div>
                </div>
                <Pill color={section.accent} background="#fff">點開看公式</Pill>
              </div>
            </summary>

            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: "grid",
                  gap: 20,
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  marginBottom: 20,
                }}
              >
                <BulletList title="題目訊號" items={section.cues} color={section.accent} />
                <BulletList title="常見錯誤" items={section.pitfalls} color={section.accent} />
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {section.formulas.map((formula) => (
                  <FormulaCard
                    key={formula.title}
                    title={formula.title}
                    latex={formula.latex}
                    note={formula.note}
                    color={section.color}
                    light={section.light}
                  />
                ))}
              </div>
            </div>
          </details>
        </Card>
      ))}

      <Card>
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#2f2420", marginBottom: 12 }}>第一章讀法建議</div>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              "先把 1-1 和 1-2 穩住，因為後面幾乎所有代數式變形都會回來用這兩塊。",
              "1-3 不要只背公式，要一直把它想成『距離』，這樣到座標平面才不會斷掉。",
              "1-4 讀完之後最適合直接接第九章，因為那時候你剛好把運算規則和函數圖形接起來。",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a3b36",
                }}
              >
                <span style={{ color: C.redAccent, fontWeight: 900 }}>→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
