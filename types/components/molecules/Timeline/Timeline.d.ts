import React from "react";
export type TimelineItemStatus = "done" | "active" | "upcoming";
export interface TimelineItem {
    date?: string;
    title: string;
    body?: React.ReactNode;
    status?: TimelineItemStatus;
    href?: string;
}
export interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}
export declare const Timeline: React.FC<TimelineProps>;
