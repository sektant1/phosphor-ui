import React from "react";
import type { Meta } from "@storybook/react";

export default {
  title: "Zone/Tokens",
} satisfies Meta;

const COLORS: Array<[label: string, group: string, vars: Array<[string, string]>]> = [
  [
    "Phosphor",
    "primary tube column",
    [
      ["--phosphor", "#2cff7a"],
      ["--phosphor-bright", "#b6ffce"],
      ["--phosphor-dim", "#1fb854"],
      ["--phosphor-fade", "#0a4d22"],
    ],
  ],
  [
    "Magenta (accent green)",
    "cooler / paler accent column",
    [
      ["--magenta", "#62ff9a"],
      ["--magenta-bright", "#d6ffe2"],
      ["--magenta-deep", "#157a3b"],
      ["--magenta-fade", "#06321a"],
    ],
  ],
  [
    "Extras",
    "extra single-channel hues",
    [
      ["--moss", "#00cec8"],
      ["--spring", "#00ff7f"],
      ["--rose", "#88ffae"],
    ],
  ],
  [
    "Surfaces",
    "tube body / surfaces / ink",
    [
      ["--bg", "#04140a"],
      ["--bg-raise", "#082416"],
      ["--bg-deep", "#010604"],
      ["--ink", "#d8ffe7"],
    ],
  ],
  [
    "Code tokens",
    "syntax highlight palette",
    [
      ["--code-bg", "#03110a"],
      ["--code-fn", "#b6ffce"],
      ["--code-comment", "#3a7a52"],
      ["--code-keyword", "#62ff9a"],
      ["--code-string", "#00d4b5"],
      ["--code-number", "#aaff66"],
      ["--code-var", "#d6ffe2"],
      ["--code-type", "#5cf5d4"],
      ["--code-punct", "#4d8a6e"],
      ["--code-tag", "#62ff9a"],
      ["--code-attr", "#aaff66"],
      ["--code-builtin", "#5cf5d4"],
      ["--code-operator", "#b6ffce"],
    ],
  ],
];

const TYPE_VARIANTS: Array<{ cls: string; label: string; sample: string }> = [
  { cls: "t-h1", label: "// SECTOR-7 // АНОМАЛЬНАЯ АКТИВНОСТЬ", sample: "Display heading — clamp(1.8rem, 3.4vw, 2.4rem)" },
  { cls: "t-h2", label: "transmission log", sample: "Section heading — clamp(1.4rem, 2.6vw, 1.85rem)" },
  { cls: "t-h3", label: "▸ artifact recovery", sample: "Subsection — clamp(1.15rem, 2vw, 1.4rem)" },
  { cls: "t-h4", label: "└─ side note", sample: "Tertiary — clamp(1rem, 1.6vw, 1.15rem)" },
  { cls: "t-body", label: "Pool reuse open DB connections. No new connection per request.", sample: "Body — clamp(15px, 0.4vw + 13px, 17px)" },
  { cls: "t-mono", label: "grep -r 'transmission' .", sample: "Mono — 0.86em" },
  { cls: "t-terminal", label: "CH 0x4C · γ-2 · NORM", sample: "Terminal (VT323) — 1.15em, tracking-wider" },
  { cls: "t-stamp", label: "// LAST CONTACT //", sample: "Stamp — 0.78em, tracking-stamp" },
  { cls: "t-prompt", label: "~/zone-net $", sample: "Prompt — VT323 + glow-magenta" },
  { cls: "t-glow", label: "glowing emerald text", sample: "Glow — phosphor + glow-emerald" },
  { cls: "t-glow-pale", label: "paper-mint highlight", sample: "Glow pale — phosphor-bright + glow-emerald" },
  { cls: "t-dim", label: "dim phosphor, no glow", sample: "Dim — phosphor-dim, text-shadow: none" },
  { cls: "t-faded", label: "deep forest, no glow", sample: "Faded — phosphor-fade, text-shadow: none" },
];

const SPACING: Array<[string, string]> = [
  ["--space-0", "0.1rem"],
  ["--space-1", "0.2rem"],
  ["--space-2", "0.4rem"],
  ["--space-3", "0.6rem"],
  ["--space-4", "0.8rem"],
  ["--space-5", "1rem"],
  ["--space-6", "1.4rem"],
  ["--space-7", "2rem"],
];

type BorderSpec = {
  token: string;
  label: string;
  cssBorder: string;
  cssBorderLeft?: string;
};

const BORDERS: BorderSpec[] = [
  { token: "--border-frame", label: "2px solid", cssBorder: "2px solid var(--phosphor-dim)" },
  { token: "--border-line", label: "1px solid", cssBorder: "1px solid var(--phosphor-fade)" },
  { token: "--border-dash", label: "1px dashed", cssBorder: "1px dashed var(--phosphor-fade)" },
  { token: "--border-dot", label: "1px dotted", cssBorder: "1px dotted var(--phosphor-fade)" },
  { token: "--rail-strong", label: "2px rail / phosphor", cssBorder: "none", cssBorderLeft: "2px solid var(--phosphor)" },
  { token: "--rail-quote", label: "3px double / quote", cssBorder: "none", cssBorderLeft: "3px double var(--phosphor)" },
];

const BorderSwatch: React.FC<{ spec: BorderSpec }> = ({ spec }) => {
  const isRail = !!spec.cssBorderLeft;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          height: 70,
          background: "var(--bg-raise)",
          display: "flex",
          alignItems: "center",
          justifyContent: isRail ? "flex-start" : "center",
          color: "var(--phosphor-bright)",
          fontFamily: "var(--font-terminal)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          paddingLeft: isRail ? 12 : 0,
          border: spec.cssBorder,
          ...(spec.cssBorderLeft ? { borderLeft: spec.cssBorderLeft } : null),
        }}
      >
        {spec.label}
      </div>
      <span
        style={{
          fontFamily: "var(--font-code)",
          fontSize: 10.5,
          color: "var(--phosphor-dim)",
        }}
      >
        {spec.token}
      </span>
    </div>
  );
};

type GlowSpec = {
  token: string;
  label: string;
  textColor: string;
  textShadow: string;
  demoStyle?: React.CSSProperties;
};

const GLOWS_FULL: GlowSpec[] = [
  { token: "--glow-emerald", label: "EMERALD", textColor: "var(--phosphor)", textShadow: "var(--glow-emerald)" },
  { token: "--glow-magenta", label: "ACCENT", textColor: "#62ff9a", textShadow: "var(--glow-magenta)" },
  { token: "--glow-amber", label: "MOSS", textColor: "var(--moss)", textShadow: "var(--glow-amber)" },
  {
    token: "inset bloom",
    label: "INSET",
    textColor: "var(--phosphor)",
    textShadow: "var(--glow-emerald)",
    demoStyle: {
      boxShadow:
        "inset 0 0 80px rgba(44,255,122,0.18), inset 0 0 0 1px var(--phosphor-fade)",
    },
  },
  {
    token: "outer bloom",
    label: "OUTER",
    textColor: "var(--phosphor)",
    textShadow: "var(--glow-emerald)",
    demoStyle: {
      boxShadow: "0 0 24px rgba(44,255,122,0.3), 0 0 60px rgba(44,255,122,0.1)",
      borderColor: "var(--phosphor)",
    },
  },
  {
    token: "stencil chrome",
    label: "STENCIL",
    textColor: "var(--phosphor)",
    textShadow: "var(--glow-emerald)",
    demoStyle: {
      borderRadius: 0,
      outline: "1px dashed var(--phosphor-fade)",
      outlineOffset: -6,
    },
  },
];

const GlowSwatch: React.FC<{ spec: GlowSpec }> = ({ spec }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
    <div
      style={{
        width: "100%",
        height: 80,
        background: "var(--bg-raise)",
        border: "1px solid var(--phosphor-fade)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...spec.demoStyle,
      }}
    >
      <span
        style={{
          color: spec.textColor,
          textShadow: spec.textShadow,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {spec.label}
      </span>
    </div>
    <div
      style={{
        fontFamily: "var(--font-code)",
        fontSize: 10.5,
        color: "var(--phosphor-dim)",
        textAlign: "center",
      }}
    >
      {spec.token}
    </div>
  </div>
);

const Z_INDEX: Array<[string, string, string]> = [
  ["--z-deep", "0", "below base"],
  ["--z-default", "1", "base content"],
  ["--z-raised", "2", "raised surface"],
  ["--z-fx-noise", "6", "noise overlay"],
  ["--z-fx-vignette", "7", "corner vignette"],
  ["--z-fx-frame", "8", "frame stencil"],
  ["--z-fx-flicker", "9", "flicker layer"],
  ["--z-shell", "10", "app shell"],
  ["--z-backdrop", "49", "modal backdrop"],
  ["--z-drawer", "50", "off-canvas drawer"],
];

const SCROLLBAR: Array<[string, string, string]> = [
  ["--scrollbar-size", "8px", "track + thumb thickness"],
  ["--scrollbar-track", "var(--bg-deep)", "groove background"],
  ["--scrollbar-track-border", "1px dashed var(--phosphor-fade)", "left edge of track"],
  ["--scrollbar-thumb", "var(--phosphor-fade)", "default thumb fill"],
  ["--scrollbar-thumb-edge", "var(--phosphor-dim)", "inset 1px ring on thumb"],
  ["--scrollbar-thumb-hover", "var(--phosphor-dim)", "hover thumb fill"],
  ["--scrollbar-thumb-active", "var(--phosphor)", "drag thumb fill"],
  ["--scrollbar-glow", "0 0 6px rgba(44,255,122,0.4)", "hover bloom"],
];

const ScrollbarDemo: React.FC<{ axis: "y" | "x" }> = ({ axis }) => {
  const isY = axis === "y";
  return (
    <div
      style={{
        width: isY ? 220 : "100%",
        height: isY ? 160 : 80,
        background: "var(--bg-raise)",
        border: "1px solid var(--phosphor-fade)",
        padding: 10,
        overflow: isY ? "auto" : "auto",
        whiteSpace: isY ? "normal" : "nowrap",
        fontFamily: "var(--font-code)",
        fontSize: 11,
        color: "var(--ink)",
        lineHeight: 1.7,
      }}
    >
      {isY
        ? Array.from({ length: 24 }).map((_, i) => (
            <div key={i}>
              [{String(i).padStart(3, "0")}] transmission fragment // СЕКТОР-7
            </div>
          ))
        : "▌ долгий горизонтальный сигнал ░░░ ".repeat(20)}
    </div>
  );
};

const TRACKING: Array<[string, string]> = [
  ["--tracking-tight", "-0.05em"],
  ["--tracking-normal", "0"],
  ["--tracking-wide", "0.06em"],
  ["--tracking-wider", "0.14em"],
  ["--tracking-stamp", "0.22em"],
];

const LINE: Array<[string, string]> = [
  ["--type-line-tight", "1.05"],
  ["--type-line-snug", "1.15"],
  ["--type-line-normal", "1.6"],
  ["--type-line-prose", "1.7"],
];

const FONT_STACKS: Array<[string, string]> = [
  ["--font-display", "Space Mono → JetBrains Mono → ui-monospace"],
  ["--font-heading", "JetBrains Mono → Space Mono → ui-monospace"],
  ["--font-body", "JetBrains Mono → Space Mono → ui-monospace"],
  ["--font-code", "JetBrains Mono → Space Mono → ui-monospace"],
  ["--font-terminal", "VT323 → JetBrains Mono → ui-monospace"],
];

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

const Cell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      border: "1px solid var(--phosphor-fade)",
      padding: 10,
      fontFamily: "var(--font-code)",
      fontSize: 11,
      color: "var(--ink)",
      background: "var(--bg-raise)",
    }}
  >
    {children}
  </div>
);

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      padding: 24,
      background: "var(--bg)",
      minHeight: "100vh",
      color: "var(--ink)",
      fontFamily: "var(--font-body)",
    }}
  >
    {children}
  </div>
);

export const All = () => (
  <Page>
    <h1
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: "clamp(1.8rem, 3.4vw, 2.4rem)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--phosphor-bright)",
        textShadow: "var(--glow-emerald)",
        margin: 0,
      }}
    >
      Zone Design System :: Tokens
    </h1>
    <Caption>// СЕКРЕТНО // single-channel green phosphor</Caption>

    {COLORS.map(([label, group, vars]) => (
      <div key={label}>
        <SectionTitle>{`Color · ${label}`}</SectionTitle>
        <Caption>{group}</Caption>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
          {vars.map(([name, hex]) => (
            <Cell key={name}>
              <div style={{ background: hex, height: 56, marginBottom: 8, border: "1px solid var(--phosphor-fade)" }} />
              <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
              <div style={{ color: "var(--phosphor-fade)" }}>{hex}</div>
            </Cell>
          ))}
        </div>
      </div>
    ))}

    <SectionTitle>Type · Font stacks</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
      {FONT_STACKS.map(([name, stack]) => (
        <Cell key={name}>
          <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
          <div style={{ color: "var(--phosphor-dim)", marginTop: 4 }}>{stack}</div>
          <div style={{ fontFamily: `var(${name})`, color: "var(--ink)", marginTop: 8, fontSize: 14 }}>
            The quick brown fox 0123456789 // СЕКРЕТНО
          </div>
        </Cell>
      ))}
    </div>

    <SectionTitle>Type · Variants (.t-*)</SectionTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {TYPE_VARIANTS.map((v) => (
        <div key={v.cls} style={{ borderLeft: "1px dashed var(--phosphor-fade)", paddingLeft: 12 }}>
          <Caption>{`${v.cls} — ${v.sample}`}</Caption>
          <div className={v.cls}>{v.label}</div>
        </div>
      ))}
    </div>

    <SectionTitle>Type · Line height</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
      {LINE.map(([name, val]) => (
        <Cell key={name}>
          <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
          <div style={{ color: "var(--phosphor-fade)" }}>{val}</div>
          <div
            style={{
              marginTop: 8,
              lineHeight: `var(${name})`,
              color: "var(--ink)",
              fontFamily: "var(--font-body)",
              fontSize: 12,
            }}
          >
            sample line one<br />sample line two<br />sample line three
          </div>
        </Cell>
      ))}
    </div>

    <SectionTitle>Type · Tracking</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
      {TRACKING.map(([name, val]) => (
        <Cell key={name}>
          <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
          <div style={{ color: "var(--phosphor-fade)" }}>{val}</div>
          <div style={{ letterSpacing: `var(${name})`, color: "var(--ink)", marginTop: 8, fontFamily: "var(--font-terminal)", fontSize: 16, textTransform: "uppercase" }}>
            СЕКТОР-7 ANOM 0x1D
          </div>
        </Cell>
      ))}
    </div>

    <SectionTitle>Spacing scale</SectionTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {SPACING.map(([name, val]) => (
        <div key={name} style={{ display: "grid", gridTemplateColumns: "200px 100px 1fr", gap: 8, alignItems: "center" }}>
          <span style={{ color: "var(--phosphor)", fontFamily: "var(--font-code)", fontSize: 12, textShadow: "var(--glow-emerald)" }}>{name}</span>
          <span style={{ color: "var(--phosphor-fade)", fontFamily: "var(--font-code)", fontSize: 11 }}>{val}</span>
          <div style={{ height: 14, width: `calc(var(${name}) * 8)`, background: "var(--phosphor)", boxShadow: "var(--glow-emerald)" }} />
        </div>
      ))}
    </div>

    <SectionTitle>Borders</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {BORDERS.map((spec) => (
        <BorderSwatch key={spec.token} spec={spec} />
      ))}
    </div>

    <SectionTitle>Glow / elevation</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
      {GLOWS_FULL.map((spec) => (
        <GlowSwatch key={spec.token} spec={spec} />
      ))}
    </div>

    <SectionTitle>Scrollbar</SectionTitle>
    <Caption>unified phosphor scrollbar — global, token-driven</Caption>
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 8, fontFamily: "var(--font-code)", fontSize: 12, marginBottom: 16 }}>
      {SCROLLBAR.map(([name, val, desc]) => (
        <React.Fragment key={name}>
          <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
          <div>
            <span style={{ color: "var(--phosphor-bright)" }}>{val}</span>
            <span style={{ color: "var(--phosphor-fade)", marginLeft: 8 }}>// {desc}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start" }}>
      <div>
        <Caption>vertical</Caption>
        <ScrollbarDemo axis="y" />
      </div>
      <div>
        <Caption>horizontal</Caption>
        <ScrollbarDemo axis="x" />
      </div>
    </div>

    <SectionTitle>Z-index ramp</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "200px 80px 1fr", gap: 8, fontFamily: "var(--font-code)", fontSize: 12 }}>
      <div style={{ color: "var(--phosphor-dim)", textTransform: "uppercase", letterSpacing: "0.12em" }}>token</div>
      <div style={{ color: "var(--phosphor-dim)", textTransform: "uppercase", letterSpacing: "0.12em" }}>value</div>
      <div style={{ color: "var(--phosphor-dim)", textTransform: "uppercase", letterSpacing: "0.12em" }}>purpose</div>
      {Z_INDEX.map(([name, val, desc]) => (
        <React.Fragment key={name}>
          <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
          <div style={{ color: "var(--phosphor-bright)" }}>{val}</div>
          <div style={{ color: "var(--ink)" }}>{desc}</div>
        </React.Fragment>
      ))}
    </div>
  </Page>
);

export const Scrollbar = () => (
  <Page>
    <SectionTitle>Scrollbar</SectionTitle>
    <Caption>unified phosphor scrollbar — global, token-driven</Caption>
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 8, fontFamily: "var(--font-code)", fontSize: 12, marginBottom: 24 }}>
      {SCROLLBAR.map(([name, val, desc]) => (
        <React.Fragment key={name}>
          <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
          <div>
            <span style={{ color: "var(--phosphor-bright)" }}>{val}</span>
            <span style={{ color: "var(--phosphor-fade)", marginLeft: 8 }}>// {desc}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start" }}>
      <div>
        <Caption>vertical</Caption>
        <ScrollbarDemo axis="y" />
      </div>
      <div>
        <Caption>horizontal</Caption>
        <ScrollbarDemo axis="x" />
      </div>
    </div>
  </Page>
);

export const Colors = () => <Page>{COLORS.map(([label, group, vars]) => (
  <div key={label}>
    <SectionTitle>{label}</SectionTitle>
    <Caption>{group}</Caption>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
      {vars.map(([name, hex]) => (
        <Cell key={name}>
          <div style={{ background: hex, height: 56, marginBottom: 8, border: "1px solid var(--phosphor-fade)" }} />
          <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
          <div style={{ color: "var(--phosphor-fade)" }}>{hex}</div>
        </Cell>
      ))}
    </div>
  </div>
))}</Page>;

export const Typography = () => (
  <Page>
    <SectionTitle>Variants</SectionTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {TYPE_VARIANTS.map((v) => (
        <div key={v.cls} style={{ borderLeft: "1px dashed var(--phosphor-fade)", paddingLeft: 12 }}>
          <Caption>{`${v.cls} — ${v.sample}`}</Caption>
          <div className={v.cls}>{v.label}</div>
        </div>
      ))}
    </div>
  </Page>
);

export const Spacing = () => (
  <Page>
    <SectionTitle>Spacing scale</SectionTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {SPACING.map(([name, val]) => (
        <div key={name} style={{ display: "grid", gridTemplateColumns: "200px 100px 1fr", gap: 8, alignItems: "center" }}>
          <span style={{ color: "var(--phosphor)", fontFamily: "var(--font-code)", fontSize: 12, textShadow: "var(--glow-emerald)" }}>{name}</span>
          <span style={{ color: "var(--phosphor-fade)", fontFamily: "var(--font-code)", fontSize: 11 }}>{val}</span>
          <div style={{ height: 14, width: `calc(var(${name}) * 8)`, background: "var(--phosphor)", boxShadow: "var(--glow-emerald)" }} />
        </div>
      ))}
    </div>
  </Page>
);

export const Borders = () => (
  <Page>
    <SectionTitle>Borders</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {BORDERS.map((spec) => (
        <BorderSwatch key={spec.token} spec={spec} />
      ))}
    </div>
  </Page>
);

export const Glow = () => (
  <Page>
    <SectionTitle>Glow / elevation</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
      {GLOWS_FULL.map((spec) => (
        <GlowSwatch key={spec.token} spec={spec} />
      ))}
    </div>
  </Page>
);

export const ZIndex = () => (
  <Page>
    <SectionTitle>Z-index ramp</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "200px 80px 1fr", gap: 8, fontFamily: "var(--font-code)", fontSize: 12 }}>
      <div style={{ color: "var(--phosphor-dim)", textTransform: "uppercase", letterSpacing: "0.12em" }}>token</div>
      <div style={{ color: "var(--phosphor-dim)", textTransform: "uppercase", letterSpacing: "0.12em" }}>value</div>
      <div style={{ color: "var(--phosphor-dim)", textTransform: "uppercase", letterSpacing: "0.12em" }}>purpose</div>
      {Z_INDEX.map(([name, val, desc]) => (
        <React.Fragment key={name}>
          <div style={{ color: "var(--phosphor)", textShadow: "var(--glow-emerald)" }}>{name}</div>
          <div style={{ color: "var(--phosphor-bright)" }}>{val}</div>
          <div style={{ color: "var(--ink)" }}>{desc}</div>
        </React.Fragment>
      ))}
    </div>
  </Page>
);
