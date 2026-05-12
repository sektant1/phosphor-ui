import React from "react";
export interface BreadcrumbItem {
    label: React.ReactNode;
    href?: string;
    current?: boolean;
}
export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    ariaLabel?: string;
    className?: string;
}
export declare const Breadcrumbs: React.FC<BreadcrumbsProps>;
