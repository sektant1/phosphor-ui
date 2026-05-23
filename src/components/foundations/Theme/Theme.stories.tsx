import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../../atoms/Badge";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { H2 } from "../../atoms/Headings";
import { Callout } from "../../molecules/Callout";
import { CRTScreen } from "../CRT";
import { ThemeProvider, ThemeToggle } from "./Theme";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof ThemeProvider> = {
  title: "Foundations/Themes",
  component: ThemeProvider,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

const comparisonSource = tsx`
import { Badge, Button, Callout, CRTScreen, H2, Input } from "phosphor-ui";

function ThemeSample({ theme }: { theme?: "phosphor" | "amber" | "cyan" | "red" }) {
  return (
    <div
      data-theme={theme}
      style={{
        minHeight: "100vh",
        padding: 32,
        background: "var(--pho-crt-shell-bg)",
        color: "var(--pho-color-text)",
        fontFamily: "var(--pho-font-body)",
      }}
    >
      <CRTScreen noise style={{ padding: 24, border: "var(--pho-border-frame)" }}>
        <H2 glyph=">">{theme} channel</H2>
        <p style={{ maxWidth: 680, color: "var(--pho-color-text-muted)" }}>
          Theme tokens drive text, panels, borders, hovers, focus states, glow, scanlines,
          and CRT shadow without local color overrides.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBlock: 18 }}>
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="accent">accent</Button>
          <Button variant="ghost">ghost</Button>
          <Badge>{theme ?? "active"}</Badge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <Callout variant="info" title="panel">
            CRT overlays are pointer-safe and theme-aware.
          </Callout>
          <Input variant="terminal" prompt="theme $" defaultValue={theme ?? "active"} />
        </div>
      </CRTScreen>
    </div>
  );
}

export function Example() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
      <ThemeSample theme="phosphor" />
      <ThemeSample theme="amber" />
      <ThemeSample theme="cyan" />
      <ThemeSample theme="red" />
    </div>
  );
}
`;

const toggleSource = tsx`
import { ThemeProvider, ThemeToggle } from "phosphor-ui";

export function Example() {
  return (
    <ThemeProvider storageKey="phosphor-story-theme">
      <div
        style={{
          minHeight: "100vh",
          padding: 32,
          background: "var(--pho-crt-shell-bg)",
          color: "var(--pho-color-text)",
        }}
      >
        <ThemeToggle />
        <div style={{ marginTop: 24 }}>Theme-aware content</div>
      </div>
    </ThemeProvider>
  );
}
`;

function ThemeSample({ theme }: { theme?: "phosphor" | "amber" | "cyan" | "red" }) {
  return (
    <div
      data-theme={theme}
      style={{
        minHeight: "100vh",
        padding: 32,
        background: "var(--pho-crt-shell-bg)",
        color: "var(--pho-color-text)",
        fontFamily: "var(--pho-font-body)",
      }}
    >
      <CRTScreen noise style={{ padding: 24, border: "var(--pho-border-frame)" }}>
        <H2 glyph="▸">{theme} channel</H2>
        <p style={{ maxWidth: 680, color: "var(--pho-color-text-muted)" }}>
          Theme tokens drive text, panels, borders, hovers, focus states, glow, scanlines,
          and CRT shadow without local color overrides.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBlock: 18 }}>
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="accent">accent</Button>
          <Button variant="ghost">ghost</Button>
          <Badge>{theme ?? "active"}</Badge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <Callout variant="info" title="panel">
            CRT overlays are pointer-safe and theme-aware.
          </Callout>
          <Input variant="terminal" prompt="theme $" defaultValue={theme ?? "active"} />
        </div>
      </CRTScreen>
    </div>
  );
}

export const Comparison: Story = {
  parameters: { docs: { source: source(comparisonSource) } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
      <ThemeSample theme="phosphor" />
      <ThemeSample theme="amber" />
      <ThemeSample theme="cyan" />
      <ThemeSample theme="red" />
    </div>
  ),
};

export const Toggle: Story = {
  parameters: { docs: { source: source(toggleSource) } },
  render: () => (
    <ThemeProvider storageKey="phosphor-story-theme">
      <div
        style={{
          minHeight: "100vh",
          padding: 32,
          background: "var(--pho-crt-shell-bg)",
          color: "var(--pho-color-text)",
        }}
      >
        <ThemeToggle />
        <div style={{ marginTop: 24 }}>
          <ThemeSample />
        </div>
      </div>
    </ThemeProvider>
  ),
};
