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
  title?: React.ReactNode;
  body?: React.ReactNode;
}

export interface FeatureListProps extends Omit<
  React.HTMLAttributes<HTMLUListElement>,
  "children"
> {
  items?: FeatureListItemData[];
  renderItem?: (item: FeatureListItemData, index: number) => React.ReactNode;
  children?: React.ReactNode;
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

const FeatureListItemRoot = React.forwardRef<
  HTMLLIElement,
  FeatureListItemProps
>(({ title, body, className, children, ...rest }, ref) => {
  return (
    <li ref={ref} className={cx(styles.item, className)} {...rest}>
      {children ?? (
        <>
          {title ? <div className={styles.title}>{title}</div> : null}
          {body ? <div className={styles.body}>{body}</div> : null}
        </>
      )}
    </li>
  );
});

FeatureListItemRoot.displayName = "FeatureList.Item";

export interface FeatureListItemTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface FeatureListItemBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const FeatureListItemTitle = React.forwardRef<HTMLDivElement, FeatureListItemTitleProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cx(styles.title, className)} {...rest} />
  ),
);

FeatureListItemTitle.displayName = "FeatureList.ItemTitle";

const FeatureListItemBody = React.forwardRef<HTMLDivElement, FeatureListItemBodyProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cx(styles.body, className)} {...rest} />
  ),
);

FeatureListItemBody.displayName = "FeatureList.ItemBody";

export const FeatureListItem = Object.assign(FeatureListItemRoot, {
  Title: FeatureListItemTitle,
  Body: FeatureListItemBody,
});

const FeatureListRoot = React.forwardRef<HTMLUListElement, FeatureListProps>(
  ({ items, renderItem, className, children, ...rest }, ref) => {
    return (
      <ul ref={ref} className={cx(styles.list, className)} {...rest}>
        {items?.map((item, index) =>
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
        {!items ? children : null}
      </ul>
    );
  },
);

FeatureListRoot.displayName = "FeatureList";

export const FeatureList = Object.assign(FeatureListRoot, {
  Item: FeatureListItem,
  ItemTitle: FeatureListItemTitle,
  ItemBody: FeatureListItemBody,
});
