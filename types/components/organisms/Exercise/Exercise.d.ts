import React from "react";
export interface ExerciseTask {
    id?: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    done?: boolean;
}
export interface ExerciseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    n?: number;
    title?: React.ReactNode;
    tasks?: ExerciseTask[];
    onTaskChange?: (index: number, done: boolean) => void;
    children?: React.ReactNode;
}
export declare const Exercise: React.FC<ExerciseProps>;
