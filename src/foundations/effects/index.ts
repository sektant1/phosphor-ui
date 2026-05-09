export const PHOSPHOR_EFFECT_CLASS_NAMES = {
  crt: "pho-crt",
  scanlines: "pho-scanlines",
  noise: "pho-noise",
  vignette: "pho-vignette",
  phosphorGlow: "pho-phosphor-glow",
  phosphorGlowSoft: "pho-phosphor-glow-soft",
} as const;

export type PhosphorEffectClassName =
  (typeof PHOSPHOR_EFFECT_CLASS_NAMES)[keyof typeof PHOSPHOR_EFFECT_CLASS_NAMES];
