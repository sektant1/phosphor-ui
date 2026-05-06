import React from "react";
export interface NerdTreeLeaf {
    kind: "leaf";
    label: string;
    href?: string;
    active?: boolean;
}
export interface NerdTreeDir {
    kind: "dir";
    label: string;
    children?: NerdTreeNode[];
    defaultOpen?: boolean;
}
export declare type NerdTreeNode = NerdTreeLeaf | NerdTreeDir;
export interface NerdTreeProps {
    tree: NerdTreeNode[];
    bufferLabel?: string;
    title?: string;
    hint?: React.ReactNode;
    command?: string;
    footerMeta?: string;
    className?: string;
}
export declare const NerdTree: React.FC<NerdTreeProps>;
