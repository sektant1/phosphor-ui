import React from "react";
export declare type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "mono" | "terminal" | "stamp" | "prompt" | "glow" | "glow-pale" | "dim" | "faded";
export interface TextProps {
    variant?: TextVariant;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}
declare const Text: React.FC<TextProps>;
export default Text;
