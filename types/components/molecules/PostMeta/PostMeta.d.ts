import React from "react";
export interface PostMetaTag {
    label: React.ReactNode;
    href?: string;
}
export interface PostMetaProps extends React.HTMLAttributes<HTMLDivElement> {
    date?: string;
    dateTime?: string;
    readTime?: string;
    wordCount?: number;
    tags?: Array<string | PostMetaTag>;
    updated?: string;
}
export declare const PostMeta: React.FC<PostMetaProps>;
