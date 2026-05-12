import React from "react";
export type DataAttributes = {
    [key: `data-${string}`]: string | number | boolean | undefined;
};
export declare function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T>;
export declare function callAll<E>(...handlers: Array<((event: E) => void) | undefined>): (event: E) => void;
export declare function hasVisibleContent(value: React.ReactNode): boolean;
