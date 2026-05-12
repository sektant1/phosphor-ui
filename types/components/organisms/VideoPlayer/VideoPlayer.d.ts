import React from "react";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
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
export declare const VideoPlayer: React.FC<VideoPlayerProps>;
