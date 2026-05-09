import React from "react";
import styles from "./SeriesNav.module.scss";
import { cx } from "../../../utils/classNames";
import { Cluster, Grid, Stack } from "../../templates/Layout";

export interface SeriesNavItem {
  title: string;
  href: string;
}

export interface SeriesNavProps {
  seriesTitle: string;
  current: number;
  total: number;
  prev?: SeriesNavItem;
  next?: SeriesNavItem;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export const SeriesNav: React.FC<SeriesNavProps> = ({
  seriesTitle,
  current,
  total,
  prev,
  next,
  className,
}) => (
  <Stack
    as="nav"
    gap="sm"
    className={cx(styles.root, className)}
    aria-label="series navigation"
  >
    <Cluster className={styles.header} rowGap="0.4ch" columnGap="1ch" align="baseline">
      <span className={styles.seriesLabel}>SERIES</span>
      <span className={styles.seriesTitle}>{seriesTitle}</span>
      <span className={styles.progress}>
        [{pad(current)} / {pad(total)}]
      </span>
    </Cluster>

    <Grid className={styles.links} columns="1fr 1fr" gap="sm" mobileColumns="1fr">
      <div className={styles.prevSlot}>
        {prev && (
          <Stack as="a" href={prev.href} gap="xs" className={styles.link}>
            <span className={styles.dir}>&#9666; prev</span>
            <span className={styles.linkTitle}>{prev.title}</span>
          </Stack>
        )}
      </div>
      <div className={styles.nextSlot}>
        {next && (
          <Stack
            as="a"
            href={next.href}
            gap="xs"
            className={cx(styles.link, styles.linkNext)}
          >
            <span className={styles.dir}>next &#9656;</span>
            <span className={styles.linkTitle}>{next.title}</span>
          </Stack>
        )}
      </div>
    </Grid>
  </Stack>
);
