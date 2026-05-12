import React from "react";
import { type BannerFontName } from "../../../ascii";
export interface HeroFrameProps extends React.HTMLAttributes<HTMLDivElement> {
    art?: string;
    text?: string;
    font?: BannerFontName;
    topHud?: React.ReactNode;
    bottomHud?: React.ReactNode;
    scanline?: boolean;
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
