import React from "react";
export type LessonState = "default" | "done" | "current" | "locked";
export type LessonKind = "read" | "video" | "lab" | "quiz" | "locked";
export interface LessonRowProps {
    num: string;
    title: React.ReactNode;
    length?: React.ReactNode;
    kind?: LessonKind;
    state?: LessonState;
    href?: string;
    icon?: React.ReactNode;
}
export interface LessonListProps {
    children: React.ReactNode;
    className?: string;
}
export declare const LessonList: React.FC<LessonListProps>;
export declare const LessonRow: React.FC<LessonRowProps>;
