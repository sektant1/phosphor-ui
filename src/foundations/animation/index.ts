export const PHOSPHOR_ANIMATION_NAMES = [
  "phoBlink",
  "phoFadeUp",
  "phoFlickerIn",
  "phoPageEnter",
  "phosphorBlink",
  "phosphorBootline",
  "phosphorGeigerTick",
  "phosphorHeroBreathe",
  "phosphorHeroScan",
  "phosphorHudBlink",
  "phosphorHudPulse",
  "phosphorLedPulse",
  "phosphorNoiseShift",
  "phosphorShellFlicker",
  "phosphorTapeRoll",
] as const;

export type PhosphorAnimationName = (typeof PHOSPHOR_ANIMATION_NAMES)[number];

export const PHOSPHOR_MOTION_CLASS_NAMES = {
  pageEnter: "pho-page-enter",
  fadeUp: "pho-fade-up",
  stagger: "pho-stagger",
  flickerIn: "pho-flicker-in",
  blink: "pho-blink",
  bootline: "pho-bootline",
  hsync: "pho-hsync",
  ledPulse: "pho-led-pulse",
  hudBlink: "pho-hud-blink",
  hudPulse: "pho-hud-pulse",
  geigerTick: "pho-geiger-tick",
} as const;

export type PhosphorMotionClassName =
  (typeof PHOSPHOR_MOTION_CLASS_NAMES)[keyof typeof PHOSPHOR_MOTION_CLASS_NAMES];
