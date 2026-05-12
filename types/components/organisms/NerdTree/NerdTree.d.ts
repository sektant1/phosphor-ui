import React from "react";
export interface NerdTreeLeaf {
    kind: "leaf";
    id?: string;
    label: string;
    href?: string;
    active?: boolean;
}
export interface NerdTreeDir {
    kind: "dir";
    id?: string;
    label: string;
    children?: NerdTreeNode[];
    defaultOpen?: boolean;
}
export type NerdTreeNode = NerdTreeLeaf | NerdTreeDir;
export interface NerdTreeProps extends React.HTMLAttributes<HTMLElement> {
    tree: NerdTreeNode[];
    density?: "default" | "compact";
    frame?: "rail" | "panel";
    bufferLabel?: string;
    title?: string;
    hint?: React.ReactNode;
    command?: string;
    footerMeta?: string;
    ariaLabel?: string;
    mobileToggleLabel?: string;
}
export declare const NerdTree: React.FC<NerdTreeProps>;
