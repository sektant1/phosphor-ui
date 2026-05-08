export const PHOSPHOR_ANIMATION_NAMES = [
  "phosphorBlink",
  "phosphorBootline",
  "phosphorGeigerTick",
  "phosphorHeroBreathe",
  "phosphorHeroScan",
  "phosphorHudBlink",
  "phosphorHudPulse",
  "phosphorLedPulse",
  "phosphorNoiseShift",
  "phosphorTapeRoll",
] as const;

export type PhosphorAnimationName = (typeof PHOSPHOR_ANIMATION_NAMES)[number];
