import React from "react";
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingGlyphPosition = "start" | "end";
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
    as?: keyof JSX.IntrinsicElements;
    glyph?: React.ReactNode;
    glyphPosition?: HeadingGlyphPosition;
    children?: React.ReactNode;
}
export declare const Heading: React.FC<HeadingProps>;
export declare const H1: React.FC<Omit<HeadingProps, "level">>;
export declare const H2: React.FC<Omit<HeadingProps, "level">>;
export declare const H3: React.FC<Omit<HeadingProps, "level">>;
export declare const H4: React.FC<Omit<HeadingProps, "level">>;
export declare const H5: React.FC<Omit<HeadingProps, "level">>;
export declare const H6: React.FC<Omit<HeadingProps, "level">>;
