import React, { useEffect, useMemo, useState } from "react";
import styles from "./TableOfContents.module.scss";
import { isBrowser, type CssVars } from "../../../utils/browser";
import { cx } from "../../../utils/classNames";

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
  /**
   * When true, parent items with children render a fold toggle and can be
   * collapsed. Default: true.
   */
  collapsible?: boolean;
  /**
   * When true (and `collapsible`), parent items start collapsed. Default: false.
   */
  defaultCollapsed?: boolean;
}

const collectIds = (items: TocItem[], out: string[] = []): string[] => {
  for (const it of items) {
    if (it.href.startsWith("#")) out.push(it.href.slice(1));
    if (it.children) collectIds(it.children, out);
  }
  return out;
};

interface TocLiProps {
  item: TocItem;
  sub?: boolean;
  activeId: string | null;
  smoothScroll: boolean;
  index: number;
  collapsible: boolean;
  defaultCollapsed: boolean;
}

const TocLi: React.FC<TocLiProps> = ({
  item,
  sub,
  activeId,
  smoothScroll,
  index,
  collapsible,
  defaultCollapsed,
}) => {
  const id = item.href.startsWith("#") ? item.href.slice(1) : null;
  const hasExplicit = item.state === "active" || item.state === "done";
  const isActive =
    item.state === "active" ||
    (!hasExplicit && id !== null && id === activeId);
  const hasChildren = !!(item.children && item.children.length > 0);
  const [open, setOpen] = useState<boolean>(!defaultCollapsed);

  useEffect(() => {
    if (!collapsible || !hasChildren) return;
    if (!activeId) return;
    const descendantIds: string[] = [];
    const walk = (list: TocItem[]) => {
      for (const c of list) {
        if (c.href.startsWith("#")) descendantIds.push(c.href.slice(1));
        if (c.children) walk(c.children);
      }
    };
    walk(item.children!);
    if (descendantIds.includes(activeId)) setOpen(true);
  }, [activeId, collapsible, hasChildren, item.children]);

  const cls = cx(
    styles.li,
    isActive && styles.active,
    item.state === "done" && styles.done,
    hasChildren && styles.hasChildren,
    hasChildren && collapsible && !open && styles.collapsed,
  );

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!smoothScroll || !id) return;
    if (!isBrowser()) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.history.replaceState) window.history.replaceState(null, "", `#${id}`);
  };

  const showToggle = hasChildren && collapsible;

  return (
    <li className={cls} style={{ "--i": index } as CssVars}>
      <div className={styles.row}>
        {showToggle ? (
          <button
            type="button"
            className={styles.fold}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Collapse section" : "Expand section"}
          >
            <span aria-hidden="true">{open ? "▾" : "▸"}</span>
          </button>
        ) : (
          <span className={styles.foldSpacer} aria-hidden="true" />
        )}
        <a href={item.href} onClick={onClick}>
          <span className={styles.glyph}>{item.glyph ?? (sub ? "·" : "▌")}</span>
          <span>{item.label}</span>
        </a>
      </div>
      {hasChildren && (
        <ul className={cx(styles.list, styles.subList)} hidden={collapsible && !open}>
          {item.children!.map((c, i) => (
            <TocLi
              key={c.href + i}
              item={c}
              sub
              activeId={activeId}
              smoothScroll={smoothScroll}
              index={index + i + 1}
              collapsible={collapsible}
              defaultCollapsed={defaultCollapsed}
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
  collapsible = true,
  defaultCollapsed = false,
}) => {
  const ids = useMemo(() => collectIds(items), [items]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!spy || ids.length === 0 || !isBrowser()) return;
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
    <aside className={cx(styles.toc, className)} aria-label="on this page">
      {heading && <p className={styles.head}>{heading}</p>}
      <ul className={styles.list}>
        {items.map((it, i) => (
          <TocLi
            key={it.href + i}
            item={it}
            activeId={activeId}
            smoothScroll={smoothScroll}
            index={i}
            collapsible={collapsible}
            defaultCollapsed={defaultCollapsed}
          />
        ))}
      </ul>
      {foot && <div className={styles.foot}>{foot}</div>}
    </aside>
  );
};
