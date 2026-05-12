import React from "react";
export interface FooterLink {
    label: React.ReactNode;
    href: string;
    external?: boolean;
}
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    brand?: React.ReactNode;
    year?: React.ReactNode;
    links?: FooterLink[];
    status?: {
        label: React.ReactNode;
        value: React.ReactNode;
    };
    prompt?: string;
    command?: string;
    meta?: React.ReactNode;
}
export declare const Footer: React.FC<FooterProps>;
