import React from "react";
import {
  TYPOGRAPHY_CLASS_BY_VARIANT,
  TYPOGRAPHY_DEFAULT_TAG_BY_VARIANT,
} from "../../../foundations/typography/variants";
import type { TypographyVariant } from "../../../foundations/typography/variants";
import { cx } from "../../../utils/classNames";

export type TextVariant = TypographyVariant;
export type TextTone =
  | "default"
  | "primary"
  | "accent"
  | "danger"
  | "muted"
  | "dim"
  | "faded";
export type TextAlign = "start" | "center" | "end";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: keyof JSX.IntrinsicElements;
  tone?: TextTone;
  align?: TextAlign;
  transform?: TextTransform;
  truncate?: boolean;
  balance?: boolean;
  nowrap?: boolean;
}

const toneClass: Record<TextTone, string | undefined> = {
  default: undefined,
  primary: "t-tone-primary",
  accent: "t-tone-accent",
  danger: "t-tone-danger",
  muted: "t-muted",
  dim: "t-dim",
  faded: "t-faded",
};

const alignClass: Record<TextAlign, string> = {
  start: "t-align-start",
  center: "t-align-center",
  end: "t-align-end",
};

const transformClass: Record<TextTransform, string | undefined> = {
  none: undefined,
  uppercase: "t-uppercase",
  lowercase: "t-lowercase",
  capitalize: "t-capitalize",
};

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = "body",
      as,
      tone = "default",
      align,
      transform,
      truncate,
      balance,
      nowrap,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
  const Tag = (as ?? TYPOGRAPHY_DEFAULT_TAG_BY_VARIANT[variant]) as keyof JSX.IntrinsicElements;
  const cls = cx(
    TYPOGRAPHY_CLASS_BY_VARIANT[variant],
    toneClass[tone],
    align && alignClass[align],
    transform && transformClass[transform],
    truncate && "t-truncate",
    balance && "t-balance",
    nowrap && "t-nowrap",
    className,
  );
    return React.createElement(Tag, { ref, className: cls, ...rest }, children);
  },
);

Text.displayName = "Text";

export default Text;
