import React from "react";
import styles from "./Glyphs.module.scss";
import { cx } from "../../../utils/classNames";
import { DEFAULT_GLYPHS, type GlyphItem } from "../../../foundations/glyphs";
export { DEFAULT_GLYPHS };
export type { GlyphItem };

export interface GlyphsProps {
  items?: readonly GlyphItem[];
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
