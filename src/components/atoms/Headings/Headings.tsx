import React from "react";
import { cx } from "../../../utils/classNames";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingGlyphPosition = "start" | "end";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: keyof JSX.IntrinsicElements;
  glyph?: React.ReactNode;
  glyphPosition?: HeadingGlyphPosition;
  children?: React.ReactNode;
}

const levelTag: Record<HeadingLevel, keyof JSX.IntrinsicElements> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  as,
  className,
  glyph,
  glyphPosition = "start",
  children,
  ...rest
}) => {
  const Tag = (as ?? levelTag[level]) as keyof JSX.IntrinsicElements;
  const typeClass = level <= 4 ? `t-h${level}` : "t-h4";
  const hasGlyph = glyph !== undefined && glyph !== null && glyph !== false;
  const cls = cx(typeClass, hasGlyph && "pho-heading", className);
  const glyphNode = hasGlyph ? (
    <span className="pho-heading__glyph" aria-hidden="true">
      {glyph}
    </span>
  ) : null;

  return React.createElement(
    Tag,
    { className: cls, ...rest },
    <>
      {glyphPosition === "start" ? glyphNode : null}
      <span className="pho-heading__text">{children}</span>
      {glyphPosition === "end" ? glyphNode : null}
    </>,
  );
};

const make = (level: HeadingLevel): React.FC<Omit<HeadingProps, "level">> => {
  const C: React.FC<Omit<HeadingProps, "level">> = (props) => <Heading level={level} {...props} />;
  C.displayName = `H${level}`;
  return C;
};

export const H1 = make(1);
export const H2 = make(2);
export const H3 = make(3);
export const H4 = make(4);
export const H5 = make(5);
export const H6 = make(6);
