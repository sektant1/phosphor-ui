import React from "react";
declare type AnyProps = React.HTMLAttributes<HTMLElement> & {
    [key: string]: unknown;
};
export declare const mdxComponents: {
    h1: React.FC<AnyProps>;
    h2: React.FC<AnyProps>;
    h3: React.FC<AnyProps>;
    h4: React.FC<AnyProps>;
    h5: React.FC<AnyProps>;
    h6: React.FC<AnyProps>;
    p: React.FC<AnyProps>;
    ul: React.FC<AnyProps>;
    ol: React.FC<AnyProps>;
    li: React.FC<AnyProps>;
    pre: React.FC<AnyProps>;
    code: React.FC<AnyProps>;
    table: React.FC<AnyProps>;
    thead: React.FC<AnyProps>;
    tbody: React.FC<AnyProps>;
    tr: React.FC<AnyProps>;
    th: React.FC<AnyProps>;
    td: React.FC<AnyProps>;
    hr: React.FC<AnyProps>;
    blockquote: React.FC<AnyProps>;
    img: React.FC<React.ImgHTMLAttributes<HTMLImageElement>>;
    a: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    Exercise: React.FC<import("../Exercise").ExerciseProps>;
};
export declare type MdxComponents = typeof mdxComponents;
export interface PostBodyProps {
    children: React.ReactNode;
    className?: string;
}
export declare const PostBody: React.FC<PostBodyProps>;
export {};
