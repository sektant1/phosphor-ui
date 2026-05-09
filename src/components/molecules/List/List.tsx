import React from "react";
import styles from "./List.module.scss";
import { cx } from "../../../utils/classNames";

export type ListVariant = "plain" | "ruled" | "terminal";
export type ListMarker = "dot" | "dash" | "chevron" | "index" | "none";
export type ListDensity = "default" | "compact";

export interface ListItem {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  href?: string;
  marker?: React.ReactNode;
  action?: React.ReactNode;
}

export interface ListProps
  extends Omit<React.HTMLAttributes<HTMLOListElement | HTMLUListElement>, "children"> {
  items: ListItem[];
  as?: "ul" | "ol";
  variant?: ListVariant;
  marker?: ListMarker;
  density?: ListDensity;
  renderItem?: (item: ListItem, index: number) => React.ReactNode;
}

const variantClass: Record<ListVariant, string> = {
  plain: styles.plain,
  ruled: styles.ruled,
  terminal: styles.terminal,
};

const markerClass: Record<ListMarker, string> = {
  dot: styles.markerDot,
  dash: styles.markerDash,
  chevron: styles.markerChevron,
  index: styles.markerIndex,
  none: styles.markerNone,
};

export const List = React.forwardRef<HTMLOListElement | HTMLUListElement, ListProps>(
  (
    {
      items,
      as = "ul",
      variant = "ruled",
      marker = as === "ol" ? "index" : "chevron",
      density = "default",
      renderItem,
      className,
      ...rest
    },
    ref,
  ) => {
    const Component = as;

    return (
      <Component
        ref={ref as React.ForwardedRef<HTMLUListElement> & React.ForwardedRef<HTMLOListElement>}
        className={cx(
          styles.list,
          variantClass[variant],
          markerClass[marker],
          density === "compact" && styles.compact,
          className,
        )}
        {...rest}
      >
        {items.map((item, index) => (
          <li key={item.id ?? `${index}`} className={styles.item}>
            {renderItem ? (
              renderItem(item, index)
            ) : (
              <>
                {marker !== "none" ? (
                  <span className={styles.marker} aria-hidden="true">
                    {item.marker ?? (marker === "index" ? index + 1 : null)}
                  </span>
                ) : null}
                <span className={styles.content}>
                  <span className={styles.line}>
                    {item.href ? (
                      <a className={styles.title} href={item.href}>
                        {item.title}
                      </a>
                    ) : (
                      <span className={styles.title}>{item.title}</span>
                    )}
                    {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                  </span>
                  {item.description ? (
                    <span className={styles.description}>{item.description}</span>
                  ) : null}
                </span>
                {item.action ? <span className={styles.action}>{item.action}</span> : null}
              </>
            )}
          </li>
        ))}
      </Component>
    );
  },
);

List.displayName = "List";
