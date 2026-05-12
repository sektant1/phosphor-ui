import React from "react";
export interface ShareLink {
    label: string;
    href: string;
}
export interface ShareBarProps {
    url?: string;
    links?: ShareLink[];
    label?: string;
    className?: string;
}
export declare const ShareBar: React.FC<ShareBarProps>;
