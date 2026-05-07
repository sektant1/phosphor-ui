import React from "react";

export type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

const levelTag: Record<HeadingLevel, keyof JSX.IntrinsicElements> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  as,
  className,
  children,
  ...rest
}) => {
  const Tag = (as ?? levelTag[level]) as keyof JSX.IntrinsicElements;
  const cls = [`t-h${level}`, className].filter(Boolean).join(" ");
  return React.createElement(Tag, { className: cls, ...rest }, children);
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
