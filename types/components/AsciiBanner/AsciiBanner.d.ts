import React from "react";
export interface AsciiBannerProps {
    art: string;
    fallback?: string;
    href?: string;
    label?: string;
    className?: string;
}
export declare const AsciiBanner: React.FC<AsciiBannerProps>;
