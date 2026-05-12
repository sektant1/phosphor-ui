import React from "react";
import type { ContentStatus } from "../../admin/ContentEditor/ContentEditor";
export type { ContentStatus };
export interface ProjectLink {
    label: string;
    url: string;
}
export interface ProjectData {
    title: string;
    slug: string;
    description: string;
    body: string;
    tags: string[];
    links: ProjectLink[];
    status: ContentStatus;
    featured: boolean;
}
export interface ProjectEditorProps {
    initial?: Partial<ProjectData>;
    onSave?: (data: ProjectData) => void;
    onChange?: (data: ProjectData) => void;
    onDiscard?: () => void;
    saving?: boolean;
    className?: string;
}
export declare const ProjectEditor: React.FC<ProjectEditorProps>;
