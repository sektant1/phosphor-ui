import React from "react";
import styles from "./PostFrontmatter.module.scss";
import { cx } from "../../utils/classNames";

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

export const PostFrontmatter: React.FC<PostFrontmatterProps> = ({
  data,
  label = "frontmatter",
  marker = "---",
  className,
  ...rest
}) => {
  const entries = Object.entries(data).filter(([, value]) => value !== undefined);

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

      <pre className={styles.block}>
        <span className={styles.marker}>{marker}</span>
        {"\n"}
        {entries.map(([key, value]) => (
          <React.Fragment key={key}>
            <span className={styles.key}>{key}</span>
            <span className={styles.punct}>: </span>
            <span className={styles.value}>{formatValue(value)}</span>
            {"\n"}
          </React.Fragment>
        ))}
        <span className={styles.marker}>{marker}</span>
      </pre>
    </aside>
  );
};
