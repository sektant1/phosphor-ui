import React from "react";
import styles from "./VideoPlayer.module.scss";

export interface VideoPlayerProps {
  tag?: React.ReactNode;
  timecode?: React.ReactNode;
  progress?: number;
  time?: React.ReactNode;
  onPlay?: () => void;
  onFullscreen?: () => void;
  scanline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  tag,
  timecode,
  progress = 0,
  time,
  onPlay,
  onFullscreen,
  scanline = true,
  className,
  children,
}) => (
  <figure className={[styles.vp, className ?? ""].join(" ")}>
    <div className={styles.stage}>
      {tag && <span className={styles.tag}>{tag}</span>}
      {timecode && <span className={styles.tc}>{timecode}</span>}
      {children ?? (
        <button className={styles.play} aria-label="play" onClick={onPlay}>
          ▶
        </button>
      )}
      {scanline && <span className={styles.scan} aria-hidden="true" />}
    </div>
    <div className={styles.bar}>
      <span className={styles.btn} role="button" aria-label="play" onClick={onPlay}>▶</span>
      <div className={styles.track}>
        <span className={styles.fill} style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
      </div>
      {time && <span className={styles.time}>{time}</span>}
      <span className={styles.btn} role="button" aria-label="fullscreen" onClick={onFullscreen}>⛶</span>
    </div>
  </figure>
);
