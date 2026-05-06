import React from "react";
export interface PdaWindowProps {
    title?: React.ReactNode;
    meta?: React.ReactNode;
    leds?: ("rec" | "rx" | "pwr")[];
    children: React.ReactNode;
    className?: string;
}
export declare const PdaWindow: React.FC<PdaWindowProps>;
