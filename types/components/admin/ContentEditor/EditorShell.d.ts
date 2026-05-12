import React from "react";
export interface EditorShellProps {
    kindLabel: string;
    meta?: React.ReactNode;
    statusControl?: React.ReactNode;
    footerStart?: React.ReactNode;
    saveLabel?: string;
    saving?: boolean;
    variant?: "default" | "compact";
    className?: string;
    children: React.ReactNode;
    onDiscard?: () => void;
    onSave?: () => void;
}
export declare const EditorShell: React.FC<EditorShellProps>;
