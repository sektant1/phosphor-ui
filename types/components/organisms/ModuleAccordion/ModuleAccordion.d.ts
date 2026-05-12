import React from "react";
export interface ModuleLesson {
    id?: string;
    num: string;
    title: React.ReactNode;
    href?: string;
    length?: React.ReactNode;
    state?: "default" | "done" | "locked";
}
export interface ModuleAccordionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
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
    onOpenChange?: (open: boolean) => void;
    renderLesson?: (lesson: ModuleLesson, index: number) => React.ReactNode;
}
export declare const ModuleAccordion: React.FC<ModuleAccordionProps>;
