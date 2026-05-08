import React from "react";
import styles from "./Layout.module.scss";
import { cx } from "../../../utils/classNames";
import type { CssVars } from "../../../utils/browser";

type LayoutElement = keyof JSX.IntrinsicElements;
type LayoutGap = "xs" | "sm" | "md" | "lg" | "xl";

const gapClass: Record<LayoutGap, string> = {
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
};

type PolymorphicProps<T extends LayoutElement> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "as"
> & {
  as?: T;
};

export interface FlexOwnProps {
  direction?: React.CSSProperties["flexDirection"];
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: React.CSSProperties["flexWrap"];
  gap?: LayoutGap | string | number;
  mobileDirection?: React.CSSProperties["flexDirection"];
  mobileAlign?: React.CSSProperties["alignItems"];
  mobileJustify?: React.CSSProperties["justifyContent"];
  mobileWrap?: React.CSSProperties["flexWrap"];
  mobileGap?: LayoutGap | string | number;
}

export type FlexProps<T extends LayoutElement = "div"> = PolymorphicProps<T> &
  FlexOwnProps;

export const Flex = <T extends LayoutElement = "div">({
  as,
  direction,
  align,
  justify,
  wrap,
  gap = "md",
  mobileDirection,
  mobileAlign,
  mobileJustify,
  mobileWrap,
  mobileGap,
  className,
  style,
  ...rest
}: FlexProps<T>) => {
  const Tag = (as ?? "div") as LayoutElement;
  const isTokenGap = typeof gap === "string" && gap in gapClass;
  const isTokenMobileGap = typeof mobileGap === "string" && mobileGap in gapClass;
  const vars: CssVars = {};
  if (direction) vars["--pho-flex-direction"] = direction;
  if (align) vars["--pho-align"] = align;
  if (justify) vars["--pho-justify"] = justify;
  if (wrap) vars["--pho-wrap"] = wrap;
  if (!isTokenGap) vars["--pho-gap"] = gap;
  if (mobileDirection) vars["--pho-mobile-flex-direction"] = mobileDirection;
  if (mobileAlign) vars["--pho-mobile-align"] = mobileAlign;
  if (mobileJustify) vars["--pho-mobile-justify"] = mobileJustify;
  if (mobileWrap) vars["--pho-mobile-wrap"] = mobileWrap;
  if (mobileGap !== undefined && !isTokenMobileGap) vars["--pho-mobile-gap"] = mobileGap;
  if (isTokenMobileGap) vars["--pho-mobile-gap"] = `var(--space-${mobileGap === "xs" ? 2 : mobileGap === "sm" ? 3 : mobileGap === "md" ? 5 : mobileGap === "lg" ? 6 : 7})`;

  return React.createElement(Tag, {
    className: cx(styles.flex, isTokenGap && gapClass[gap as LayoutGap], className),
    style: { ...vars, ...style },
    ...rest,
  });
};

export interface GridOwnProps {
  columns?: React.CSSProperties["gridTemplateColumns"];
  minItemWidth?: React.CSSProperties["minWidth"];
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  gap?: LayoutGap | string | number;
  mobileColumns?: React.CSSProperties["gridTemplateColumns"];
  mobileMinItemWidth?: React.CSSProperties["minWidth"];
  mobileAlign?: React.CSSProperties["alignItems"];
  mobileJustify?: React.CSSProperties["justifyContent"];
  mobileGap?: LayoutGap | string | number;
}

export type GridProps<T extends LayoutElement = "div"> = PolymorphicProps<T> &
  GridOwnProps;

export const Grid = <T extends LayoutElement = "div">({
  as,
  columns,
  minItemWidth,
  align,
  justify,
  gap = "md",
  mobileColumns,
  mobileMinItemWidth,
  mobileAlign,
  mobileJustify,
  mobileGap,
  className,
  style,
  ...rest
}: GridProps<T>) => {
  const Tag = (as ?? "div") as LayoutElement;
  const isTokenGap = typeof gap === "string" && gap in gapClass;
  const isTokenMobileGap = typeof mobileGap === "string" && mobileGap in gapClass;
  const vars: CssVars = {};
  if (columns) vars["--pho-grid-columns"] = columns;
  if (minItemWidth) vars["--pho-grid-min"] = minItemWidth;
  if (align) vars["--pho-align"] = align;
  if (justify) vars["--pho-justify"] = justify;
  if (!isTokenGap) vars["--pho-gap"] = gap;
  if (mobileColumns) vars["--pho-mobile-grid-columns"] = mobileColumns;
  if (mobileMinItemWidth) vars["--pho-mobile-grid-min"] = mobileMinItemWidth;
  if (mobileAlign) vars["--pho-mobile-align"] = mobileAlign;
  if (mobileJustify) vars["--pho-mobile-justify"] = mobileJustify;
  if (mobileGap !== undefined && !isTokenMobileGap) vars["--pho-mobile-gap"] = mobileGap;
  if (isTokenMobileGap) vars["--pho-mobile-gap"] = `var(--space-${mobileGap === "xs" ? 2 : mobileGap === "sm" ? 3 : mobileGap === "md" ? 5 : mobileGap === "lg" ? 6 : 7})`;

  return React.createElement(Tag, {
    className: cx(styles.grid, isTokenGap && gapClass[gap as LayoutGap], className),
    style: { ...vars, ...style },
    ...rest,
  });
};
