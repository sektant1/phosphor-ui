import React from "react";
export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "quiet" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
type ButtonBaseProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    pressed?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    className?: string;
    children?: React.ReactNode;
};
type ButtonElementProps = ButtonBaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps | "href"> & {
    href?: never;
};
type AnchorElementProps = ButtonBaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps | "type"> & {
    href: string;
    disabled?: boolean;
    type?: never;
};
export type ButtonProps = ButtonElementProps | AnchorElementProps;
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
export {};
