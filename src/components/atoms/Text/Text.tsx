import React from "react";
import { cx } from "../../../utils/classNames";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "lead"
  | "body"
  | "small"
  | "caption"
  | "mono"
  | "code"
  | "terminal"
  | "stamp"
  | "prompt"
  | "glow"
  | "glow-pale"
  | "muted"
  | "dim"
  | "faded";

const variantTag: Record<TextVariant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  body: "p",
  small: "small",
  caption: "span",
  mono: "span",
  code: "code",
  terminal: "span",
  stamp: "span",
  prompt: "span",
  glow: "span",
  "glow-pale": "span",
  muted: "span",
  dim: "span",
  faded: "span",
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: keyof JSX.IntrinsicElements;
  truncate?: boolean;
  balance?: boolean;
}

const Text: React.FC<TextProps> = ({
  variant = "body",
  as,
  truncate,
  balance,
  className,
  children,
  ...rest
}) => {
  const Tag = (as ?? variantTag[variant]) as keyof JSX.IntrinsicElements;
  const cls = cx(
    `t-${variant}`,
    truncate && "t-truncate",
    balance && "t-balance",
    className,
  );
  return React.createElement(Tag, { className: cls, ...rest }, children);
};

export default Text;
