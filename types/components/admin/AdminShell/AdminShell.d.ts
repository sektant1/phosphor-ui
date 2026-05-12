import React from "react";
import { type NerdTreeNode } from "../../organisms/NerdTree";
export interface AdminNavItem {
    label: string;
    href: string;
    active?: boolean;
    glyph?: string;
}
export interface AdminUser {
    name: string;
    role?: string;
}
export interface AdminStat {
    label: string;
    value: React.ReactNode;
    tone?: "default" | "good" | "warn";
}
export interface AdminShellProps {
    nav?: AdminNavItem[];
    tree?: NerdTreeNode[];
    user?: AdminUser;
    onLogout?: () => void | Promise<void>;
    title?: string;
    heading?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    stats?: AdminStat[];
    treeTitle?: string;
    treeBufferLabel?: string;
    treeHint?: React.ReactNode;
    treeCommand?: string;
    treeFooterMeta?: string;
    children: React.ReactNode;
    className?: string;
}
export declare const AdminShell: React.FC<AdminShellProps>;
