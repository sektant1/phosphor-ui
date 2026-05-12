import React, { useEffect, useRef, useState } from "react";
import styles from "./HeroFrame.module.scss";
import { cx } from "../../../utils/classNames";
import type { CssVars } from "../../../utils/browser";
import { bannerSync, type BannerFontName } from "../../../ascii";

export interface HeroFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  art?: string;
  text?: string;
  font?: BannerFontName;
  topHud?: React.ReactNode;
  bottomHud?: React.ReactNode;
  scanline?: boolean;
}

export const HeroFrame: React.FC<HeroFrameProps> & {
  Hud: typeof Hud;
  HudLed: typeof HudLed;
  HudLabel: typeof HudLabel;
  HudText: typeof HudText;
  HudSpacer: typeof HudSpacer;
  HudTape: typeof HudTape;
  HudBars: typeof HudBars;
} = ({
  art,
  text,
  font = "Slant",
  topHud,
  bottomHud,
  scanline = true,
  className,
  ...rest
}) => {
  const renderedArt = art ?? (text ? bannerSync(text, font) : "");

  const artWrapRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLPreElement>(null);
  const artScaleRef = useRef(1);
  const [fit, setFit] = useState({ scale: 1 });

  useEffect(() => {
    const artWrap = artWrapRef.current;
    const artNode = artRef.current;

    if (!artWrap || !artNode) return undefined;

    const updateFit = () => {
      const computed = window.getComputedStyle(artWrap);
      const paddingX =
        Number.parseFloat(computed.paddingLeft || "0") +
        Number.parseFloat(computed.paddingRight || "0");

      const available = Math.max(0, artWrap.clientWidth - paddingX);
      const currentScale = artScaleRef.current || 1;
      const naturalWidth = artNode.scrollWidth / currentScale;

      if (!available || !naturalWidth) return;

      const nextScale = Math.min(1, available / naturalWidth);

      setFit((previous) => {
        if (Math.abs(previous.scale - nextScale) < 0.001) return previous;

        artScaleRef.current = nextScale;
        return { scale: nextScale };
      });
    };

    updateFit();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateFit);
      observer.observe(artWrap);
      observer.observe(artNode);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateFit);
    return () => window.removeEventListener("resize", updateFit);
  }, [renderedArt]);

  return (
    <div className={cx(styles.frame, className)} {...rest}>
      {topHud && <Hud position="top">{topHud}</Hud>}
      <div
        ref={artWrapRef}
        className={styles.artWrap}
        style={{ "--pho-hero-art-scale": fit.scale } as CssVars}
      >
        <pre ref={artRef} className={styles.art}>
          {renderedArt}
        </pre>
        {scanline && <span className={styles.scanline} aria-hidden="true" />}
      </div>
      {bottomHud && <Hud position="bottom">{bottomHud}</Hud>}
    </div>
  );
};

const Hud: React.FC<{
  position?: "top" | "bottom";
  children: React.ReactNode;
}> = ({ position = "top", children }) => (
  <div
    className={cx(
      styles.hud,
      position === "top" ? styles.hudTop : styles.hudBot,
    )}
  >
    {children}
  </div>
);

const HudLed: React.FC<{ variant?: "rec" | "pwr" }> = ({ variant = "pwr" }) => (
  <span
    className={cx(
      styles.led,
      variant === "rec" ? styles.ledRec : styles.ledPwr,
    )}
  />
);

const HudLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={styles.label}>{children}</span>
);
const HudText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={styles.text}>{children}</span>
);
const HudSpacer: React.FC = () => <span className={styles.spacer} />;
const HudBars: React.FC<{ value: number; max?: number }> = ({
  value,
  max = 7,
}) => {
  const filled = "▮".repeat(Math.max(0, Math.min(value, max)));
  const empty = "▯".repeat(Math.max(0, max - value));
  return <span className={styles.bars}>{filled + empty}</span>;
};
const HudTape: React.FC<{ text: string; speed?: number }> = ({
  text,
  speed = 22,
}) => (
  <span className={styles.tape}>
    <span className={styles.tapeRun} style={{ animationDuration: `${speed}s` }}>
      {text} {text}{" "}
    </span>
  </span>
);

HeroFrame.Hud = Hud;
HeroFrame.HudLed = HudLed;
HeroFrame.HudLabel = HudLabel;
HeroFrame.HudText = HudText;
HeroFrame.HudSpacer = HudSpacer;
HeroFrame.HudTape = HudTape;
HeroFrame.HudBars = HudBars;
