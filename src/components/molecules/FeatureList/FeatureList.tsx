import React from "react";
import styles from "./FeatureList.module.scss";
import { cx } from "../../../utils/classNames";

export interface FeatureListItemData {
  id?: string;
  title: React.ReactNode;
  body: React.ReactNode;
}

export interface FeatureListItemProps extends Omit<
  React.LiHTMLAttributes<HTMLLIElement>,
  "title"
> {
  title: React.ReactNode;
  body: React.ReactNode;
}

export interface FeatureListProps extends Omit<
  React.HTMLAttributes<HTMLUListElement>,
  "children"
> {
  items: FeatureListItemData[];
  renderItem?: (item: FeatureListItemData, index: number) => React.ReactNode;
}

const getFeatureListItemKey = (
  item: FeatureListItemData,
  index: number,
): React.Key => {
  if (item.id) return item.id;
  if (typeof item.title === "string" || typeof item.title === "number") {
    return item.title;
  }

  return index;
};

export const FeatureListItem = React.forwardRef<
  HTMLLIElement,
  FeatureListItemProps
>(({ title, body, className, ...rest }, ref) => {
  return (
    <li ref={ref} className={cx(styles.item, className)} {...rest}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
    </li>
  );
});

FeatureListItem.displayName = "FeatureListItem";

export const FeatureList = React.forwardRef<HTMLUListElement, FeatureListProps>(
  ({ items, renderItem, className, ...rest }, ref) => {
    return (
      <ul ref={ref} className={cx(styles.list, className)} {...rest}>
        {items.map((item, index) =>
          renderItem ? (
            <React.Fragment key={getFeatureListItemKey(item, index)}>
              {renderItem(item, index)}
            </React.Fragment>
          ) : (
            <FeatureListItem
              key={getFeatureListItemKey(item, index)}
              title={item.title}
              body={item.body}
            />
          ),
        )}
      </ul>
    );
  },
);

FeatureList.displayName = "FeatureList";
