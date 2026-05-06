import React, { useEffect, useMemo, useState } from "react";
import styles from "./TableOfContents.module.scss";

export interface TocItem {
  label: React.ReactNode;
  href: string;
  glyph?: string;
  state?: "default" | "active" | "done";
  children?: TocItem[];
}

export interface TableOfContentsProps {
  heading?: React.ReactNode;
  items: TocItem[];
  foot?: React.ReactNode;
  className?: string;
  spy?: boolean;
  smoothScroll?: boolean;
  /**
   * Distance from viewport top (in px) used to decide which heading is
   * "current" while scrolling. A heading becomes active once its top edge
   * crosses above this offset. Default: 25% of viewport height.
   */
  spyOffset?: number;
}

const collectIds = (items: TocItem[], out: string[] = []): string[] => {
  for (const it of items) {
    if (it.href.startsWith("#")) out.push(it.href.slice(1));
    if (it.children) collectIds(it.children, out);
  }
  return out;
};

const flattenWithIndex = (
  items: TocItem[],
  start = 0,
  out: Array<{ item: TocItem; i: number }> = []
): { items: Array<{ item: TocItem; i: number }>; next: number } => {
  let i = start;
  for (const it of items) {
    out.push({ item: it, i: i++ });
    if (it.children) {
      const r = flattenWithIndex(it.children, i);
      i = r.next;
    }
  }
  return { items: out, next: i };
};

interface TocLiProps {
  item: TocItem;
  sub?: boolean;
  activeId: string | null;
  smoothScroll: boolean;
  index: number;
}

const TocLi: React.FC<TocLiProps> = ({ item, sub, activeId, smoothScroll, index }) => {
  const id = item.href.startsWith("#") ? item.href.slice(1) : null;
  const hasExplicit = item.state === "active" || item.state === "done";
  const isActive =
    item.state === "active" ||
    (!hasExplicit && id !== null && id === activeId);
  const cls = [
    styles.li,
    isActive ? styles.active : "",
    item.state === "done" ? styles.done : "",
  ].join(" ");

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!smoothScroll || !id) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", `#${id}`);
  };

  return (
    <li className={cls} style={{ ["--i" as never]: index }}>
      <a href={item.href} onClick={onClick}>
        <span className={styles.glyph}>{item.glyph ?? (sub ? "·" : "▌")}</span>
        <span>{item.label}</span>
      </a>
      {item.children && item.children.length > 0 && (
        <ul className={[styles.list, styles.subList].join(" ")}>
          {item.children.map((c, i) => (
            <TocLi
              key={c.href + i}
              item={c}
              sub
              activeId={activeId}
              smoothScroll={smoothScroll}
              index={index + i + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  heading = "// on this page",
  items,
  foot,
  className,
  spy = true,
  smoothScroll = true,
  spyOffset,
}) => {
  const ids = useMemo(() => collectIds(items), [items]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!spy || ids.length === 0 || typeof window === "undefined") return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const compute = () => {
      const offset = spyOffset ?? Math.max(80, window.innerHeight * 0.25);
      let current = elements[0].id;
      for (const el of elements) {
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = el.id;
        else break;
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids, spy, spyOffset]);

  return (
    <aside className={[styles.toc, className ?? ""].join(" ")} aria-label="on this page">
      {heading && <p className={styles.head}>{heading}</p>}
      <ul className={styles.list}>
        {items.map((it, i) => (
          <TocLi
            key={it.href + i}
            item={it}
            activeId={activeId}
            smoothScroll={smoothScroll}
            index={i}
          />
        ))}
      </ul>
      {foot && <div className={styles.foot}>{foot}</div>}
    </aside>
  );
};
