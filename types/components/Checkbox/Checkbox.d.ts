import React from "react";
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    error?: boolean;
    label?: React.ReactNode;
    description?: React.ReactNode;
    strikethrough?: boolean;
    onCheckedChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (checked: boolean) => void;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
