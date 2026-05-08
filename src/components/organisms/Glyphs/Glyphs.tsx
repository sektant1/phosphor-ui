import React from "react";
import styles from "./Glyphs.module.scss";
import { cx } from "../../../utils/classNames";

export interface GlyphItem {
  char: string;
  name?: string;
}

export const DEFAULT_GLYPHS: GlyphItem[] = [
  { char: "▌", name: "rail" },
  { char: "▐", name: "rail-r" },
  { char: "█", name: "block" },
  { char: "▓", name: "shade-d" },
  { char: "▒", name: "shade-m" },
  { char: "░", name: "shade-l" },
  { char: "▸", name: "tri-r" },
  { char: "▾", name: "tri-d" },
  { char: "▴", name: "tri-u" },
  { char: "◂", name: "tri-l" },
  { char: "◆", name: "diamond" },
  { char: "◇", name: "diamond-o" },
  { char: "◈", name: "diamond-i" },
  { char: "●", name: "dot" },
  { char: "○", name: "dot-o" },
  { char: "·", name: "mid" },
  { char: "•", name: "bullet" },
  { char: "▶", name: "play" },
  { char: "■", name: "sq" },
  { char: "□", name: "sq-o" },
  { char: "☢", name: "rad" },
  { char: "☣", name: "bio" },
  { char: "✶", name: "star" },
  { char: "✷", name: "star-8" },
  { char: "✦", name: "spark" },
  { char: "↳", name: "ret" },
  { char: "└", name: "br-bl" },
  { char: "├", name: "br-l" },
  { char: "─", name: "h-line" },
  { char: "│", name: "v-line" },
  { char: "╱", name: "slash" },
  { char: "╲", name: "bslash" },
];

export interface GlyphsProps {
  items?: GlyphItem[];
  showLabels?: boolean;
  onSelect?: (item: GlyphItem) => void;
  className?: string;
}

export const Glyphs: React.FC<GlyphsProps> = ({
  items = DEFAULT_GLYPHS,
  showLabels = true,
  onSelect,
  className,
}) => {
  const interactive = !!onSelect;
  return (
    <div className={cx(styles.grid, className)}>
      {items.map((it, i) => {
        const tileCls = cx(styles.tile, interactive && styles.interactive);
        const content = (
          <>
            <span className={styles.glyph}>{it.char}</span>
            {showLabels && it.name && <span className={styles.label}>{it.name}</span>}
          </>
        );

        if (interactive) {
          return (
            <button
              key={`${it.char}-${i}`}
              className={tileCls}
              type="button"
              onClick={() => onSelect(it)}
            >
              {content}
            </button>
          );
        }

        return (
          <div key={`${it.char}-${i}`} className={tileCls}>
            {content}
          </div>
        );
      })}
    </div>
  );
};

export interface GlyphProps extends React.HTMLAttributes<HTMLSpanElement> {
  char: string;
  size?: number | string;
}

export const Glyph: React.FC<GlyphProps> = ({ char, size, className, style, ...rest }) => (
  <span
    className={cx(styles.inline, className)}
    style={{ fontSize: size, ...style }}
    {...rest}
  >
    {char}
  </span>
);
