import React from "react";
export interface CourseCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    stamp?: string;
    thumb?: React.ReactNode;
    thumbSrc?: string;
    thumbAlt?: string;
    showCover?: boolean;
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
}
export declare const CourseCard: React.FC<CourseCardProps>;
