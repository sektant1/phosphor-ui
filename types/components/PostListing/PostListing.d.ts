import React from "react";
export interface PostRowProps {
    date: string;
    title: string;
    meta?: string;
    href: string;
    glyph?: string;
    thumb?: React.ReactNode;
    thumbSrc?: string;
    thumbAlt?: string;
    index?: number;
}
export interface PostListingProps {
    children: React.ReactNode;
    className?: string;
    headerLabels?: {
        glyph?: string;
        date?: string;
        post?: string;
        length?: string;
        thumb?: string;
    };
}
export declare const PostListing: React.FC<PostListingProps>;
export declare const PostRow: React.FC<PostRowProps>;
