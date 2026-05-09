export const PHOSPHOR_TOKEN_CSS_PATH = "tokens.css";
export const PHOSPHOR_GLOBAL_CSS_PATH = "global.css";
export const PHOSPHOR_FULL_CSS_PATH = "phosphor.css";

export const PHOSPHOR_CSS_ENTRYPOINTS = {
  full: PHOSPHOR_FULL_CSS_PATH,
  tokens: PHOSPHOR_TOKEN_CSS_PATH,
  global: PHOSPHOR_GLOBAL_CSS_PATH,
} as const;

export const PHOSPHOR_TOKEN_GROUPS = {
  color: [
    "--pho-color-background",
    "--pho-color-background-raised",
    "--pho-color-background-deep",
    "--pho-color-text",
    "--pho-color-text-strong",
    "--pho-color-text-muted",
    "--pho-color-text-faint",
    "--pho-color-primary",
    "--pho-color-primary-strong",
    "--pho-color-primary-muted",
    "--pho-color-primary-faint",
    "--pho-color-accent",
    "--pho-color-accent-strong",
    "--pho-color-accent-muted",
    "--pho-color-accent-faint",
    "--pho-color-info",
    "--pho-color-success",
    "--pho-color-highlight",
    "--pho-color-link",
    "--pho-color-link-hover",
    "--pho-color-inverse",
    "--pho-color-selection-bg",
    "--pho-color-selection-text",
  ],
  font: [
    "--pho-font-display",
    "--pho-font-heading",
    "--pho-font-body",
    "--pho-font-code",
    "--pho-font-terminal",
  ],
  type: [
    "--pho-type-h1-size",
    "--pho-type-h2-size",
    "--pho-type-h3-size",
    "--pho-type-h4-size",
    "--pho-type-body-size",
    "--pho-type-mono-size",
    "--pho-line-tight",
    "--pho-line-snug",
    "--pho-line-normal",
    "--pho-line-prose",
    "--pho-tracking-tight",
    "--pho-tracking-normal",
    "--pho-tracking-wide",
    "--pho-tracking-wider",
    "--pho-tracking-stamp",
  ],
  space: [
    "--pho-space-0",
    "--pho-space-1",
    "--pho-space-2",
    "--pho-space-3",
    "--pho-space-4",
    "--pho-space-5",
    "--pho-space-6",
    "--pho-space-7",
    "--pho-size-touch-target",
    "--pho-size-content",
    "--pho-size-prose",
  ],
  border: [
    "--pho-border-frame",
    "--pho-border-line",
    "--pho-border-dashed",
    "--pho-border-dotted",
    "--pho-border-accent",
    "--pho-border-accent-dashed",
    "--pho-rail-strong",
    "--pho-rail-quote",
    "--pho-focus-ring",
    "--pho-focus-offset",
    "--pho-radius-none",
    "--pho-radius-sm",
    "--pho-radius-md",
  ],
  effect: [
    "--pho-glow-primary",
    "--pho-glow-accent",
    "--pho-glow-info",
    "--pho-glow-primary-soft",
    "--pho-glow-accent-soft",
    "--pho-glow-readable",
    "--pho-cursor-default",
    "--pho-cursor-pointer",
    "--pho-cursor-text",
    "--pho-cursor-disabled",
  ],
  layer: [
    "--pho-z-deep",
    "--pho-z-default",
    "--pho-z-raised",
    "--pho-z-fx-noise",
    "--pho-z-fx-vignette",
    "--pho-z-fx-frame",
    "--pho-z-fx-flicker",
    "--pho-z-shell",
    "--pho-z-backdrop",
    "--pho-z-drawer",
  ],
  scrollbar: [
    "--pho-scrollbar-size",
    "--pho-scrollbar-track",
    "--pho-scrollbar-thumb",
    "--pho-scrollbar-thumb-hover",
    "--pho-scrollbar-thumb-active",
  ],
} as const;

export type PhosphorTokenGroup = keyof typeof PHOSPHOR_TOKEN_GROUPS;
export type PhosphorTokenName =
  (typeof PHOSPHOR_TOKEN_GROUPS)[PhosphorTokenGroup][number];

export const PHOSPHOR_TOKENS = Object.values(PHOSPHOR_TOKEN_GROUPS).flat() as PhosphorTokenName[];

export function phosphorVar(token: PhosphorTokenName, fallback?: string): string {
  return fallback ? `var(${token}, ${fallback})` : `var(${token})`;
}
