import React from "react";
export interface CourseCardProps {
    stamp?: string;
    art?: string;
    coverMeta?: React.ReactNode;
    tag?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    stats?: React.ReactNode;
    progress?: {
        value: number;
        total?: number;
        cells?: number;
    };
    cta?: {
        label: string;
        href: string;
    };
    locked?: boolean;
    className?: string;
}
export declare const CourseCard: React.FC<CourseCardProps>;
