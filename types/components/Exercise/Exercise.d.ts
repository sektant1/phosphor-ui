import React from "react";
export interface ExerciseTask {
    label: React.ReactNode;
    done?: boolean;
}
export interface ExerciseProps {
    n?: number;
    title?: string;
    tasks?: ExerciseTask[];
    onTaskChange?: (index: number, done: boolean) => void;
    className?: string;
    children?: React.ReactNode;
}
export declare const Exercise: React.FC<ExerciseProps>;
