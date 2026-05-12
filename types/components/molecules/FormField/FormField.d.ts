import React from "react";
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    label: React.ReactNode;
    hint?: React.ReactNode;
    error?: React.ReactNode;
    required?: boolean;
    htmlFor?: string;
    children: React.ReactNode;
}
export declare const FormField: React.FC<FormFieldProps>;
export type ContentStatus = "draft" | "published" | "archived";
export interface ContentStatusBadgeProps {
    status: ContentStatus;
    className?: string;
    label?: React.ReactNode;
}
export declare const ContentStatusBadge: React.FC<ContentStatusBadgeProps>;
