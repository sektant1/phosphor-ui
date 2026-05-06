import React from "react";
export interface ModuleLesson {
    num: string;
    title: React.ReactNode;
    href?: string;
    length?: React.ReactNode;
    state?: "default" | "done" | "locked";
}
export interface ModuleAccordionProps {
    num: string;
    title: React.ReactNode;
    intro?: React.ReactNode;
    lessons?: ModuleLesson[];
    progress?: {
        value: number;
        total?: number;
        cells?: number;
    };
    defaultOpen?: boolean;
    className?: string;
}
export declare const ModuleAccordion: React.FC<ModuleAccordionProps>;
