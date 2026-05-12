import React from "react";
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    error?: boolean;
    label?: React.ReactNode;
    description?: React.ReactNode;
    strikethrough?: boolean;
    onCheckedChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (checked: boolean) => void;
}
export interface CheckboxControlProps extends Omit<CheckboxProps, "label" | "description" | "strikethrough" | "children"> {
}
export declare const CheckboxControl: React.ForwardRefExoticComponent<CheckboxControlProps & React.RefAttributes<HTMLInputElement>>;
export declare const CheckboxField: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
