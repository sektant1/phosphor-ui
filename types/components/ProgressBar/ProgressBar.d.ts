import React from "react";
export interface ProgressBarProps {
    value: number;
    total?: number;
    label?: React.ReactNode;
    showPercent?: boolean;
    current?: boolean;
    segments?: number;
    slim?: boolean;
    meta?: React.ReactNode;
    className?: string;
}
export declare const ProgressBar: React.FC<ProgressBarProps>;
