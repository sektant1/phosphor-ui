import React from "react";
export interface AuthorLink {
    label: string;
    href: string;
}
export interface AuthorCardProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    role?: string;
    bio?: React.ReactNode;
    avatarSrc?: string;
    links?: AuthorLink[];
}
export declare const AuthorCard: React.FC<AuthorCardProps>;
