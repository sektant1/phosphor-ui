import React, { useEffect, useRef, useState } from "react";
import styles from "./AsciiBanner.module.scss";
import { cx } from "../../../utils/classNames";
import type { CssVars } from "../../../utils/browser";
import { bannerSync, type BannerFontName } from "../../../ascii";

type AsciiBannerStyle = React.CSSProperties &
  Record<`--${string}`, string | number | undefined>;

type AsciiBannerBaseProps = {
  art?: string;
  text?: string;
  font?: BannerFontName;
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
  const { art, text, font = "Slant", fallback } = props;
  const renderedArt = art ?? (text ? bannerSync(text, font) : "");
  const readableFallback = fallback ?? text;

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
  }, [renderedArt]);

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
          aria-hidden={readableFallback ? "true" : undefined}
        >
          {renderedArt}
        </pre>
      </div>

      {readableFallback ? (
        <span className={styles.fallback}>{readableFallback}</span>
      ) : null}
    </>
  );

  if (isAnchorBanner(props)) {
    const {
      art: _art,
      text: _text,
      font: _font,
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
    text: _text,
    font: _font,
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
