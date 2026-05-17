import React from "react";
import styles from "./HeroFrame.module.scss";
import { cx } from "../../../utils/classNames";
import { bannerSync, type BannerFontName } from "../../../ascii";

export interface HeroFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  art?: string;
  text?: string;
  font?: BannerFontName;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  scanline?: boolean;
  align?: "center" | "start";
}

export const HeroFrame: React.FC<HeroFrameProps> = ({
  art,
  text,
  font = "Slant",
  subtitle,
  actions,
  scanline = true,
  align = "center",
  className,
  ...rest
}) => {
  const rendered = art ?? (text ? bannerSync(text, font) : "");

  return (
    <div
      className={cx(
        styles.frame,
        align === "start" && styles.alignStart,
        className,
      )}
      {...rest}
    >
      <pre className={styles.art} aria-label={text} role={text ? "img" : undefined}>
        {rendered}
      </pre>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
      {scanline && <span className={styles.scanline} aria-hidden="true" />}
    </div>
  );
};
