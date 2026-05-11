import React from "react";
import type { Meta } from "@storybook/react";

export default {
  title: "Legacy/Introduction",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
  },
} satisfies Meta;

const PALETTE: Array<[string, string]> = [
  ["--phosphor", "#2cff7a"],
  ["--phosphor-bright", "#b6ffce"],
  ["--phosphor-dim", "#1fb854"],
  ["--phosphor-fade", "#0a4d22"],
  ["--magenta", "#62ff9a"],
  ["--magenta-bright", "#d6ffe2"],
  ["--magenta-deep", "#157a3b"],
  ["--magenta-fade", "#06321a"],
  ["--bg", "#04140a"],
  ["--bg-raise", "#082416"],
  ["--bg-deep", "#010604"],
  ["--ink", "#d8ffe7"],
];

const PRINCIPLES: Array<[string, string]> = [
  ["No rounded corners", "border-radius: 0 everywhere except LED dots."],
  ["No emoji", "Box-drawing glyphs only: ▌ ▸ ▾ █ ▓ ▒ ░ ☢ ◇."],
  ["Glow over shadows", "Emphasis = text-shadow: var(--glow-emerald)."],
  ["Inverted block hover", "background: var(--phosphor); color: var(--bg) — no transitions."],
  ["Mono fonts only", "Bender, VCR OSD Mono, JetBrains Mono."],
];

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: "var(--font-terminal)",
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--phosphor-fade)",
      marginBottom: 8,
    }}
  >
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2
    style={{
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 17,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--phosphor-bright)",
      textShadow: "var(--glow-emerald)",
      borderLeft: "3px solid var(--phosphor)",
      borderBottom: "1px solid var(--phosphor-fade)",
      background: "linear-gradient(90deg, rgba(44,255,122,0.08), transparent 60%)",
      padding: "4px 24px 4px 10px",
      margin: "32px 0 16px",
      display: "block",
      width: "max-content",
      maxWidth: "100%",
    }}
  >
    {`// ${children}`}
  </h2>
);

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre
    style={{
      background: "var(--code-bg, #03110a)",
      border: "1px dashed var(--phosphor-fade)",
      color: "var(--phosphor-bright)",
      padding: "12px 14px",
      margin: "0 0 12px",
      fontFamily: "var(--font-code)",
      fontSize: 12.5,
      lineHeight: 1.6,
      overflowX: "auto",
    }}
  >
    {children}
  </pre>
);

export const Introduction = () => (
  <div
    style={{
      padding: 32,
      background: "var(--bg)",
      minHeight: "100vh",
      color: "var(--ink)",
      fontFamily: "var(--font-body)",
    }}
  >
    <Caption>// СЕКРЕТНО //  ЧЕРНОБЫЛЬСКАЯ ЗОНА ОТЧУЖДЕНИЯ</Caption>
    <h1
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: "clamp(1.8rem, 3.4vw, 2.4rem)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--phosphor-bright)",
        textShadow: "var(--glow-emerald)",
        margin: "0 0 8px",
      }}
    >
      phosphor-ui :: Zone Design System
    </h1>
    <p style={{ color: "var(--phosphor-dim)", maxWidth: 720, marginTop: 0 }}>
      Single-channel green phosphor. Retro / military / 80s terminal /
      Pip-Boy 3000 / STALKER GAMMA aesthetic. Mono fonts, hard edges, glow
      instead of shadow.
    </p>

    <SectionTitle>Install</SectionTitle>
    <Code>{`npm install @sektant1/phosphor-ui`}</Code>
    <Code>{`import "@sektant1/phosphor-ui/tokens.css"; // design tokens (CSS vars + fonts)
import { Button, PdaWindow, PostListing } from "@sektant1/phosphor-ui";`}</Code>

    <SectionTitle>Palette</SectionTitle>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 8,
      }}
    >
      {PALETTE.map(([name, hex]) => (
        <div
          key={name}
          style={{
            border: "1px solid var(--phosphor-fade)",
            background: "var(--bg-raise)",
            padding: 10,
            fontFamily: "var(--font-code)",
            fontSize: 11,
          }}
        >
          <div
            style={{
              background: hex,
              height: 48,
              marginBottom: 8,
              border: "1px solid var(--phosphor-fade)",
            }}
          />
          <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
          <div style={{ color: "var(--phosphor-fade)" }}>{hex}</div>
        </div>
      ))}
    </div>

    <SectionTitle>Type specimens</SectionTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="t-h1">// SECTOR-7 // АНОМАЛЬНАЯ АКТИВНОСТЬ</div>
      <div className="t-h2">transmission log</div>
      <div className="t-h3">▸ artifact recovery</div>
      <div className="t-h4">└─ side note</div>
      <div className="t-body">
        Pool reuse open DB connections. No new connection per request.
      </div>
      <div className="t-mono">grep -r "transmission" .</div>
      <div className="t-terminal">CH 0x4C · γ-2 · NORM</div>
      <div className="t-stamp">// LAST CONTACT //</div>
      <div className="t-prompt">~/zone-net $</div>
    </div>

    <SectionTitle>Principles</SectionTitle>
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {PRINCIPLES.map(([title, body]) => (
        <li
          key={title}
          style={{
            borderLeft: "2px solid var(--phosphor)",
            background: "linear-gradient(90deg, rgba(44,255,122,0.05), transparent 70%)",
            padding: "8px 12px",
          }}
        >
          <div
            style={{
              color: "var(--phosphor)",
              textShadow: "var(--glow-emerald)",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontSize: 13,
            }}
          >
            {title}
          </div>
          <div style={{ color: "var(--ink)", fontFamily: "var(--font-code)", fontSize: 12, marginTop: 2 }}>
            {body}
          </div>
        </li>
      ))}
    </ul>

    <SectionTitle>Where next</SectionTitle>
    <div
      style={{
        fontFamily: "var(--font-code)",
        fontSize: 12,
        color: "var(--phosphor-dim)",
        lineHeight: 1.9,
      }}
    >
      <div>▸ <span style={{ color: "var(--phosphor-bright)" }}>Zone / Tokens</span> — colors, type, spacing, scrollbar, z-index.</div>
      <div>▸ <span style={{ color: "var(--phosphor-bright)" }}>Components / *</span> — every component, isolated.</div>
      <div>▸ <span style={{ color: "var(--phosphor-bright)" }}>Pages / Demo Site</span> — full-page compositions.</div>
    </div>
  </div>
);
