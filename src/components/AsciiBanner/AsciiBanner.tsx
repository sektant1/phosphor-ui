import React, { useEffect, useRef, useState } from "react";
import styles from "./AsciiBanner.module.scss";
import { cx } from "../../utils/classNames";
import type { CssVars } from "../../utils/browser";

type AsciiBannerStyle = React.CSSProperties &
  Record<`--${string}`, string | number | undefined>;

type AsciiBannerBaseProps = {
  art: string;
  fallback?: string;
  label?: string;
  className?: string;
  style?: AsciiBannerStyle;
};

type AsciiBannerDivProps = AsciiBannerBaseProps &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "children" | "className" | "style"
  > & {
    href?: never;
  };

type AsciiBannerAnchorProps = AsciiBannerBaseProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "style" | "href"
  > & {
    href: string;
  };

export type AsciiBannerProps = AsciiBannerDivProps | AsciiBannerAnchorProps;

const isAnchorBanner = (
  props: AsciiBannerProps,
): props is AsciiBannerAnchorProps => typeof props.href === "string";
export const AsciiBanner: React.FC<AsciiBannerProps> = (props) => {
  const { art, fallback } = props;

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
        Math.abs(prev.scale - scale) < 0.001 &&
        Math.abs(prev.height - height) < 0.5
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

      {fallback ? <span className={styles.fallback}>{fallback}</span> : null}
    </>
  );

  if (isAnchorBanner(props)) {
    const {
      art: _art,
      fallback: _fallback,
      href,
      label,
      className,
      style,
      ...anchorProps
    } = props;

    return (
      <a
        href={href}
        className={cx(styles.link, className)}
        style={style}
        aria-label={label}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const {
    art: _art,
    fallback: _fallback,
    label,
    className,
    style,
    ...divProps
  } = props;

  return (
    <div
      className={cx(styles.link, className)}
      style={style}
      aria-label={label}
      {...divProps}
    >
      {content}
    </div>
  );
};
