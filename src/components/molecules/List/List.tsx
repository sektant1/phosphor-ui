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
  extends React.HTMLAttributes<HTMLOListElement | HTMLUListElement> {
  items?: ListItem[];
  as?: "ul" | "ol";
  variant?: ListVariant;
  marker?: ListMarker;
  density?: ListDensity;
  renderItem?: (item: ListItem, index: number) => React.ReactNode;
}

export interface ListItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  href?: string;
  marker?: React.ReactNode;
  action?: React.ReactNode;
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

const ListItemComponent = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      title,
      description,
      meta,
      href,
      marker,
      action,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <li ref={ref} className={cx(styles.item, className)} {...rest}>
        {children ?? (
          <>
            {marker !== undefined && marker !== null ? (
              <span className={styles.marker} aria-hidden="true">
                {marker}
              </span>
            ) : null}
            <span className={styles.content}>
              <span className={styles.line}>
                {href ? (
                  <a className={styles.title} href={href}>
                    {title}
                  </a>
                ) : (
                  <span className={styles.title}>{title}</span>
                )}
                {meta ? <span className={styles.meta}>{meta}</span> : null}
              </span>
              {description ? <span className={styles.description}>{description}</span> : null}
            </span>
            {action ? <span className={styles.action}>{action}</span> : null}
          </>
        )}
      </li>
    );
  },
);

ListItemComponent.displayName = "List.Item";

const ListRoot = React.forwardRef<HTMLOListElement | HTMLUListElement, ListProps>(
  (
    {
      items,
      as = "ul",
      variant = "ruled",
      marker = as === "ol" ? "index" : "chevron",
      density = "default",
      renderItem,
      className,
      children,
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
        {items?.map((item, index) => (
          <ListItemComponent
            key={item.id ?? `${index}`}
            title={item.title}
            description={item.description}
            meta={item.meta}
            href={item.href}
            marker={marker !== "none" ? item.marker ?? (marker === "index" ? index + 1 : null) : null}
            action={item.action}
          >
            {renderItem ? (
              renderItem(item, index)
            ) : undefined}
          </ListItemComponent>
        ))}
        {!items ? children : null}
      </Component>
    );
  },
);

ListRoot.displayName = "List";

export const List = Object.assign(ListRoot, {
  Item: ListItemComponent,
});
