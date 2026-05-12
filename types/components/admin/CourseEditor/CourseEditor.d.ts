import React from "react";
import type { ContentStatus } from "../../admin/ContentEditor/ContentEditor";
export type { ContentStatus };
export interface CourseModule {
    id: string;
    title: string;
    description?: string;
}
export interface CourseData {
    title: string;
    slug: string;
    tagline: string;
    description: string;
    tags: string[];
    modules: CourseModule[];
    status: ContentStatus;
    price: string;
    featured: boolean;
}
export interface CourseEditorProps {
    initial?: Partial<CourseData>;
    onSave?: (data: CourseData) => void;
    onChange?: (data: CourseData) => void;
    onDiscard?: () => void;
    saving?: boolean;
    className?: string;
}
export declare const CourseEditor: React.FC<CourseEditorProps>;
