import React from "react";
export type PrereqStatus = "met" | "missing" | "soft";
export interface PrereqItem {
    title: React.ReactNode;
    sub?: React.ReactNode;
    status: PrereqStatus;
}
export interface PrereqListProps {
    heading?: React.ReactNode;
    stamp?: React.ReactNode;
    items: PrereqItem[];
    className?: string;
}
export declare const PrereqList: React.FC<PrereqListProps>;
