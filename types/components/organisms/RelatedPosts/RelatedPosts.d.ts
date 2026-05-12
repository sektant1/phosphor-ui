import React from "react";
export interface RelatedPost {
    id?: string;
    href: string;
    title: React.ReactNode;
    date?: React.ReactNode;
    tags?: string[];
}
export interface RelatedPostsProps extends React.HTMLAttributes<HTMLElement> {
    posts: RelatedPost[];
    label?: React.ReactNode;
    emptyMessage?: React.ReactNode;
    emptyState?: React.ReactNode;
}
export declare const RelatedPosts: React.FC<RelatedPostsProps>;
