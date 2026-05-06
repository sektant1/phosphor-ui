import { useCallback, useEffect, useState } from "react";

export type HashRouteMatchers<R extends string> = Record<R, RegExp | ((hash: string) => boolean)>;

export interface UseHashRouteOptions<R extends string> {
  routes: HashRouteMatchers<R>;
  fallback: R;
}

export const useHashRoute = <R extends string>({
  routes,
  fallback,
}: UseHashRouteOptions<R>): [R, (hash: string) => void] => {
  const parse = useCallback((): R => {
    const h = (typeof window !== "undefined" ? window.location.hash : "") || "";
    for (const key of Object.keys(routes) as R[]) {
      const m = routes[key];
      const ok = typeof m === "function" ? m(h) : m.test(h);
      if (ok) return key;
    }
    return fallback;
  }, [routes, fallback]);

  const [route, setRoute] = useState<R>(parse);

  useEffect(() => {
    const onHash = () => setRoute(parse());
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [parse]);

  const go = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  return [route, go];
};
