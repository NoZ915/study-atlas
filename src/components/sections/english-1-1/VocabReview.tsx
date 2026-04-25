import { useState, useEffect, useMemo, useCallback } from "react";

function speak(word: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-US";
  window.speechSynthesis.speak(utter);
}

function SpeakButton({ word, size = 14 }: { word: string; size?: number }) {
  const [speaking, setSpeaking] = useState(false);
  const handle = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-US";
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };
  return (
    <button
      onClick={(e) => { e.stopPropagation(); handle(); }}
      title={`朗讀 "${word}"`}
      style={{
        background: speaking ? `${COLOR}22` : "transparent",
        border: `1.5px solid ${speaking ? COLOR : "#ddd"}`,
        borderRadius: 99,
        width: size + 16,
        height: size + 16,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size,
        flexShrink: 0,
        transition: "all 0.15s",
        color: speaking ? ACCENT : "#aaa",
      }}
    >
      {speaking ? "🔊" : "🔈"}
    </button>
  );
}

interface VocabEntry {
  word: string;
  pos: string;
  level: number;
  content: {
    core_meaning: string;
    ipa: string;
    definitions: { en: string; cn: string }[];
    related_words: string;
    collocations: { phrase: string; cn: string }[];
    examples: { en: string; cn: string }[];
    task?: { instruction: string; demo_en: string; demo_cn: string };
  };
}

type Mode = "browse" | "flashcard" | "quiz" | "analyze";

const COLOR = "#1ABC9C";
const ACCENT = "#148F77";
const LIGHT = "#E8F8F5";
const PAGE_SIZE = 20;
const BASE_URL = import.meta.env.BASE_URL;
const withBase = (path: string) =>
  `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
const VOCAB_JSON_URL = withBase("full_vocab_content.json");

const LEVEL_COLOR: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: "#DCFCE7", text: "#166534", label: "L1" },
  2: { bg: "#D1FAE5", text: "#065F46", label: "L2" },
  3: { bg: "#FEF3C7", text: "#92400E", label: "L3" },
  4: { bg: "#FFEDD5", text: "#9A3412", label: "L4" },
  5: { bg: "#FEE2E2", text: "#991B1B", label: "L5" },
  6: { bg: "#EDE9FE", text: "#5B21B6", label: "L6" },
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ─── Browse Card ─────────────────────────────────────────────────────────────
function BrowseCard({ entry, expanded, onToggle }: { entry: VocabEntry; expanded: boolean; onToggle: () => void }) {
  const lc = LEVEL_COLOR[entry.level] ?? LEVEL_COLOR[1];
  return (
    <div
      style={{
        border: `1.5px solid ${expanded ? COLOR : "#E5E3DE"}`,
        borderRadius: 14,
        background: expanded ? LIGHT : "#fff",
        transition: "all 0.18s",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: ACCENT }}>{entry.word}</span>
            <SpeakButton word={entry.word} size={12} />
            <span style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>{entry.content.ipa}</span>
            <span style={{ fontSize: 12, color: "#aaa" }}>{entry.pos}</span>
          </div>
          <div style={{ fontSize: 14, color: "#555", marginTop: 2 }}>{entry.content.core_meaning}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: lc.bg, color: lc.text }}>
            {lc.label}
          </span>
          <span style={{ fontSize: 16, color: COLOR, transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${COLOR}22` }}>
          {/* Definitions */}
          <div style={{ marginTop: 12 }}>
            {entry.content.definitions.map((def, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700, color: ACCENT, marginRight: 4 }}>{i + 1}.</span>
                  {def.en}
                </div>
                <div style={{ fontSize: 13, color: "#666", paddingLeft: 14 }}>{def.cn}</div>
              </div>
            ))}
          </div>

          {/* Examples */}
          {entry.content.examples.length > 0 && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: `${COLOR}12`, borderRadius: 10, borderLeft: `3px solid ${COLOR}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, marginBottom: 6, letterSpacing: "0.05em" }}>例句</div>
              {entry.content.examples.slice(0, 2).map((ex, i) => (
                <div key={i} style={{ marginBottom: i < entry.content.examples.length - 1 ? 8 : 0 }}>
                  <div style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>{ex.en}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{ex.cn}</div>
                </div>
              ))}
            </div>
          )}

          {/* Collocations */}
          {entry.content.collocations.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, marginBottom: 6, letterSpacing: "0.05em" }}>常見搭配</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {entry.content.collocations.map((col, i) => (
                  <span key={i} title={col.cn} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: `${COLOR}18`, color: ACCENT, cursor: "default" }}>
                    {col.phrase}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related words */}
          {entry.content.related_words && (
            <div style={{ marginTop: 10, fontSize: 12, color: "#777" }}>
              <span style={{ fontWeight: 700, color: ACCENT }}>相關詞：</span>{entry.content.related_words}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Flashcard ────────────────────────────────────────────────────────────────
function Flashcard({ entry, flipped, onFlip }: { entry: VocabEntry; flipped: boolean; onFlip: () => void }) {
  const lc = LEVEL_COLOR[entry.level] ?? LEVEL_COLOR[1];
  return (
    <div
      onClick={onFlip}
      style={{
        minHeight: 260,
        borderRadius: 20,
        border: `2px solid ${COLOR}`,
        background: flipped ? LIGHT : "#fff",
        padding: "32px 28px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transition: "background 0.25s",
        userSelect: "none",
        position: "relative",
      }}
    >
      <span style={{ position: "absolute", top: 12, right: 14, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: lc.bg, color: lc.text }}>
        {lc.label}
      </span>
      {!flipped ? (
        <>
          <div style={{ fontSize: 38, fontWeight: 900, color: ACCENT, marginBottom: 6 }}>{entry.word}</div>
          <div style={{ marginBottom: 6 }}><SpeakButton word={entry.word} size={14} /></div>
          <div style={{ fontSize: 15, color: "#888", fontStyle: "italic", marginBottom: 4 }}>{entry.content.ipa}</div>
          <div style={{ fontSize: 14, color: "#aaa" }}>{entry.pos}</div>
          <div style={{ marginTop: 20, fontSize: 12, color: "#bbb" }}>點擊翻牌查看解釋</div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: ACCENT }}>{entry.word}</span>
            <SpeakButton word={entry.word} size={13} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>{entry.content.core_meaning}</div>
          {entry.content.definitions[0] && (
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, maxWidth: 380, marginBottom: 14 }}>
              {entry.content.definitions[0].en}
            </div>
          )}
          {entry.content.examples[0] && (
            <div style={{ padding: "10px 14px", background: `${COLOR}15`, borderRadius: 10, fontSize: 13, color: "#444", lineHeight: 1.6, maxWidth: 380 }}>
              <div>{entry.content.examples[0].en}</div>
              <div style={{ color: "#666", marginTop: 4 }}>{entry.content.examples[0].cn}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Word Detail Dialog ───────────────────────────────────────────────────────
function WordDialog({ entry, onClose }: { entry: VocabEntry; onClose: () => void }) {
  const lc = LEVEL_COLOR[entry.level] ?? LEVEL_COLOR[1];

  // Close on backdrop click
  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onBackdrop}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
    >
      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 480,
        maxHeight: "85vh", overflowY: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        animation: "dialogIn 0.18s ease",
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 22px 16px",
          borderBottom: `1px solid ${lc.bg}`,
          background: lc.bg,
          borderRadius: "20px 20px 0 0",
          position: "relative",
        }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 14, right: 14,
              background: "rgba(0,0,0,0.08)", border: "none", borderRadius: 99,
              width: 28, height: 28, cursor: "pointer", fontSize: 16,
              color: lc.text, display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >×</button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: lc.text }}>{entry.word}</span>
            <SpeakButton word={entry.word} size={16} />
            <span style={{ fontSize: 13, color: lc.text, opacity: 0.7, fontStyle: "italic" }}>{entry.content.ipa}</span>
            <span style={{ fontSize: 12, color: lc.text, opacity: 0.6 }}>{entry.pos}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: lc.text }}>{entry.content.core_meaning}</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "rgba(0,0,0,0.1)", color: lc.text }}>
              {lc.label}
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Definitions */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", marginBottom: 8 }}>定義</div>
            {entry.content.definitions.map((def, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 13, color: "#333", lineHeight: 1.7 }}>
                  <span style={{ fontWeight: 700, color: ACCENT, marginRight: 4 }}>{i + 1}.</span>{def.en}
                </div>
                <div style={{ fontSize: 13, color: "#666", paddingLeft: 14 }}>{def.cn}</div>
              </div>
            ))}
          </div>

          {/* Examples */}
          {entry.content.examples.length > 0 && (
            <div style={{ padding: "12px 14px", background: `${COLOR}10`, borderRadius: 12, borderLeft: `3px solid ${COLOR}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", marginBottom: 8 }}>例句</div>
              {entry.content.examples.map((ex, i) => (
                <div key={i} style={{ marginBottom: i < entry.content.examples.length - 1 ? 10 : 0 }}>
                  <div style={{ fontSize: 13, color: "#333", lineHeight: 1.7 }}>{ex.en}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{ex.cn}</div>
                </div>
              ))}
            </div>
          )}

          {/* Collocations */}
          {entry.content.collocations.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", marginBottom: 8 }}>常見搭配</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {entry.content.collocations.map((col, i) => (
                  <span key={i} title={col.cn} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 99, background: `${COLOR}18`, color: ACCENT, cursor: "default" }}>
                    {col.phrase}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related words */}
          {entry.content.related_words && (
            <div style={{ fontSize: 12, color: "#777", lineHeight: 1.7 }}>
              <span style={{ fontWeight: 700, color: ACCENT }}>相關詞：</span>{entry.content.related_words}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes dialogIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Article Analyzer ────────────────────────────────────────────────────────
function AnalyzeMode({ vocab }: { vocab: VocabEntry[] }) {
  const [text, setText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<VocabEntry | null>(null);
  const [hiddenLevels, setHiddenLevels] = useState<Set<number>>(new Set());

  const toggleLevel = (l: number) =>
    setHiddenLevels((prev) => {
      const next = new Set(prev);
      next.has(l) ? next.delete(l) : next.add(l);
      return next;
    });

  // Build a lookup map: lowercase word → entry
  const wordMap = useMemo(() => {
    const m = new Map<string, VocabEntry>();
    for (const v of vocab) m.set(v.word.toLowerCase(), v);
    return m;
  }, [vocab]);

  // Tokenize the text into segments: { tok, entry | null }[]
  const segments = useMemo(() => {
    if (!analyzed || !text.trim()) return null;
    const tokens = text.split(/(\s+|[^\w'-]+)/);
    return tokens.map((tok) => {
      const clean = tok.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, "").toLowerCase();
      const entry = wordMap.get(clean) ?? null;
      return { tok, entry };
    });
  }, [analyzed, text, wordMap]);

  // Stats after analysis
  const stats = useMemo(() => {
    if (!segments) return null;
    const counts: Record<number, number> = {};
    const seen = new Set<string>();
    for (const { entry } of segments) {
      if (!entry) continue;
      const key = entry.word.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      counts[entry.level] = (counts[entry.level] ?? 0) + 1;
    }
    return counts;
  }, [segments]);

  const SAMPLE = `The government announced a new policy to abandon the use of fossil fuels by 2040. Scientists believe this will significantly reduce carbon emissions and help combat climate change. However, critics argue that the transition may cause economic disruption and unemployment in certain sectors.`;

  return (
    <div>
      {selectedEntry && (
        <WordDialog entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}

      <p style={{ fontSize: 13, color: "#666", marginBottom: 12, lineHeight: 1.6 }}>
        貼上一段英文文章，系統會自動標記每個單字對應的字彙等級。點擊有顏色的單字可查看詳細解釋。
      </p>

      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setAnalyzed(false); }}
        placeholder="在此貼上英文文章…"
        rows={7}
        style={{
          width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #ddd",
          fontSize: 14, lineHeight: 1.7, resize: "vertical", outline: "none",
          boxSizing: "border-box", fontFamily: "inherit", color: "#333",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = COLOR)}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => { if (text.trim()) setAnalyzed(true); }}
          disabled={!text.trim()}
          style={{ padding: "9px 24px", borderRadius: 10, border: "none", background: text.trim() ? COLOR : "#ddd", color: "#fff", fontWeight: 700, fontSize: 14, cursor: text.trim() ? "pointer" : "default" }}
        >
          分析文章
        </button>
        <button
          onClick={() => { setText(SAMPLE); setAnalyzed(false); }}
          style={{ padding: "9px 16px", borderRadius: 10, border: `1.5px solid ${COLOR}`, background: "#fff", color: ACCENT, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
        >
          載入範例
        </button>
        {text && (
          <button
            onClick={() => { setText(""); setAnalyzed(false); }}
            style={{ padding: "9px 16px", borderRadius: 10, border: "1.5px solid #ddd", background: "#fff", color: "#888", fontSize: 13, cursor: "pointer" }}
          >
            清除
          </button>
        )}
      </div>

      {/* Legend — clickable to toggle visibility */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 16, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#aaa", marginRight: 2 }}>點擊等級切換顯示：</span>
        {[1, 2, 3, 4, 5, 6].map((l) => {
          const lc = LEVEL_COLOR[l];
          const hidden = hiddenLevels.has(l);
          return (
            <button
              key={l}
              onClick={() => toggleLevel(l)}
              title={hidden ? `顯示 ${lc.label}` : `隱藏 ${lc.label}`}
              style={{
                fontSize: 12, padding: "3px 10px", borderRadius: 99, fontWeight: 600, cursor: "pointer", border: "none",
                background: hidden ? "#eee" : lc.bg,
                color: hidden ? "#bbb" : lc.text,
                textDecoration: hidden ? "line-through" : "none",
                transition: "all 0.15s",
              }}
            >
              {lc.label}
            </button>
          );
        })}
        <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: "#f0f0f0", color: "#999" }}>未收錄</span>
        {hiddenLevels.size > 0 && (
          <button
            onClick={() => setHiddenLevels(new Set())}
            style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, border: "1px solid #ddd", background: "#fff", color: "#888", cursor: "pointer" }}
          >
            全部顯示
          </button>
        )}
      </div>

      {/* Stats */}
      {stats && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          {[1, 2, 3, 4, 5, 6].map((l) => {
            if (!stats[l]) return null;
            const lc = LEVEL_COLOR[l];
            return (
              <div key={l} style={{ padding: "6px 14px", borderRadius: 10, background: lc.bg, color: lc.text, fontSize: 13, fontWeight: 600 }}>
                {lc.label}：{stats[l]} 個
              </div>
            );
          })}
        </div>
      )}

      {/* Highlighted result */}
      {segments && (
        <>
          <div style={{ marginTop: 8, fontSize: 12, color: "#aaa" }}>點擊有顏色的單字查看詳細解釋</div>
          <div style={{ marginTop: 8, padding: "18px 20px", borderRadius: 14, border: "1.5px solid #e5e3de", background: "#fafaf8", fontSize: 15, lineHeight: 2.4 }}>
            {segments.map(({ tok, entry }, i) => {
              if (!entry) return <span key={i}>{tok}</span>;
              const lc = LEVEL_COLOR[entry.level];
              const hidden = hiddenLevels.has(entry.level);
              if (hidden) return <span key={i}>{tok}</span>;
              return (
                <span
                  key={i}
                  onClick={() => setSelectedEntry(entry)}
                  title={`${entry.word}：${entry.content.core_meaning} (${lc.label})`}
                  style={{
                    background: lc.bg,
                    color: lc.text,
                    borderRadius: 4,
                    padding: "1px 3px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "filter 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.9)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
                >
                  {tok}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VocabReview() {
  const [vocab, setVocab] = useState<VocabEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("browse");

  // Shared filter
  const [levelFilter, setLevelFilter] = useState<number | null>(null);

  // Browse state
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  // Flashcard state
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcShuffled, setFcShuffled] = useState(false);
  const [fcOrder, setFcOrder] = useState<number[]>([]);

  // Quiz state
  const [quizWords, setQuizWords] = useState<VocabEntry[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [qSel, setQSel] = useState<number | null>(null);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);
  const [qOpts, setQOpts] = useState<string[]>([]);
  const [qCorrectIdx, setQCorrectIdx] = useState(0);
  const [qAnswers, setQAnswers] = useState<{ entry: VocabEntry; correct: boolean }[]>([]);
  const [qDialogEntry, setQDialogEntry] = useState<VocabEntry | null>(null);

  useEffect(() => {
    fetch(VOCAB_JSON_URL)
      .then((r) => r.json())
      .then((data: VocabEntry[]) => { setVocab(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const poolByLevel = useMemo(() => {
    return levelFilter === null ? vocab : vocab.filter((v) => v.level === levelFilter);
  }, [vocab, levelFilter]);

  // Browse filtered list
  const browseList = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return poolByLevel;
    return poolByLevel.filter(
      (v) => v.word.toLowerCase().includes(q) || v.content.core_meaning.includes(q)
    );
  }, [poolByLevel, search]);

  const totalPages = Math.ceil(browseList.length / PAGE_SIZE);
  const pagedList = browseList.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // ── Flashcard ──
  const fcWords = poolByLevel;

  // Keep fcOrder in sync with pool length; rebuild when pool changes
  useEffect(() => {
    setFcOrder(Array.from({ length: fcWords.length }, (_, i) => i));
    setFcIndex(0);
    setFcFlipped(false);
  }, [poolByLevel]);

  const currentFc = fcWords[fcShuffled ? (fcOrder[fcIndex] ?? 0) : fcIndex];

  const fcPrev = () => {
    setFcFlipped(false);
    setFcIndex((i) => (i - 1 + fcWords.length) % fcWords.length);
  };
  const fcNext = () => {
    setFcFlipped(false);
    setFcIndex((i) => (i + 1) % fcWords.length);
  };
  const fcToggleShuffle = () => {
    setFcShuffled((s) => {
      if (!s) {
        // Shuffle the order
        setFcOrder((prev) => shuffle([...prev]));
      } else {
        // Restore natural order
        setFcOrder(Array.from({ length: fcWords.length }, (_, i) => i));
      }
      return !s;
    });
    setFcIndex(0);
    setFcFlipped(false);
  };

  // ── Quiz ──
  const buildQuiz = useCallback(() => {
    const pool = levelFilter === null ? vocab : vocab.filter((v) => v.level === levelFilter);
    if (pool.length < 4) return;
    const selected = shuffle(pool).slice(0, Math.min(10, pool.length));
    setQuizWords(selected);
    setQIndex(0);
    setQSel(null);
    setQScore(0);
    setQDone(false);
    setQAnswers([]);
  }, [vocab, levelFilter]);

  const buildOptions = useCallback((word: VocabEntry, pool: VocabEntry[]) => {
    const correct = word.content.core_meaning;
    const distractors = shuffle(pool.filter((w) => w.word !== word.word))
      .slice(0, 3)
      .map((w) => w.content.core_meaning);
    const opts = shuffle([...distractors, correct]);
    setQOpts(opts);
    setQCorrectIdx(opts.indexOf(correct));
  }, []);

  useEffect(() => {
    if (mode === "quiz" && vocab.length >= 4) buildQuiz();
    if (mode === "flashcard") { setFcIndex(0); setFcFlipped(false); }
  }, [mode]);

  useEffect(() => {
    if (quizWords.length > 0 && !qDone && vocab.length > 0) {
      buildOptions(quizWords[qIndex], vocab);
    }
  }, [qIndex, quizWords]);

  const qPick = (i: number) => {
    if (qSel !== null) return;
    setQSel(i);
    const correct = i === qCorrectIdx;
    if (correct) setQScore((s) => s + 1);
    setQAnswers((prev) => [...prev, { entry: quizWords[qIndex], correct }]);
  };

  const qNext = () => {
    if (qIndex + 1 >= quizWords.length) { setQDone(true); }
    else { setQIndex((i) => i + 1); setQSel(null); }
  };

  // ── Level filter reset when mode changes ──
  const switchMode = (m: Mode) => {
    setMode(m);
    setExpanded(null);
    setSearch("");
  };

  // ── Level filter (also resets flashcard index) ──
  const setLevel = (l: number | null) => {
    setLevelFilter(l);
    setFcIndex(0);
    setFcFlipped(false);
    setExpanded(null);
    setPage(0);
  };

  const levels = [1, 2, 3, 4, 5, 6];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>📚</div>
        <div style={{ fontSize: 16 }}>字彙資料載入中…</div>
      </div>
    );
  }

  if (vocab.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
        <div>無法載入字彙資料</div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "inherit" }}>
      {/* Stats bar */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ padding: "10px 16px", borderRadius: 12, background: LIGHT, flex: 1, minWidth: 100, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>{vocab.length}</div>
          <div style={{ fontSize: 12, color: "#888" }}>字彙總數</div>
        </div>
        {levels.map((l) => {
          const cnt = vocab.filter((v) => v.level === l).length;
          const lc = LEVEL_COLOR[l];
          return (
            <div key={l} style={{ padding: "10px 14px", borderRadius: 12, background: lc.bg, flex: 1, minWidth: 60, textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: lc.text }}>{cnt}</div>
              <div style={{ fontSize: 11, color: lc.text, opacity: 0.8 }}>{lc.label}</div>
            </div>
          );
        })}
      </div>

      {/* Mode tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "#F5F4F0", borderRadius: 12, padding: 4 }}>
        {(["browse", "flashcard", "quiz", "analyze"] as Mode[]).map((m) => {
          const labels = { browse: "📖 瀏覽", flashcard: "🃏 抽認卡", quiz: "✏️ 測驗", analyze: "🔍 文章分析" };
          return (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1,
                padding: "9px 8px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer",
                fontWeight: mode === m ? 700 : 500,
                fontSize: 14,
                background: mode === m ? "#fff" : "transparent",
                color: mode === m ? ACCENT : "#888",
                boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s",
              }}
            >
              {labels[m]}
            </button>
          );
        })}
      </div>

      {/* Level filter (browse + flashcard) */}
      {(mode === "browse" || mode === "flashcard") && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          <button
            onClick={() => setLevel(null)}
            style={{
              padding: "5px 14px", borderRadius: 99, border: "1.5px solid", fontSize: 12, fontWeight: 600, cursor: "pointer",
              borderColor: levelFilter === null ? COLOR : "#ddd",
              background: levelFilter === null ? COLOR : "#fff",
              color: levelFilter === null ? "#fff" : "#888",
            }}
          >
            全部
          </button>
          {levels.map((l) => {
            const lc = LEVEL_COLOR[l];
            const active = levelFilter === l;
            return (
              <button
                key={l}
                onClick={() => setLevel(active ? null : l)}
                style={{
                  padding: "5px 12px", borderRadius: 99, border: "1.5px solid", fontSize: 12, fontWeight: 600, cursor: "pointer",
                  borderColor: active ? lc.text : "#ddd",
                  background: active ? lc.bg : "#fff",
                  color: active ? lc.text : "#888",
                }}
              >
                {lc.label}
              </button>
            );
          })}
          <span style={{ marginLeft: 6, fontSize: 12, color: "#aaa", alignSelf: "center" }}>
            {poolByLevel.length} 個單字
          </span>
        </div>
      )}

      {/* ── BROWSE MODE ─────────────────────────────────────── */}
      {mode === "browse" && (
        <>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <input
              type="text"
              placeholder="搜尋單字或中文解釋…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setExpanded(null); setPage(0); }}
              style={{
                width: "100%",
                padding: "10px 14px 10px 38px",
                borderRadius: 10,
                border: "1.5px solid #ddd",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = COLOR)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
            />
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#aaa" }}>🔍</span>
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#aaa" }}
              >×</button>
            )}
          </div>

          {browseList.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#aaa" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔎</div>
              <div>找不到符合的單字</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 12, color: "#aaa", marginBottom: 10 }}>
                顯示 {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, browseList.length)} / 共 {browseList.length} 個
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {pagedList.map((entry) => (
                  <BrowseCard
                    key={entry.word}
                    entry={entry}
                    expanded={expanded === entry.word}
                    onToggle={() => setExpanded(expanded === entry.word ? null : entry.word)}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 20, flexWrap: "wrap" }}>
                  <button
                    onClick={() => { setPage(0); setExpanded(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={page === 0}
                    style={{ padding: "6px 12px", borderRadius: 8, border: "1.5px solid #ddd", background: "#fff", color: page === 0 ? "#ccc" : "#555", cursor: page === 0 ? "default" : "pointer", fontSize: 13 }}
                  >«</button>
                  <button
                    onClick={() => { setPage((p) => p - 1); setExpanded(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={page === 0}
                    style={{ padding: "6px 14px", borderRadius: 8, border: "1.5px solid #ddd", background: "#fff", color: page === 0 ? "#ccc" : "#555", cursor: page === 0 ? "default" : "pointer", fontSize: 13 }}
                  >‹ 上一頁</button>

                  {Array.from({ length: totalPages }, (_, i) => i)
                    .filter((i) => Math.abs(i - page) <= 2)
                    .map((i) => (
                      <button
                        key={i}
                        onClick={() => { setPage(i); setExpanded(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        style={{
                          padding: "6px 12px", borderRadius: 8, border: "1.5px solid", fontSize: 13, cursor: "pointer", fontWeight: i === page ? 700 : 400,
                          borderColor: i === page ? COLOR : "#ddd",
                          background: i === page ? COLOR : "#fff",
                          color: i === page ? "#fff" : "#555",
                        }}
                      >{i + 1}</button>
                    ))}

                  <button
                    onClick={() => { setPage((p) => p + 1); setExpanded(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={page >= totalPages - 1}
                    style={{ padding: "6px 14px", borderRadius: 8, border: "1.5px solid #ddd", background: "#fff", color: page >= totalPages - 1 ? "#ccc" : "#555", cursor: page >= totalPages - 1 ? "default" : "pointer", fontSize: 13 }}
                  >下一頁 ›</button>
                  <button
                    onClick={() => { setPage(totalPages - 1); setExpanded(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={page >= totalPages - 1}
                    style={{ padding: "6px 12px", borderRadius: 8, border: "1.5px solid #ddd", background: "#fff", color: page >= totalPages - 1 ? "#ccc" : "#555", cursor: page >= totalPages - 1 ? "default" : "pointer", fontSize: 13 }}
                  >»</button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ── FLASHCARD MODE ──────────────────────────────────── */}
      {mode === "flashcard" && (
        <>
          {fcWords.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#aaa" }}>此等級暫無單字</div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "#aaa" }}>{fcIndex + 1} / {fcWords.length}</span>
                <button
                  onClick={fcToggleShuffle}
                  style={{
                    padding: "5px 14px", borderRadius: 99, border: "1.5px solid", fontSize: 12, fontWeight: 600, cursor: "pointer",
                    borderColor: fcShuffled ? ACCENT : "#ddd",
                    background: fcShuffled ? LIGHT : "#fff",
                    color: fcShuffled ? ACCENT : "#888",
                  }}
                >
                  🔀 {fcShuffled ? "隨機中" : "隨機"}
                </button>
              </div>
              {/* Progress bar */}
              <div style={{ height: 4, background: "#eee", borderRadius: 99, marginBottom: 20, overflow: "hidden" }}>
                <div style={{ height: "100%", background: COLOR, width: `${((fcIndex + 1) / fcWords.length) * 100}%`, transition: "width 0.3s", borderRadius: 99 }} />
              </div>
              <Flashcard entry={currentFc} flipped={fcFlipped} onFlip={() => setFcFlipped((f) => !f)} />
              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20 }}>
                <button
                  onClick={fcPrev}
                  style={{ padding: "10px 28px", borderRadius: 10, border: `1.5px solid ${COLOR}`, background: "#fff", color: ACCENT, fontWeight: 600, fontSize: 15, cursor: "pointer" }}
                >
                  ← 上一個
                </button>
                <button
                  onClick={() => setFcFlipped((f) => !f)}
                  style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: COLOR, color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer" }}
                >
                  翻牌
                </button>
                <button
                  onClick={fcNext}
                  style={{ padding: "10px 28px", borderRadius: 10, border: `1.5px solid ${COLOR}`, background: "#fff", color: ACCENT, fontWeight: 600, fontSize: 15, cursor: "pointer" }}
                >
                  下一個 →
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "#bbb" }}>也可以直接點擊卡片翻牌</div>
            </>
          )}
        </>
      )}

      {/* ── ANALYZE MODE ────────────────────────────────────── */}
      {mode === "analyze" && <AnalyzeMode vocab={vocab} />}

      {/* ── QUIZ MODE ───────────────────────────────────────── */}
      {mode === "quiz" && (
        <>
          {/* Level filter for quiz */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            <button
              onClick={() => { setLevelFilter(null); }}
              style={{
                padding: "5px 14px", borderRadius: 99, border: "1.5px solid", fontSize: 12, fontWeight: 600, cursor: "pointer",
                borderColor: levelFilter === null ? COLOR : "#ddd",
                background: levelFilter === null ? COLOR : "#fff",
                color: levelFilter === null ? "#fff" : "#888",
              }}
            >全部</button>
            {levels.map((l) => {
              const lc = LEVEL_COLOR[l];
              const active = levelFilter === l;
              return (
                <button key={l} onClick={() => setLevelFilter(active ? null : l)}
                  style={{ padding: "5px 12px", borderRadius: 99, border: "1.5px solid", fontSize: 12, fontWeight: 600, cursor: "pointer", borderColor: active ? lc.text : "#ddd", background: active ? lc.bg : "#fff", color: active ? lc.text : "#888" }}>
                  {lc.label}
                </button>
              );
            })}
            <button
              onClick={buildQuiz}
              style={{ marginLeft: "auto", padding: "5px 14px", borderRadius: 99, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: LIGHT, color: ACCENT }}
            >
              重新出題
            </button>
          </div>

          {qDone ? (
            <div>
              {qDialogEntry && (
                <WordDialog entry={qDialogEntry} onClose={() => setQDialogEntry(null)} />
              )}
              {/* Score summary */}
              <div style={{ textAlign: "center", padding: "28px 20px 20px" }}>
                <div style={{ fontSize: 44, marginBottom: 8 }}>
                  {qScore >= 9 ? "🏆" : qScore >= 7 ? "🎉" : qScore >= 5 ? "💪" : "📖"}
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, color: ACCENT }}>{qScore} / {quizWords.length}</div>
                <div style={{ fontSize: 14, color: "#666", marginTop: 6, marginBottom: 20 }}>
                  {qScore >= 9 ? "完美！字彙實力超強！" : qScore >= 7 ? "很不錯！再加把勁！" : qScore >= 5 ? "繼續努力，多看多背！" : "多看幾次瀏覽跟抽認卡再來挑戰！"}
                </div>
                <button
                  onClick={buildQuiz}
                  style={{ padding: "11px 32px", borderRadius: 12, border: "none", background: COLOR, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
                >
                  再測一次
                </button>
              </div>
              {/* Per-question review */}
              <div style={{ borderTop: "1px solid #eee", paddingTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#aaa", letterSpacing: "0.06em", marginBottom: 10 }}>
                  點擊單字查看詳細解釋
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {qAnswers.map(({ entry, correct }, i) => {
                    const lc = LEVEL_COLOR[entry.level] ?? LEVEL_COLOR[1];
                    return (
                      <button
                        key={i}
                        onClick={() => setQDialogEntry(entry)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "12px 14px", borderRadius: 12, border: "1.5px solid",
                          borderColor: correct ? "#86EFAC" : "#FCA5A5",
                          background: correct ? "#F0FDF4" : "#FEF2F2",
                          cursor: "pointer", textAlign: "left", width: "100%",
                        }}
                      >
                        <span style={{ fontSize: 18 }}>{correct ? "✅" : "❌"}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: correct ? "#166534" : "#991B1B" }}>
                              {entry.word}
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 99, background: lc.bg, color: lc.text }}>
                              {lc.label}
                            </span>
                          </div>
                          <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>{entry.content.core_meaning}</div>
                        </div>
                        <span style={{ fontSize: 13, color: "#aaa", flexShrink: 0 }}>詳情 ›</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : quizWords.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#aaa" }}>此等級單字數量不足（至少需要 4 個）</div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 13, color: "#888" }}>
                <span>第 {qIndex + 1} / {quizWords.length} 題</span>
                <span>得分：<strong style={{ color: ACCENT }}>{qScore}</strong></span>
              </div>
              {/* Progress */}
              <div style={{ height: 4, background: "#eee", borderRadius: 99, marginBottom: 20, overflow: "hidden" }}>
                <div style={{ height: "100%", background: COLOR, width: `${(qIndex / quizWords.length) * 100}%`, transition: "width 0.3s", borderRadius: 99 }} />
              </div>

              {/* Question */}
              <div style={{ textAlign: "center", padding: "24px 20px", borderRadius: 16, background: LIGHT, border: `1.5px solid ${COLOR}33`, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, letterSpacing: "0.08em", marginBottom: 8 }}>這個單字的中文意思是？</div>
                <div style={{ fontSize: 34, fontWeight: 900, color: ACCENT, marginBottom: 4 }}>{quizWords[qIndex].word}</div>
                <div style={{ fontSize: 14, color: "#888", fontStyle: "italic" }}>{quizWords[qIndex].content.ipa}</div>
                <div style={{ fontSize: 13, color: "#aaa" }}>{quizWords[qIndex].pos}</div>
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {qOpts.map((opt, i) => {
                  let bg = "#fff", border = "1.5px solid #e5e3de", color = "#1a1a1a";
                  if (qSel !== null) {
                    if (i === qCorrectIdx) { bg = "#DCFCE7"; border = "2px solid #22C55E"; color = "#166534"; }
                    else if (i === qSel && i !== qCorrectIdx) { bg = "#FEE2E2"; border = "2px solid #EF4444"; color = "#991B1B"; }
                    else { bg = "#fafafa"; color = "#aaa"; }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => qPick(i)}
                      style={{ background: bg, border, borderRadius: 10, padding: "13px 16px", textAlign: "left", fontSize: 15, color, cursor: qSel !== null ? "default" : "pointer", fontWeight: qSel !== null && i === qCorrectIdx ? 700 : 400, transition: "all 0.15s" }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {qSel !== null && (
                <>
                  <div style={{ marginTop: 14, padding: "12px 16px", background: qSel === qCorrectIdx ? "#F0FDF4" : "#FEF2F2", borderRadius: 10, fontSize: 14, color: qSel === qCorrectIdx ? "#166534" : "#991B1B", lineHeight: 1.6 }}>
                    {qSel === qCorrectIdx ? "✅ 正確！" : `❌ 答錯了！正確答案是「${quizWords[qIndex].content.core_meaning}」`}
                    {quizWords[qIndex].content.examples[0] && (
                      <div style={{ marginTop: 6, fontSize: 13, color: "#555" }}>
                        <em>{quizWords[qIndex].content.examples[0].en}</em>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={qNext}
                    style={{ marginTop: 14, width: "100%", padding: "13px", borderRadius: 12, border: "none", background: COLOR, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
                  >
                    {qIndex + 1 >= quizWords.length ? "查看結果 →" : "下一題 →"}
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
