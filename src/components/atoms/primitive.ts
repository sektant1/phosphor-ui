import React from "react";

export type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export function composeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

export function callAll<E>(
  ...handlers: Array<((event: E) => void) | undefined>
): (event: E) => void {
  return (event) => {
    for (const handler of handlers) {
      handler?.(event);
    }
  };
}

export function hasVisibleContent(value: React.ReactNode): boolean {
  return value !== undefined && value !== null && value !== false;
}
