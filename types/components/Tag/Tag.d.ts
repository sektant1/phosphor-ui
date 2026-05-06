import React from "react";
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    color?: "phosphor" | "magenta";
    count?: number;
    href?: string;
    hover?: boolean;
}
export declare const Tag: React.FC<TagProps>;
