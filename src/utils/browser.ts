import type React from "react";

export type CssVars = React.CSSProperties & Record<`--${string}`, string | number>;

export const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

export const getCurrentHref = () =>
  typeof window !== "undefined" ? window.location.href : "";

export const getSafeExternalRel = (
  target?: string,
  rel?: string,
): string | undefined => {
  if (target !== "_blank") return rel;
  if (rel?.includes("noopener")) return rel;
  return rel ? `${rel} noopener noreferrer` : "noopener noreferrer";
};

export const copyText = async (value: string) => {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
};
