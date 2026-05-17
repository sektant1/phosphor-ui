import React from "react";
export interface PostRowProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
    date?: React.ReactNode;
    dateTime?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    showDescription?: boolean;
    meta?: React.ReactNode;
    href: string;
    glyph?: React.ReactNode;
    thumb?: React.ReactNode;
    thumbSrc?: string;
    thumbAlt?: string;
    index?: number;
}
export interface PostListingProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    posts?: PostRowProps[];
    headerLabels?: {
        glyph?: string;
        date?: string;
        post?: string;
        length?: string;
        thumb?: string;
    };
    showDescription?: boolean;
    emptyMessage?: React.ReactNode;
    emptyState?: React.ReactNode;
    getPostKey?: (post: PostRowProps, index: number) => React.Key;
    renderPost?: (post: PostRowProps, index: number) => React.ReactNode;
}
export declare const PostListing: React.FC<PostListingProps>;
export declare const PostRow: React.FC<PostRowProps>;
