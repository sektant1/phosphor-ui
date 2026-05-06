/// <reference types="react" />
export declare const useReadingProgress: <T extends HTMLElement = HTMLElement>() => {
    ref: import("react").MutableRefObject<T | null>;
    pct: number;
};
