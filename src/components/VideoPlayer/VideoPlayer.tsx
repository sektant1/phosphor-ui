import React from "react";
import styles from "./VideoPlayer.module.scss";
import { cx } from "../../utils/classNames";

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
  <figure className={cx(styles.vp, className)}>
    <div className={styles.stage}>
      {tag && <span className={styles.tag}>{tag}</span>}
      {timecode && <span className={styles.tc}>{timecode}</span>}
      {children ?? (
        <button className={styles.play} aria-label="play" onClick={onPlay} type="button">
          ▶
        </button>
      )}
      {scanline && <span className={styles.scan} aria-hidden="true" />}
    </div>
    <div className={styles.bar}>
      <button className={styles.btn} aria-label="play" onClick={onPlay} type="button">▶</button>
      <div className={styles.track}>
        <span className={styles.fill} style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
      </div>
      {time && <span className={styles.time}>{time}</span>}
      <button className={styles.btn} aria-label="fullscreen" onClick={onFullscreen} type="button">⛶</button>
    </div>
  </figure>
);
