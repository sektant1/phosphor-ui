import React from "react";
export interface TagInputProps {
    label?: string;
    placeholder?: string;
    chip?: "tag" | "outline";
    value: string[];
    inputValue: string;
    onInputChange: (value: string) => void;
    onChange: (value: string[]) => void;
}
export declare const TagInput: React.FC<TagInputProps>;
