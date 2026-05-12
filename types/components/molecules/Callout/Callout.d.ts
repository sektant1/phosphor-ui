import React from "react";
export type CalloutVariant = "info" | "note" | "tip" | "success" | "warn" | "danger" | "quote" | "terminal";
export type CalloutSize = "sm" | "md" | "lg";
export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    variant?: CalloutVariant;
    size?: CalloutSize;
    title?: React.ReactNode;
    glyph?: React.ReactNode;
    hideGlyph?: boolean;
    actions?: React.ReactNode;
}
export declare const Callout: React.FC<CalloutProps>;
export declare const CalloutHeading: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
