import React from "react";
import styles from "./PostFrontmatter.module.scss";
import { cx } from "../../../utils/classNames";

export type FrontmatterScalar = string | number | boolean;
export type FrontmatterValue =
  | FrontmatterScalar
  | null
  | undefined
  | ReadonlyArray<FrontmatterScalar>;

export type PostFrontmatterData = Record<string, FrontmatterValue>;

export interface PostFrontmatterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data: PostFrontmatterData;
  label?: React.ReactNode;
  marker?: string;
}

const shouldQuote = (value: string) =>
  value === "" || /[:#[\]{},]|^\s|\s$|\n/.test(value);

const formatScalar = (value: FrontmatterScalar) => {
  if (typeof value === "string") {
    return shouldQuote(value) ? JSON.stringify(value) : value;
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  return String(value);
};

const isFrontmatterArray = (
  value: FrontmatterValue,
): value is ReadonlyArray<FrontmatterScalar> => Array.isArray(value);

const formatValue = (value: FrontmatterValue) => {
  if (isFrontmatterArray(value)) {
    return `[${value.map(formatScalar).join(", ")}]`;
  }

  if (value === null || value === undefined) {
    return "null";
  }

  return formatScalar(value);
};

const isMeaningfulValue = (value: FrontmatterValue) => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const PostFrontmatter: React.FC<PostFrontmatterProps> = ({
  data,
  label = "frontmatter",
  marker = "---",
  className,
  ...rest
}) => {
  const entries = Object.entries(data).filter(([, value]) => isMeaningfulValue(value));

  if (entries.length === 0) {
    return null;
  }

  return (
    <aside
      className={cx(styles.root, className)}
      aria-label="post frontmatter"
      {...rest}
    >
      <div className={styles.head}>
        <span className={styles.glyph} aria-hidden="true">
          ::
        </span>
        <span className={styles.label}>{label}</span>
      </div>

      <dl className={styles.block}>
        <span className={styles.marker}>{marker}</span>
        {entries.map(([key, value]) => (
          <div key={key} className={styles.row}>
            <dt className={styles.key}>{key}</dt>
            <dd className={styles.value}>{formatValue(value)}</dd>
          </div>
        ))}
        <span className={styles.marker}>{marker}</span>
      </dl>
    </aside>
  );
};
