import React from "react";
export interface LocaleSwitchItem {
    code: string;
    label: React.ReactNode;
    href: string;
    active?: boolean;
}
export type LocaleSwitchVariant = "inline" | "segmented" | "terminal";
export type LocaleSwitchSize = "sm" | "md";
export interface LocaleSwitchProps extends React.HTMLAttributes<HTMLElement> {
    locales: LocaleSwitchItem[];
    ariaLabel?: string;
    variant?: LocaleSwitchVariant;
    size?: LocaleSwitchSize;
    showPrompt?: boolean;
}
export declare const LocaleSwitch: React.ForwardRefExoticComponent<LocaleSwitchProps & React.RefAttributes<HTMLElement>>;
