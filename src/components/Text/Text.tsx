import React from "react";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "mono"
  | "terminal"
  | "stamp"
  | "prompt"
  | "glow"
  | "glow-pale"
  | "dim"
  | "faded";

const variantTag: Record<TextVariant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  mono: "span",
  terminal: "span",
  stamp: "span",
  prompt: "span",
  glow: "span",
  "glow-pale": "span",
  dim: "span",
  faded: "span",
};

export interface TextProps {
  variant?: TextVariant;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const Text: React.FC<TextProps> = ({
  variant = "body",
  as,
  className,
  children,
  ...rest
}) => {
  const Tag = (as ?? variantTag[variant]) as keyof JSX.IntrinsicElements;
  const cls = [`t-${variant}`, className].filter(Boolean).join(" ");
  return React.createElement(Tag, { className: cls, ...rest }, children);
};

export default Text;
