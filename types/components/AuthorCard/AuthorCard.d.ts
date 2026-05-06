import React from "react";
export interface AuthorLink {
    label: string;
    href: string;
}
export interface AuthorCardProps {
    name: string;
    role?: string;
    bio?: string;
    avatarSrc?: string;
    links?: AuthorLink[];
    className?: string;
}
export declare const AuthorCard: React.FC<AuthorCardProps>;
