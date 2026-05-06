import React from "react";
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
export declare const VideoPlayer: React.FC<VideoPlayerProps>;
