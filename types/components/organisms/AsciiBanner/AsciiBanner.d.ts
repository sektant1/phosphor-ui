import React from "react";
import { type BannerFontName } from "../../../ascii";
type AsciiBannerStyle = React.CSSProperties & Record<`--${string}`, string | number | undefined>;
type AsciiBannerBaseProps = {
    art?: string;
    text?: string;
    font?: BannerFontName;
    fallback?: string;
    label?: string;
    className?: string;
    style?: AsciiBannerStyle;
};
type AsciiBannerDivProps = AsciiBannerBaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className" | "style"> & {
    href?: never;
};
type AsciiBannerAnchorProps = AsciiBannerBaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "style" | "href"> & {
    href: string;
};
export type AsciiBannerProps = AsciiBannerDivProps | AsciiBannerAnchorProps;
export declare const AsciiBanner: React.FC<AsciiBannerProps>;
export {};
