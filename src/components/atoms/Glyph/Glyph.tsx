import React from "react";
import styles from "./Glyph.module.scss";
import { cx } from "../../../utils/classNames";
import {
  GLYPH_CHAR_BY_NAME,
  type GlyphName,
} from "../../../foundations/glyphs/catalog";

export type { GlyphName };

export type GlyphTone =
  | "primary"
  | "accent"
  | "danger"
  | "muted"
  | "inherit";

export interface GlyphProps extends React.HTMLAttributes<HTMLSpanElement> {
  char?: string;
  name?: GlyphName | string;
  size?: number | string;
  tone?: GlyphTone;
  boxed?: boolean;
  label?: string;
  decorative?: boolean;
}

export const Glyph: React.FC<GlyphProps> = ({
  char,
  name,
  size,
  tone = "primary",
  boxed,
  label,
  decorative = true,
  className,
  style,
  ...rest
}) => {
  const resolvedChar = char ?? (name ? GLYPH_CHAR_BY_NAME[name] : undefined);

  return (
    <span
      className={cx(
        styles.inline,
        styles[`tone-${tone}`],
        boxed && styles.boxed,
        className,
      )}
      style={{ fontSize: size, ...style }}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={!decorative ? label ?? name : undefined}
      title={!decorative ? label ?? name : undefined}
      {...rest}
    >
      {resolvedChar ?? name ?? ""}
    </span>
  );
};
