import React, { useEffect, useRef, useState } from "react";
import styles from "./AsciiBanner.module.scss";
import { cx } from "../../utils/classNames";
import type { CssVars } from "../../utils/browser";

export interface AsciiBannerProps {
  art: string;
  fallback?: string;
  href?: string;
  label?: string;
  className?: string;
}

export const AsciiBanner: React.FC<AsciiBannerProps> = ({
  art,
  fallback,
  href,
  label,
  className,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLPreElement>(null);
  const [fit, setFit] = useState({ scale: 1, height: 0 });

  useEffect(() => {
    const frame = frameRef.current;
    const banner = bannerRef.current;
    if (!frame || !banner) return undefined;

    const updateFit = () => {
      const available = frame.clientWidth;
      const naturalWidth = banner.scrollWidth;
      const naturalHeight = banner.scrollHeight;
      if (!available || !naturalWidth || !naturalHeight) return;

      const scale = Math.min(1, available / naturalWidth);
      const height = naturalHeight * scale;
      setFit((prev) =>
        Math.abs(prev.scale - scale) < 0.001 && Math.abs(prev.height - height) < 0.5
          ? prev
          : { scale, height },
      );
    };

    updateFit();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(updateFit);
      ro.observe(frame);
      ro.observe(banner);
      return () => ro.disconnect();
    }

    window.addEventListener("resize", updateFit);
    return () => window.removeEventListener("resize", updateFit);
  }, [art]);

  const content = (
    <>
      <div
        ref={frameRef}
        className={styles.bannerFrame}
        style={
          {
            "--ascii-scale": fit.scale,
            "--ascii-height": fit.height ? `${fit.height}px` : undefined,
          } as CssVars
        }
      >
        <pre
          ref={bannerRef}
          className={styles.banner}
          aria-hidden={fallback ? "true" : undefined}
        >
          {art}
        </pre>
      </div>
      {fallback && <span className={styles.fallback}>{fallback}</span>}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className={cx(styles.link, className)}
        aria-label={label}
      >
        {content}
      </a>
    );
  }
  return <div className={cx(styles.link, className)}>{content}</div>;
};
