import React from "react";
import type { Meta } from "@storybook/react";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import Header from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";

export default {
  title: "Foundations/Tokens",
} satisfies Meta;

type ColorGroup = [label: string, group: string, vars: Array<[string, string]>];

const PHOSPHOR_COLORS: ColorGroup[] = [
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

const AMBER_COLORS: ColorGroup[] = [
  [
    "Amber",
    "primary tube column",
    [
      ["--phosphor", "#ffb000"],
      ["--phosphor-bright", "#ffecb3"],
      ["--phosphor-dim", "#cc7a00"],
      ["--phosphor-fade", "#664000"],
    ],
  ],
  [
    "Warm accent",
    "secondary amber column",
    [
      ["--magenta", "#ffd166"],
      ["--magenta-bright", "#fff2cc"],
      ["--magenta-deep", "#996000"],
      ["--magenta-fade", "#3d2600"],
    ],
  ],
  [
    "Extras",
    "extra single-channel hues",
    [
      ["--moss", "#ffbf33"],
      ["--spring", "#ffd166"],
      ["--rose", "#ffe08a"],
    ],
  ],
  [
    "Surfaces",
    "tube body / surfaces / ink",
    [
      ["--bg", "#0b0702"],
      ["--bg-raise", "#140d04"],
      ["--bg-deep", "#050301"],
      ["--ink", "#ffe4a3"],
    ],
  ],
  [
    "Code tokens",
    "syntax highlight palette",
    [
      ["--code-bg", "#090602"],
      ["--code-fn", "#ffecb3"],
      ["--code-comment", "#8a5c17"],
      ["--code-keyword", "#ffbf33"],
      ["--code-string", "#ffd166"],
      ["--code-number", "#ffe08a"],
      ["--code-var", "#ffe4a3"],
      ["--code-type", "#ffcf66"],
      ["--code-punct", "#996000"],
      ["--code-tag", "#ffbf33"],
      ["--code-attr", "#ffd166"],
      ["--code-builtin", "#ffcf66"],
      ["--code-operator", "#ffecb3"],
    ],
  ],
];


const CYAN_COLORS: ColorGroup[] = [
  [
    "Cyan",
    "primary tube column",
    [
      ["--phosphor", "#19f7ff"],
      ["--phosphor-bright", "#c8fbff"],
      ["--phosphor-dim", "#00aeca"],
      ["--phosphor-fade", "#005064"],
    ],
  ],
  [
    "Cool accent",
    "secondary cyan column",
    [
      ["--magenta", "#7dfcff"],
      ["--magenta-bright", "#e5feff"],
      ["--magenta-deep", "#008aa3"],
      ["--magenta-fade", "#003344"],
    ],
  ],
  [
    "Extras",
    "extra single-channel hues",
    [
      ["--moss", "#31d7ff"],
      ["--spring", "#5fffff"],
      ["--rose", "#a8f8ff"],
    ],
  ],
  [
    "Surfaces",
    "tube body / surfaces / ink",
    [
      ["--bg", "#020b10"],
      ["--bg-raise", "#061923"],
      ["--bg-deep", "#000407"],
      ["--ink", "#d6fbff"],
    ],
  ],
  [
    "Code tokens",
    "syntax highlight palette",
    [
      ["--code-bg", "#021016"],
      ["--code-fn", "#c8fbff"],
      ["--code-comment", "#32798a"],
      ["--code-keyword", "#31d7ff"],
      ["--code-string", "#7dfcff"],
      ["--code-number", "#a8f8ff"],
      ["--code-var", "#d6fbff"],
      ["--code-type", "#5fffff"],
      ["--code-punct", "#008aa3"],
      ["--code-tag", "#31d7ff"],
      ["--code-attr", "#7dfcff"],
      ["--code-builtin", "#5fffff"],
      ["--code-operator", "#c8fbff"],
    ],
  ],
];

const RED_COLORS: ColorGroup[] = [
  [
    "Red",
    "primary tube column",
    [
      ["--phosphor", "#ff2a2a"],
      ["--phosphor-bright", "#ffb8b8"],
      ["--phosphor-dim", "#c41818"],
      ["--phosphor-fade", "#5a0a0a"],
    ],
  ],
  [
    "Crimson accent",
    "secondary red column",
    [
      ["--magenta", "#ff6b6b"],
      ["--magenta-bright", "#ffd1d1"],
      ["--magenta-deep", "#991010"],
      ["--magenta-fade", "#3d0606"],
    ],
  ],
  [
    "Extras",
    "extra single-channel hues",
    [
      ["--moss", "#ff4d4d"],
      ["--spring", "#ff8080"],
      ["--rose", "#ffb3b3"],
    ],
  ],
  [
    "Surfaces",
    "tube body / surfaces / ink",
    [
      ["--bg", "#100303"],
      ["--bg-raise", "#1c0707"],
      ["--bg-deep", "#060101"],
      ["--ink", "#ffdada"],
    ],
  ],
  [
    "Code tokens",
    "syntax highlight palette",
    [
      ["--code-bg", "#110303"],
      ["--code-fn", "#ffb8b8"],
      ["--code-comment", "#8a3a3a"],
      ["--code-keyword", "#ff4d4d"],
      ["--code-string", "#ff8080"],
      ["--code-number", "#ffb3b3"],
      ["--code-var", "#ffdada"],
      ["--code-type", "#ff6b6b"],
      ["--code-punct", "#991010"],
      ["--code-tag", "#ff4d4d"],
      ["--code-attr", "#ff8080"],
      ["--code-builtin", "#ff6b6b"],
      ["--code-operator", "#ffb8b8"],
    ],
  ],
];

const TYPE_VARIANTS: Array<{ cls: string; label: string; sample: string }> = [
  { cls: "t-h1", label: "// SECTOR-7 // АНОМАЛЬНАЯ АКТИВНОСТЬ", sample: "Display heading — --pho-type-h1-size" },
  { cls: "t-h2", label: "transmission log", sample: "Section heading — --pho-type-h2-size" },
  { cls: "t-h3", label: "▸ artifact recovery", sample: "Subsection — --pho-type-h3-size" },
  { cls: "t-h4", label: "└─ side note", sample: "Tertiary — --pho-type-h4-size" },
  { cls: "t-h5", label: "dense subsection", sample: "Small heading — --pho-type-h5-size" },
  { cls: "t-h6", label: "tertiary metadata", sample: "Smallest heading — --pho-type-h6-size" },
  { cls: "t-lead", label: "Readable intro copy for posts, wiki entries, and project pages.", sample: "Lead — --pho-type-lead-size" },
  { cls: "t-body", label: "Pool reuse open DB connections. No new connection per request.", sample: "Body — --pho-type-body-size" },
  { cls: "t-small", label: "Small supporting copy remains legible in dense interfaces.", sample: "Small — --pho-type-small-size" },
  { cls: "t-caption", label: "updated 2026-05-10", sample: "Caption — --pho-type-caption-size" },
  { cls: "t-mono", label: "grep -r 'transmission' .", sample: "Mono — --pho-type-mono-size" },
  { cls: "t-code", label: "npm run validate:package", sample: "Code — --pho-type-mono-size" },
  { cls: "t-terminal", label: "CH 0x4C · NORM", sample: "Terminal display — VCR OSD Mono + tracking-wider" },
  { cls: "t-stamp", label: "// LAST CONTACT //", sample: "Stamp — caption + tracking-stamp" },
  { cls: "t-prompt", label: "~/zone-net $", sample: "Prompt — terminal + accent glow" },
  { cls: "t-glow", label: "glowing emerald text", sample: "Glow — primary + token glow" },
  { cls: "t-glow-pale", label: "paper-mint highlight", sample: "Glow pale — primary strong + token glow" },
  { cls: "t-dim", label: "dim phosphor, no glow", sample: "Dim — secondary UI text" },
  { cls: "t-faded", label: "deep forest, no glow", sample: "Faded — tertiary metadata" },
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
  { token: "--pho-glow-info", label: "MOSS", textColor: "var(--pho-color-info)", textShadow: "var(--pho-glow-info)" },
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
  ["--pho-font-display", "Bender -> JetBrains Mono -> ui-monospace"],
  ["--pho-font-heading", "Bender -> JetBrains Mono -> ui-monospace"],
  ["--pho-font-body", "JetBrains Mono -> Bender -> ui-monospace"],
  ["--pho-font-code", "JetBrains Mono -> Bender -> ui-monospace"],
  ["--pho-font-terminal", "JetBrains Mono -> Bender -> ui-monospace"],
  ["--pho-font-terminal-display", "VCR OSD Mono -> JetBrains Mono -> ui-monospace"],
  ["--pho-font-control", "Bender -> JetBrains Mono -> ui-monospace"],
];

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2
    style={{
      fontFamily: "var(--pho-font-heading)",
      fontWeight: 700,
      fontSize: "var(--pho-type-control-size)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--pho-color-primary-strong)",
      textShadow: "var(--pho-glow-primary)",
      borderLeft: "3px solid var(--pho-color-primary)",
      borderBottom: "1px solid var(--pho-color-primary-faint)",
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
      fontFamily: "var(--pho-font-terminal)",
      fontSize: "var(--pho-type-caption-size)",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--pho-color-primary-faint)",
      marginBottom: 8,
    }}
  >
    {children}
  </div>
);

const Cell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      border: "1px solid var(--pho-color-primary-faint)",
      padding: 10,
      fontFamily: "var(--pho-font-code)",
      fontSize: "var(--pho-type-caption-size)",
      color: "var(--pho-color-text)",
      background: "var(--pho-color-background-raised)",
    }}
  >
    {children}
  </div>
);

const Page: React.FC<{ children: React.ReactNode; theme?: "phosphor" | "amber" | "cyan" | "red" }> = ({ children, theme }) => (
  <div
    data-theme={theme}
    style={{
      padding: 24,
      background: "var(--pho-color-background)",
      minHeight: "100vh",
      color: "var(--pho-color-text)",
      fontFamily: "var(--pho-font-body)",
    }}
  >
    {children}
  </div>
);

const TokenOverview: React.FC<{
  colors: ColorGroup[];
  theme?: "phosphor" | "amber" | "cyan" | "red";
  caption: string;
}> = ({ colors, theme, caption }) => (
  <Page theme={theme}>
    <h1
      style={{
        fontFamily: "var(--pho-font-heading)",
        fontSize: "var(--pho-type-h1-size)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--pho-color-primary-strong)",
        textShadow: "var(--pho-glow-primary)",
        margin: 0,
      }}
    >
      Zone Design System :: Tokens
    </h1>
    <Caption>{caption}</Caption>

    {colors.map(([label, group, vars]) => (
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
          <div style={{ fontFamily: `var(${name})`, color: "var(--pho-color-text)", marginTop: 8, fontSize: "var(--pho-type-control-sm-size)" }}>
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

export const All = () => (
  <TokenOverview
    colors={PHOSPHOR_COLORS}
    caption="// СЕКРЕТНО // single-channel green phosphor"
  />
);

export const Amber = () => (
  <TokenOverview
    theme="amber"
    colors={AMBER_COLORS}
    caption="// СЕКРЕТНО // single-channel amber phosphor"
  />
);

export const Cyan = () => (
  <TokenOverview
    theme="cyan"
    colors={CYAN_COLORS}
    caption="// СЕКРЕТНО // single-channel cyan CRT"
  />
);

export const Red = () => (
  <TokenOverview
    theme="red"
    colors={RED_COLORS}
    caption="// СЕКРЕТНО // single-channel red phosphor — alert channel"
  />
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

const ColorPalette: React.FC<{ colors: ColorGroup[] }> = ({ colors }) => (
  <>
    {colors.map(([label, group, vars]) => (
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
    ))}
  </>
);

export const Colors = () => <Page><ColorPalette colors={PHOSPHOR_COLORS} /></Page>;

export const ColorsAmber = () => (
  <Page theme="amber">
    <ColorPalette colors={AMBER_COLORS} />
  </Page>
);

export const ColorsCyan = () => (
  <Page theme="cyan">
    <ColorPalette colors={CYAN_COLORS} />
  </Page>
);

export const ColorsRed = () => (
  <Page theme="red">
    <ColorPalette colors={RED_COLORS} />
  </Page>
);

export const Typography = () => (
  <Page>
    <SectionTitle>Font roles</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
      {FONT_STACKS.map(([name, stack]) => (
        <Cell key={name}>
          <div className="t-caption">{name}</div>
          <div className="t-faded" style={{ marginTop: 4 }}>{stack}</div>
          <div style={{ fontFamily: `var(${name})`, marginTop: 8 }}>
            The quick brown fox 0123456789
          </div>
        </Cell>
      ))}
    </div>

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

export const TypographyUsage = () => (
  <Page>
    <SectionTitle>Real usage examples</SectionTitle>
    <div style={{ display: "grid", gap: 18, maxWidth: 920 }}>
      <Header
        title="ZONE"
        variant="terminal"
        nav={[
          { label: "home", href: "/", active: true },
          { label: "posts", href: "/posts" },
          { label: "archive", href: "/archive" },
        ]}
        tagline="lowercase and uppercase navigation scan"
      />

      <section>
        <h3 className="t-h3">UI control cluster</h3>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 1fr) auto auto", gap: 12, alignItems: "end" }}>
          <Input label="Signal ID" defaultValue="phase-0x4c" helpText="Caption-sized help text stays readable." />
          <Input label="Checksum" defaultValue="BAD" error="Checksum mismatch." />
          <Button>Commit</Button>
        </div>
      </section>

      <section>
        <h3 className="t-h3">Dense metadata list</h3>
        <dl style={{ display: "grid", gridTemplateColumns: "12rem 1fr", gap: "0.35rem 1rem", margin: 0 }}>
          {[
            ["status", "nominal"],
            ["last contact", "2026-05-10 14:32Z"],
            ["module path", "/archive/sector-seven/long-lowercase-slug"],
            ["operator", "night-shift"],
          ].map(([term, value]) => (
            <React.Fragment key={term}>
              <dt className="t-caption">{term}</dt>
              <dd className="t-small" style={{ margin: 0 }}>{value}</dd>
            </React.Fragment>
          ))}
        </dl>
      </section>

      <Footer
        brand="phosphor ui"
        links={[
          { label: "docs", href: "#" },
          { label: "tokens", href: "#" },
        ]}
        status={{ label: "font", value: "google" }}
        meta="Footer metadata uses compact tokenized typography."
      />
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
