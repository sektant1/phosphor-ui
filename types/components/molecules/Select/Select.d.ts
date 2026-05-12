import React from "react";
import type { DataAttributes } from "../../atoms/primitive";
export interface SelectOption {
    label: React.ReactNode;
    value: string;
    disabled?: boolean;
}
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
    label?: React.ReactNode;
    helpText?: React.ReactNode;
    error?: React.ReactNode;
    prompt?: React.ReactNode;
    options: SelectOption[];
    controlClassName?: string;
    selectClassName?: string;
    rootProps?: React.HTMLAttributes<HTMLLabelElement> & DataAttributes;
    onValueChange?: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export interface SelectControlProps extends Omit<SelectProps, "label" | "helpText" | "error" | "rootProps"> {
}
export declare const SelectControl: React.ForwardRefExoticComponent<SelectControlProps & React.RefAttributes<HTMLSelectElement>>;
export declare const SelectField: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
