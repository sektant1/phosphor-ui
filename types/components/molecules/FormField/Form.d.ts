import React from "react";
import type { InputControlProps, TextareaControlProps } from "../../atoms/Input";
import type { SelectControlProps, SelectOption } from "../Select";
type FormFieldBase = {
    name: string;
    label: React.ReactNode;
    hint?: React.ReactNode;
    error?: React.ReactNode;
    required?: boolean;
    fieldClassName?: string;
};
export type FormFieldConfig = (FormFieldBase & {
    type?: "input";
    inputProps?: Omit<InputControlProps, "id" | "name">;
}) | (FormFieldBase & {
    type: "textarea";
    textareaProps?: Omit<TextareaControlProps, "id" | "name">;
}) | (FormFieldBase & {
    type: "select";
    options: SelectOption[];
    selectProps?: Omit<SelectControlProps, "id" | "name" | "options">;
}) | (FormFieldBase & {
    type: "custom";
    render: (field: FormFieldBase & {
        id: string;
    }) => React.ReactNode;
});
export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "title"> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    fields?: FormFieldConfig[];
    actions?: React.ReactNode;
    columns?: 1 | 2;
    bodyClassName?: string;
    actionsClassName?: string;
}
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;
export {};
