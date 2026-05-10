import React from "react";
import styles from "./Glyph.module.scss";
import { cx } from "../../../utils/classNames";

export interface GlyphProps extends React.HTMLAttributes<HTMLSpanElement> {
  char: string;
  size?: number | string;
}

export const Glyph: React.FC<GlyphProps> = ({
  char,
  size,
  className,
  style,
  ...rest
}) => (
  <span
    className={cx(styles.inline, className)}
    style={{ fontSize: size, ...style }}
    {...rest}
  >
    {char}
  </span>
);
