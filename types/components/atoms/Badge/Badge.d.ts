import React from "react";
export type BadgeTone = "primary" | "accent" | "success" | "warn" | "danger" | "muted";
export type BadgeSize = "sm" | "md";
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
    size?: BadgeSize;
    leading?: React.ReactNode;
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
