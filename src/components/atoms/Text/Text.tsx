import React from "react";
import {
  TYPOGRAPHY_CLASS_BY_VARIANT,
  TYPOGRAPHY_DEFAULT_TAG_BY_VARIANT,
} from "../../../foundations/typography/variants";
import type { TypographyVariant } from "../../../foundations/typography/variants";
import { cx } from "../../../utils/classNames";

export type TextVariant = TypographyVariant;

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
  const Tag = (as ?? TYPOGRAPHY_DEFAULT_TAG_BY_VARIANT[variant]) as keyof JSX.IntrinsicElements;
  const cls = cx(
    TYPOGRAPHY_CLASS_BY_VARIANT[variant],
    truncate && "t-truncate",
    balance && "t-balance",
    className,
  );
  return React.createElement(Tag, { className: cls, ...rest }, children);
};

export default Text;
