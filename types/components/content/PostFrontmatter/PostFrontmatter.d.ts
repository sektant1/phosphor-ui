import React from "react";
export type FrontmatterScalar = string | number | boolean;
export type FrontmatterValue = FrontmatterScalar | null | undefined | ReadonlyArray<FrontmatterScalar>;
export type PostFrontmatterData = Record<string, FrontmatterValue>;
export interface PostFrontmatterProps extends React.HTMLAttributes<HTMLDivElement> {
    data: PostFrontmatterData;
    label?: React.ReactNode;
    marker?: string;
}
export declare const PostFrontmatter: React.FC<PostFrontmatterProps>;
