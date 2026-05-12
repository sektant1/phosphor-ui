import React from "react";
export type AvatarSize = "sm" | "md" | "lg";
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    name?: string;
    alt?: string;
    size?: AvatarSize;
}
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
