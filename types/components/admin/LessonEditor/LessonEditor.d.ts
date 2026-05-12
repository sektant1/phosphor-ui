import React from "react";
import type { ContentStatus } from "../../admin/ContentEditor/ContentEditor";
export type { ContentStatus };
export interface LessonResource {
    label: string;
    url: string;
}
export interface LessonData {
    title: string;
    slug: string;
    body: string;
    duration: string;
    videoUrl: string;
    tags: string[];
    resources: LessonResource[];
    status: ContentStatus;
    free: boolean;
}
export interface LessonEditorProps {
    initial?: Partial<LessonData>;
    onSave?: (data: LessonData) => void;
    onChange?: (data: LessonData) => void;
    onDiscard?: () => void;
    saving?: boolean;
    className?: string;
}
export declare const LessonEditor: React.FC<LessonEditorProps>;
