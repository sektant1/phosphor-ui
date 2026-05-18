import React from "react";
import { cx } from "../../../utils/classNames";
import styles from "./CRT.module.scss";

export interface CRTOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  scanlines?: boolean;
  vignette?: boolean;
  glow?: boolean;
  noise?: boolean;
  flicker?: boolean;
}

export interface CRTScreenProps extends CRTOverlayProps {
  children: React.ReactNode;
  overlayClassName?: string;
}

export function CRTOverlay({
  scanlines = true,
  vignette = true,
  glow = true,
  noise = false,
  flicker = true,
  className,
  ...rest
}: CRTOverlayProps) {
  return (
    <div
      className={cx(
        styles.overlay,
        scanlines && styles.scanlines,
        vignette && styles.vignette,
        glow && styles.glow,
        noise && styles.noise,
        flicker && styles.flicker,
        className,
      )}
      aria-hidden="true"
      {...rest}
    />
  );
}

export const CRTScreen = React.forwardRef<HTMLDivElement, CRTScreenProps>(
  (
    {
      children,
      scanlines,
      vignette,
      glow,
      noise,
      flicker,
      className,
      overlayClassName,
      ...rest
    },
    ref,
  ) => (
    <div ref={ref} className={cx(styles.screen, className)} {...rest}>
      <CRTOverlay
        className={overlayClassName}
        scanlines={scanlines}
        vignette={vignette}
        glow={glow}
        noise={noise}
        flicker={flicker}
      />
      <div className={styles.content}>{children}</div>
    </div>
  ),
);

CRTScreen.displayName = "CRTScreen";
