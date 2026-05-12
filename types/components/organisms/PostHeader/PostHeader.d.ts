import React from "react";
import type { PostMetaProps } from "../../molecules/PostMeta";
type PostHeaderMetaProps = Omit<PostMetaProps, "className" | "tags"> & {
    tags?: string[];
};
export interface PostHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    title: React.ReactNode;
    eyebrow?: React.ReactNode;
    subtitle?: React.ReactNode;
    date?: string;
    readTime?: string;
    wordCount?: number;
    updated?: string;
    tags?: string[];
    meta?: PostHeaderMetaProps;
    actions?: React.ReactNode;
}
export declare const PostHeader: React.FC<PostHeaderProps>;
export {};
