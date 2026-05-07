import { useEffect, useRef, useState } from "react";
import { isBrowser } from "../utils/browser";

export const useReadingProgress = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (!isBrowser()) return;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const passed = -rect.top;
      const v = total <= 0 ? 1 : Math.max(0, Math.min(1, passed / total));
      setPct(v);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { ref, pct };
};
