import type React from "react";
export type CssVars = React.CSSProperties & Record<`--${string}`, string | number>;
export declare const isBrowser: () => boolean;
export declare const getCurrentHref: () => string;
export declare const copyText: (value: string) => Promise<boolean>;
