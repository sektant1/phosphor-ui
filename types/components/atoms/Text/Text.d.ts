import React from "react";
import type { TypographyVariant } from "../../../foundations/typography/variants";
export type TextVariant = TypographyVariant;
export type TextTone = "default" | "primary" | "accent" | "danger" | "muted" | "dim" | "faded";
export type TextAlign = "start" | "center" | "end";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    variant?: TextVariant;
    as?: keyof JSX.IntrinsicElements;
    tone?: TextTone;
    align?: TextAlign;
    transform?: TextTransform;
    truncate?: boolean;
    balance?: boolean;
    nowrap?: boolean;
}
declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>;
export default Text;
