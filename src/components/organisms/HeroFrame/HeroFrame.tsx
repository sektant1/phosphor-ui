import React from "react";
import styles from "./HeroFrame.module.scss";
import { cx } from "../../../utils/classNames";

export interface HeroFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  art: string;
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
} = ({ art, topHud, bottomHud, scanline = true, className, ...rest }) => (
  <div className={cx(styles.frame, className)} {...rest}>
    {topHud && <Hud position="top">{topHud}</Hud>}
    <div className={styles.artWrap}>
      <pre className={styles.art}>{art}</pre>
      {scanline && <span className={styles.scanline} aria-hidden="true" />}
    </div>
    {bottomHud && <Hud position="bottom">{bottomHud}</Hud>}
  </div>
);

const Hud: React.FC<{ position?: "top" | "bottom"; children: React.ReactNode }> = ({
  position = "top",
  children,
}) => (
  <div className={cx(styles.hud, position === "top" ? styles.hudTop : styles.hudBot)}>
    {children}
  </div>
);

const HudLed: React.FC<{ variant?: "rec" | "pwr" }> = ({ variant = "pwr" }) => (
  <span className={cx(styles.led, variant === "rec" ? styles.ledRec : styles.ledPwr)} />
);

const HudLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={styles.label}>{children}</span>
);
const HudText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={styles.text}>{children}</span>
);
const HudSpacer: React.FC = () => <span className={styles.spacer} />;
const HudBars: React.FC<{ value: number; max?: number }> = ({ value, max = 7 }) => {
  const filled = "▮".repeat(Math.max(0, Math.min(value, max)));
  const empty = "▯".repeat(Math.max(0, max - value));
  return <span className={styles.bars}>{filled + empty}</span>;
};
const HudTape: React.FC<{ text: string; speed?: number }> = ({ text, speed = 22 }) => (
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
