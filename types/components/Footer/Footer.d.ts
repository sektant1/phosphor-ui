import React from "react";
export interface FooterLink {
    label: React.ReactNode;
    href: string;
}
export interface FooterProps {
    brand?: React.ReactNode;
    year?: React.ReactNode;
    links?: FooterLink[];
    status?: {
        label: React.ReactNode;
        value: React.ReactNode;
    };
    prompt?: string;
    command?: string;
    className?: string;
}
export declare const Footer: React.FC<FooterProps>;
