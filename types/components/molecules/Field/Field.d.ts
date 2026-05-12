import React from "react";
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode;
    hint?: React.ReactNode;
    error?: React.ReactNode;
    required?: boolean;
    htmlFor?: string;
    children: React.ReactNode;
    controlClassName?: string;
}
export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}
export declare const FieldLabel: React.FC<FieldLabelProps>;
export interface FieldHintProps extends React.HTMLAttributes<HTMLSpanElement> {
}
export declare const FieldHint: React.FC<FieldHintProps>;
export interface FieldErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
}
export declare const FieldError: React.FC<FieldErrorProps>;
export interface ControlFrameProps extends React.HTMLAttributes<HTMLDivElement> {
    invalid?: boolean;
}
export declare const ControlFrame: React.FC<ControlFrameProps>;
export declare const Field: React.FC<FieldProps>;
