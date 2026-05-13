import React from "react";
import styles from "./Layout.module.scss";
import { cx } from "../../../utils/classNames";
import type { CssVars } from "../../../utils/browser";

type LayoutElement = keyof JSX.IntrinsicElements;
type LayoutGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type LayoutSpace = LayoutGap | string | number;

const gapClass: Record<LayoutGap, string> = {
  none: styles.gapNone,
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
};

const gapVar: Record<LayoutGap, string> = {
  none: "0",
  xs: "var(--pho-space-2)",
  sm: "var(--pho-space-3)",
  md: "var(--pho-space-5)",
  lg: "var(--pho-space-6)",
  xl: "var(--pho-space-7)",
};

const toCssLength = (value: string | number) =>
  typeof value === "number" ? `${value}px` : value;

const toResponsiveMin = (value: string | number) =>
  `min(100%, ${toCssLength(value)})`;

const isLayoutGap = (value: unknown): value is LayoutGap =>
  typeof value === "string" && value in gapClass;

const applySpaceVar = (
  vars: CssVars,
  name: `--${string}`,
  value: LayoutSpace | undefined,
) => {
  if (value === undefined) return;
  vars[name] = isLayoutGap(value) ? gapVar[value] : toCssLength(value);
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
  gap?: LayoutSpace;
  rowGap?: LayoutSpace;
  columnGap?: LayoutSpace;
  inline?: boolean;
  mobileDirection?: React.CSSProperties["flexDirection"];
  mobileAlign?: React.CSSProperties["alignItems"];
  mobileJustify?: React.CSSProperties["justifyContent"];
  mobileWrap?: React.CSSProperties["flexWrap"];
  mobileGap?: LayoutSpace;
  mobileRowGap?: LayoutSpace;
  mobileColumnGap?: LayoutSpace;
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
  rowGap,
  columnGap,
  inline,
  mobileDirection,
  mobileAlign,
  mobileJustify,
  mobileWrap,
  mobileGap,
  mobileRowGap,
  mobileColumnGap,
  className,
  style,
  ...rest
}: FlexProps<T>) => {
  const Tag = (as ?? "div") as LayoutElement;
  const isTokenGap = isLayoutGap(gap);
  const vars: CssVars = {};
  if (direction) vars["--pho-flex-direction"] = direction;
  if (align) vars["--pho-align"] = align;
  if (justify) vars["--pho-justify"] = justify;
  if (wrap) vars["--pho-wrap"] = wrap;
  if (!isTokenGap) applySpaceVar(vars, "--pho-gap", gap);
  applySpaceVar(vars, "--pho-row-gap", rowGap);
  applySpaceVar(vars, "--pho-column-gap", columnGap);
  if (mobileDirection) vars["--pho-mobile-flex-direction"] = mobileDirection;
  if (mobileAlign) vars["--pho-mobile-align"] = mobileAlign;
  if (mobileJustify) vars["--pho-mobile-justify"] = mobileJustify;
  if (mobileWrap) vars["--pho-mobile-wrap"] = mobileWrap;
  applySpaceVar(vars, "--pho-mobile-gap", mobileGap);
  applySpaceVar(vars, "--pho-mobile-row-gap", mobileRowGap);
  applySpaceVar(vars, "--pho-mobile-column-gap", mobileColumnGap);

  return React.createElement(Tag, {
    className: cx(
      styles.flex,
      inline && styles.inline,
      isTokenGap && gapClass[gap],
      className,
    ),
    style: { ...vars, ...style },
    ...rest,
  });
};

export type RowProps<T extends LayoutElement = "div"> = Omit<
  FlexProps<T>,
  "direction"
>;

export const Row = <T extends LayoutElement = "div">(
  props: RowProps<T>,
) => <Flex direction="row" {...props} />;

export type ColumnProps<T extends LayoutElement = "div"> = Omit<
  FlexProps<T>,
  "direction"
>;

export const Column = <T extends LayoutElement = "div">(
  props: ColumnProps<T>,
) => <Flex direction="column" {...props} />;

export interface GridOwnProps {
  columns?: React.CSSProperties["gridTemplateColumns"];
  minItemWidth?: React.CSSProperties["minWidth"];
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  gap?: LayoutSpace;
  rowGap?: LayoutSpace;
  columnGap?: LayoutSpace;
  inline?: boolean;
  mobileColumns?: React.CSSProperties["gridTemplateColumns"];
  mobileMinItemWidth?: React.CSSProperties["minWidth"];
  mobileAlign?: React.CSSProperties["alignItems"];
  mobileJustify?: React.CSSProperties["justifyContent"];
  mobileGap?: LayoutSpace;
  mobileRowGap?: LayoutSpace;
  mobileColumnGap?: LayoutSpace;
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
  rowGap,
  columnGap,
  inline,
  mobileColumns,
  mobileMinItemWidth,
  mobileAlign,
  mobileJustify,
  mobileGap,
  mobileRowGap,
  mobileColumnGap,
  className,
  style,
  ...rest
}: GridProps<T>) => {
  const Tag = (as ?? "div") as LayoutElement;
  const isTokenGap = isLayoutGap(gap);
  const vars: CssVars = {};
  if (columns) vars["--pho-grid-columns"] = columns;
  if (minItemWidth) vars["--pho-grid-min"] = toResponsiveMin(minItemWidth);
  if (align) vars["--pho-align"] = align;
  if (justify) vars["--pho-justify"] = justify;
  if (!isTokenGap) applySpaceVar(vars, "--pho-gap", gap);
  applySpaceVar(vars, "--pho-row-gap", rowGap);
  applySpaceVar(vars, "--pho-column-gap", columnGap);
  if (mobileColumns) vars["--pho-mobile-grid-columns"] = mobileColumns;
  if (mobileMinItemWidth) {
    vars["--pho-mobile-grid-min"] = toResponsiveMin(mobileMinItemWidth);
  }
  if (mobileAlign) vars["--pho-mobile-align"] = mobileAlign;
  if (mobileJustify) vars["--pho-mobile-justify"] = mobileJustify;
  applySpaceVar(vars, "--pho-mobile-gap", mobileGap);
  applySpaceVar(vars, "--pho-mobile-row-gap", mobileRowGap);
  applySpaceVar(vars, "--pho-mobile-column-gap", mobileColumnGap);

  return React.createElement(Tag, {
    className: cx(
      styles.grid,
      inline && styles.inline,
      isTokenGap && gapClass[gap],
      className,
    ),
    style: { ...vars, ...style },
    ...rest,
  });
};

export type StackProps<T extends LayoutElement = "div"> = Omit<
  FlexProps<T>,
  "direction" | "mobileDirection"
>;

export const Stack = <T extends LayoutElement = "div">({
  className,
  style,
  ...rest
}: StackProps<T>) => {
  return (
    <Flex
      direction="column"
      className={cx(styles.stack, className)}
      style={style}
      {...rest}
    />
  );
};

export type ClusterProps<T extends LayoutElement = "div"> = Omit<
  FlexProps<T>,
  "wrap" | "mobileWrap"
>;

export const Cluster = <T extends LayoutElement = "div">(
  props: ClusterProps<T>,
) => <Flex wrap="wrap" align="center" {...props} />;

export interface ContainerOwnProps {
  width?: "content" | "prose" | "full" | string | number;
  padding?: LayoutSpace;
  mobilePadding?: LayoutSpace;
  center?: boolean;
}

export type ContainerProps<T extends LayoutElement = "div"> =
  PolymorphicProps<T> & ContainerOwnProps;

const ContainerBase = <T extends LayoutElement = "div">(
  {
    as,
    width = "content",
    padding = "md",
    mobilePadding = "sm",
    center = true,
    className,
    style,
    ...rest
  }: ContainerProps<T>,
  ref: React.ForwardedRef<Element>,
) => {
  const Tag = (as ?? "div") as LayoutElement;
  const vars: CssVars = {};
  vars["--pho-container-width"] =
    width === "content"
      ? "var(--pho-size-content)"
      : width === "prose"
        ? "var(--pho-size-prose)"
        : width === "full"
          ? "none"
          : toCssLength(width);
  applySpaceVar(vars, "--pho-container-padding", padding);
  applySpaceVar(vars, "--pho-mobile-container-padding", mobilePadding);

  return React.createElement(Tag, {
    className: cx(styles.container, center && styles.center, className),
    ref,
    style: { ...vars, ...style },
    ...rest,
  });
};

export const Container = React.forwardRef(ContainerBase) as <
  T extends LayoutElement = "div",
>(
  props: ContainerProps<T> & { ref?: React.Ref<Element> },
) => React.ReactElement | null;

export type { LayoutGap, LayoutSpace };
