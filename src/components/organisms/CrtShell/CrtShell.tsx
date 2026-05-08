import React from "react";
import styles from "./CrtShell.module.scss";

export interface CrtShellProps {
  children: React.ReactNode;
  disableTick?: boolean;
  disableNoise?: boolean;
  disableScanlines?: boolean;
  disableVignette?: boolean;
  disableFrame?: boolean;
  className?: string;
}

export const CrtShell: React.FC<CrtShellProps> = ({
  children,
  disableTick,
  disableNoise,
  disableScanlines,
  disableVignette,
  disableFrame,
  className,
}) => (
  <div className={[styles.shell, className ?? ""].join(" ")}>
    {!disableNoise && <div className={styles.noise} aria-hidden="true" />}
    {!disableScanlines && <div className={styles.scanlines} aria-hidden="true" />}
    {!disableVignette && <div className={styles.vignette} aria-hidden="true" />}
    {!disableFrame && <div className={styles.frame} aria-hidden="true" />}
    {!disableTick && <div className={styles.tick} aria-hidden="true" />}
    {children}
  </div>
);
