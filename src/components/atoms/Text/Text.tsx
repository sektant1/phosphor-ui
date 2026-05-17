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
  tone?: "default" | "muted" | "accent" | "danger" | "success";
  as?: keyof JSX.IntrinsicElements;
  tone?: TextTone;
  align?: TextAlign;
  transform?: TextTransform;
  truncate?: boolean;
  balance?: boolean;
  nowrap?: boolean;
  animate?: boolean;
}

<<<<<<< HEAD
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
      animate = true,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
=======
const Text: React.FC<TextProps> = ({
  variant = "body",
  tone = "default",
  as,
  truncate,
  balance,
  className,
  style,
  children,
  ...rest
}) => {
>>>>>>> 261b67a (0.3.48)
  const Tag = (as ?? TYPOGRAPHY_DEFAULT_TAG_BY_VARIANT[variant]) as keyof JSX.IntrinsicElements;
  const toneClass =
    tone === "muted"
      ? "t-muted"
      : tone === "accent"
        ? "t-glow-pale"
        : tone === "danger"
          ? "t-faded"
          : undefined;
  const toneStyle =
    tone === "accent"
      ? { color: "var(--pho-color-accent)" }
      : tone === "danger"
        ? { color: "var(--pho-color-danger)" }
        : tone === "success"
          ? { color: "var(--pho-color-success)" }
          : undefined;
  const cls = cx(
    TYPOGRAPHY_CLASS_BY_VARIANT[variant],
<<<<<<< HEAD
    toneClass[tone],
    align && alignClass[align],
    transform && transformClass[transform],
=======
    toneClass,
>>>>>>> 261b67a (0.3.48)
    truncate && "t-truncate",
    balance && "t-balance",
    nowrap && "t-nowrap",
    !animate && "t-no-anim",
    className,
  );
<<<<<<< HEAD
    return React.createElement(Tag, { ref, className: cls, ...rest }, children);
  },
);

Text.displayName = "Text";
=======
  return React.createElement(
    Tag,
    { className: cls, style: { ...toneStyle, ...style }, ...rest },
    children,
  );
};
>>>>>>> 261b67a (0.3.48)

export default Text;
