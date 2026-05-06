import React from "react";
export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    error?: boolean;
    label?: React.ReactNode;
    onChange?: (checked: boolean) => void;
    id?: string;
    className?: string;
}
export declare const Checkbox: React.FC<CheckboxProps>;
