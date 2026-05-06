import React from "react";
export declare type CalloutVariant = "info" | "quote" | "warn";
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CalloutVariant;
    title?: string;
}
export declare const Callout: React.FC<CalloutProps>;
export declare const CalloutHeading: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
