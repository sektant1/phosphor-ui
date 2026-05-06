import React from "react";
export interface PostMetaProps {
    date?: string;
    readTime?: string;
    wordCount?: number;
    tags?: string[];
    updated?: string;
    className?: string;
}
export declare const PostMeta: React.FC<PostMetaProps>;
