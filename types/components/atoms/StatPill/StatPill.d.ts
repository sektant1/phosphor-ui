import React from "react";
export type StatPillColor = "phosphor" | "magenta" | "dim";
export interface StatPillProps {
    label: string;
    value: React.ReactNode;
    color?: StatPillColor;
    className?: string;
}
export declare const StatPill: React.FC<StatPillProps>;
