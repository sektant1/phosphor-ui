export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "lead"
  | "body"
  | "small"
  | "caption"
  | "mono"
  | "code"
  | "terminal"
  | "stamp"
  | "prompt"
  | "glow"
  | "glow-pale"
  | "muted"
  | "dim"
  | "faded";

export const TYPOGRAPHY_CLASS_BY_VARIANT: Record<TypographyVariant, string> = {
  h1: "t-h1",
  h2: "t-h2",
  h3: "t-h3",
  h4: "t-h4",
  h5: "t-h5",
  h6: "t-h6",
  lead: "t-lead",
  body: "t-body",
  small: "t-small",
  caption: "t-caption",
  mono: "t-mono",
  code: "t-code",
  terminal: "t-terminal",
  stamp: "t-stamp",
  prompt: "t-prompt",
  glow: "t-glow",
  "glow-pale": "t-glow-pale",
  muted: "t-muted",
  dim: "t-dim",
  faded: "t-faded",
};

export const TYPOGRAPHY_DEFAULT_TAG_BY_VARIANT: Record<
  TypographyVariant,
  keyof JSX.IntrinsicElements
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  body: "p",
  small: "small",
  caption: "span",
  mono: "span",
  code: "code",
  terminal: "span",
  stamp: "span",
  prompt: "span",
  glow: "span",
  "glow-pale": "span",
  muted: "span",
  dim: "span",
  faded: "span",
};
