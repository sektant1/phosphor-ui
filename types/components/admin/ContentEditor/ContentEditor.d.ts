import React from "react";
export type ContentStatus = "draft" | "published" | "archived";
export type FieldSpec = {
    kind: "text";
    key: string;
    label?: string;
    prompt?: string;
    placeholder?: string;
} | {
    kind: "textarea";
    key: string;
    label?: string;
    rows?: number;
    placeholder?: string;
} | {
    kind: "tags";
    key: string;
    label?: string;
    placeholder?: string;
    chip?: "tag" | "outline";
} | {
    kind: "checkbox";
    key: string;
    description: string;
} | {
    kind: "pairs";
    key: string;
    label: string;
    addLabel: string;
    columns: [PairColumn, PairColumn];
} | {
    kind: "list";
    key: string;
    label: string;
    addLabel: string;
    placeholder: string;
    leading?: string;
    itemKey?: string;
};
export interface PairColumn {
    key: string;
    placeholder: string;
    flex?: string | number;
}
export interface ContentEditorProps<T extends object = Record<string, unknown>> {
    kindLabel: string;
    saveLabel?: string;
    initial?: Partial<T>;
    fields: FieldSpec[];
    status?: boolean;
    autoSlug?: {
        from: string;
        to: string;
    };
    preview?: (data: T) => React.ReactNode;
    onSave?: (data: T) => void;
    onChange?: (data: T) => void;
    onDiscard?: () => void;
    saving?: boolean;
    variant?: "default" | "compact";
    className?: string;
}
export declare function ContentEditor<T extends object = Record<string, unknown>>({ kindLabel, saveLabel, initial, fields, status, autoSlug, preview, onSave, onChange, onDiscard, saving, variant, className, }: ContentEditorProps<T>): React.JSX.Element;
