import React from "react";
import styles from "./ArticleList.module.scss";
import { cx } from "../../../utils/classNames";
import { Cluster, Stack } from "../../templates/Layout";

export interface ArticleListItem {
  id?: string;
  title: React.ReactNode;
  href: string;
  meta?: React.ReactNode;
  description?: React.ReactNode;
}

export interface ArticleListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: ArticleListItem[];
  glyph?: React.ReactNode;
  renderItem?: (item: ArticleListItem, index: number) => React.ReactNode;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  items,
  glyph = "▸",
  renderItem,
  className,
  ...rest
}) => (
  <Stack as="ul" gap="sm" className={cx(styles.list, className)} {...rest}>
    {items.map((item, index) =>
      renderItem ? (
        <React.Fragment key={item.id ?? item.href}>{renderItem(item, index)}</React.Fragment>
      ) : (
        <Stack as="li" key={item.id ?? item.href} gap="xs" className={styles.item}>
          <Cluster as="a" className={styles.link} href={item.href} gap="0.45ch">
            <span aria-hidden="true">{glyph}</span>
            <span>{item.title}</span>
          </Cluster>
          {item.meta ? <div className={styles.meta}>{item.meta}</div> : null}
          {item.description ? (
            <p className={styles.description}>{item.description}</p>
          ) : null}
        </Stack>
      ),
    )}
  </Stack>
);
