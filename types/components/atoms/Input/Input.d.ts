import React from "react";
import type { DataAttributes } from "../primitive";
type FieldState = "default" | "error" | "success";
export type InputVariant = "default" | "terminal";
export type InputSize = "sm" | "md" | "lg";
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: React.ReactNode;
    helpText?: React.ReactNode;
    error?: React.ReactNode;
    prompt?: string;
    command?: React.ReactNode;
    cursor?: boolean;
    size?: InputSize;
    variant?: InputVariant;
    state?: FieldState;
    inputClassName?: string;
    rootProps?: React.HTMLAttributes<HTMLLabelElement> & DataAttributes;
    onValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface InputControlProps extends Omit<InputProps, "label" | "helpText" | "error" | "rootProps" | "state"> {
}
export declare const InputControl: React.ForwardRefExoticComponent<InputControlProps & React.RefAttributes<HTMLInputElement>>;
export declare const InputField: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: React.ReactNode;
    helpText?: React.ReactNode;
    error?: React.ReactNode;
    cursor?: boolean;
    size?: InputSize;
    state?: FieldState;
    textareaClassName?: string;
    rootProps?: React.HTMLAttributes<HTMLLabelElement> & DataAttributes;
    onValueChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export interface TextareaControlProps extends Omit<TextareaProps, "label" | "helpText" | "error" | "rootProps" | "state"> {
}
export declare const TextareaControl: React.ForwardRefExoticComponent<TextareaControlProps & React.RefAttributes<HTMLTextAreaElement>>;
export declare const TextareaField: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export {};
