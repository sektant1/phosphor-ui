export declare const PHOSPHOR_EFFECT_CLASS_NAMES: {
    readonly crt: "pho-crt";
    readonly scanlines: "pho-scanlines";
    readonly noise: "pho-noise";
    readonly vignette: "pho-vignette";
    readonly phosphorGlow: "pho-phosphor-glow";
    readonly phosphorGlowSoft: "pho-phosphor-glow-soft";
};
export type PhosphorEffectClassName = (typeof PHOSPHOR_EFFECT_CLASS_NAMES)[keyof typeof PHOSPHOR_EFFECT_CLASS_NAMES];
