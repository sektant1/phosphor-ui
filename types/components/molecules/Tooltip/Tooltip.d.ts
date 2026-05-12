import React from "react";
export type TooltipPlacement = "top" | "right" | "bottom" | "left";
export interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactElement;
    placement?: TooltipPlacement;
    offset?: number;
    className?: string;
}
export declare const Tooltip: React.FC<TooltipProps>;
