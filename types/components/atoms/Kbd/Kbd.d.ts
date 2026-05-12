import React from "react";
export type KbdVariant = "default" | "accent" | "muted";
export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
    variant?: KbdVariant;
}
export declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;
