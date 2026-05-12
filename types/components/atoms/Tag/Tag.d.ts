import React from "react";
export type TagColor = "phosphor" | "magenta" | "dim";
type TagBaseProps = {
    color?: TagColor;
    count?: number;
    hover?: boolean;
    removable?: boolean;
    onRemove?: () => void;
};
type TagSpanProps = TagBaseProps & React.HTMLAttributes<HTMLSpanElement> & {
    href?: never;
};
type TagAnchorProps = TagBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};
export type TagProps = TagSpanProps | TagAnchorProps;
export declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLAnchorElement | HTMLSpanElement>>;
export {};
