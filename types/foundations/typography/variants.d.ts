export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "lead" | "body" | "small" | "caption" | "mono" | "code" | "terminal" | "stamp" | "prompt" | "glow" | "glow-pale" | "muted" | "dim" | "faded";
export declare const TYPOGRAPHY_CLASS_BY_VARIANT: Record<TypographyVariant, string>;
export declare const TYPOGRAPHY_DEFAULT_TAG_BY_VARIANT: Record<TypographyVariant, keyof JSX.IntrinsicElements>;
