import React from "react";
export interface HeroFrameProps {
    art: string;
    topHud?: React.ReactNode;
    bottomHud?: React.ReactNode;
    scanline?: boolean;
    className?: string;
}
export declare const HeroFrame: React.FC<HeroFrameProps> & {
    Hud: typeof Hud;
    HudLed: typeof HudLed;
    HudLabel: typeof HudLabel;
    HudText: typeof HudText;
    HudSpacer: typeof HudSpacer;
    HudTape: typeof HudTape;
    HudBars: typeof HudBars;
};
declare const Hud: React.FC<{
    position?: "top" | "bottom";
    children: React.ReactNode;
}>;
declare const HudLed: React.FC<{
    variant?: "rec" | "pwr";
}>;
declare const HudLabel: React.FC<{
    children: React.ReactNode;
}>;
declare const HudText: React.FC<{
    children: React.ReactNode;
}>;
declare const HudSpacer: React.FC;
declare const HudBars: React.FC<{
    value: number;
    max?: number;
}>;
declare const HudTape: React.FC<{
    text: string;
    speed?: number;
}>;
export {};
