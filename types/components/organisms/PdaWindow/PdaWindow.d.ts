import React from "react";
export interface PdaWindowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: React.ReactNode;
    meta?: React.ReactNode;
    leds?: ("rec" | "rx" | "pwr")[];
    children: React.ReactNode;
}
export declare const PdaWindow: React.FC<PdaWindowProps>;
