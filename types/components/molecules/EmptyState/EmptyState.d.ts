import React from "react";
export interface EmptyStateAction {
    label: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "ghost";
}
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    glyph?: React.ReactNode;
    title?: React.ReactNode;
    body?: React.ReactNode;
    action?: EmptyStateAction;
    actions?: EmptyStateAction[];
    status?: boolean;
}
export declare const EmptyState: React.FC<EmptyStateProps>;
