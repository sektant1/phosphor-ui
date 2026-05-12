import React from "react";
import type { MDXComponents as ProviderComponents } from "mdx/types.js";
import type { PostFrontmatterData } from "../../content/PostFrontmatter";
export declare const mdxComponents: ProviderComponents;
export type MdxComponents = typeof mdxComponents;
export interface PostBodyProps {
    children: React.ReactNode;
    className?: string;
    rootClassName?: string;
    components?: ProviderComponents;
    frontmatter?: PostFrontmatterData;
    frontmatterLabel?: React.ReactNode;
    before?: React.ReactNode;
    after?: React.ReactNode;
}
export declare const PostBody: React.FC<PostBodyProps>;
