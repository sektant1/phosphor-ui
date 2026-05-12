import React from "react";
import type { ContentStatus } from "../../admin/ContentEditor/ContentEditor";
export type { ContentStatus };
export interface NoteData {
    title: string;
    body: string;
    tags: string[];
    status: ContentStatus;
}
export interface NoteEditorProps {
    initial?: Partial<NoteData>;
    onSave?: (data: NoteData) => void;
    onChange?: (data: NoteData) => void;
    onDiscard?: () => void;
    saving?: boolean;
    className?: string;
}
export declare const NoteEditor: React.FC<NoteEditorProps>;
