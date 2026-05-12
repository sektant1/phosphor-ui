import React, { useEffect, useMemo, useRef } from "react";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import styles from "./VideoPlayer.module.scss";
import { cx } from "../../../utils/classNames";

export interface VideoSource {
  src: string;
  type?: string;
}

export interface VideoPlayerProps {
  src: string | VideoSource | VideoSource[];
  poster?: string;
  autoplay?: boolean | "muted" | "play" | "any";
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  preload?: "auto" | "metadata" | "none";
  fluid?: boolean;
  aspectRatio?: string;
  options?: Record<string, unknown>;
  onReady?: (player: Player) => void;
  tag?: React.ReactNode;
  timecode?: React.ReactNode;
  className?: string;
}

const toSources = (
  src: VideoPlayerProps["src"],
): VideoSource[] => {
  if (typeof src === "string") return [{ src }];
  if (Array.isArray(src)) return src;
  return [src];
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  preload = "auto",
  fluid = true,
  aspectRatio = "16:9",
  options,
  onReady,
  tag,
  timecode,
  className,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const sources = useMemo(() => toSources(src), [src]);

  useEffect(() => {
    if (playerRef.current) return;
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;

    const videoEl = document.createElement("video-js");
    videoEl.classList.add("vjs-big-play-centered");
    host.appendChild(videoEl);

    import("video.js").then(({ default: videojs }) => {
      if (cancelled) return;
      const player = videojs(videoEl, {
        controls,
        autoplay,
        loop,
        muted,
        preload,
        fluid,
        aspectRatio,
        poster,
        sources,
        ...options,
      });
      playerRef.current = player;
      player.ready(() => {
        onReady?.(player);
      });
    });

    return () => {
      cancelled = true;
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
      }
      playerRef.current = null;
      videoEl.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.src(sources);
    if (poster !== undefined) player.poster(poster);
  }, [sources, poster]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.controls(controls);
    player.autoplay(autoplay);
    player.loop(loop);
    player.muted(muted);
    player.preload(preload);
    player.fluid(fluid);
    player.aspectRatio(aspectRatio);
  }, [controls, autoplay, loop, muted, preload, fluid, aspectRatio]);

  return (
    <figure className={cx(styles.vp, className)}>
      <div className={styles.stage}>
        <div ref={hostRef} className={styles.host} data-vjs-player />
        {tag && <span className={styles.tag}>{tag}</span>}
        {timecode && <span className={styles.tc}>{timecode}</span>}
      </div>
    </figure>
  );
};
