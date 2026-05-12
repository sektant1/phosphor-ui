export declare const PHOSPHOR_ANIMATION_NAMES: readonly ["phoBlink", "phoFadeUp", "phoFlickerIn", "phoPageEnter", "phosphorBlink", "phosphorBootline", "phosphorGeigerTick", "phosphorHeroBreathe", "phosphorHeroScan", "phosphorHudBlink", "phosphorHudPulse", "phosphorLedPulse", "phosphorNoiseShift", "phosphorShellFlicker", "phosphorTapeRoll"];
export type PhosphorAnimationName = (typeof PHOSPHOR_ANIMATION_NAMES)[number];
export declare const PHOSPHOR_MOTION_CLASS_NAMES: {
    readonly pageEnter: "pho-page-enter";
    readonly fadeUp: "pho-fade-up";
    readonly stagger: "pho-stagger";
    readonly flickerIn: "pho-flicker-in";
    readonly blink: "pho-blink";
    readonly bootline: "pho-bootline";
    readonly hsync: "pho-hsync";
    readonly ledPulse: "pho-led-pulse";
    readonly hudBlink: "pho-hud-blink";
    readonly hudPulse: "pho-hud-pulse";
    readonly geigerTick: "pho-geiger-tick";
};
export type PhosphorMotionClassName = (typeof PHOSPHOR_MOTION_CLASS_NAMES)[keyof typeof PHOSPHOR_MOTION_CLASS_NAMES];
