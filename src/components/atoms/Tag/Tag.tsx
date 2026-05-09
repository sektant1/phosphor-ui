import React from "react";
import styles from "./Tag.module.scss";
import { cx } from "../../../utils/classNames";

export type TagColor = "phosphor" | "magenta" | "dim";

type TagBaseProps = {
  color?: TagColor;
  count?: number;
  hover?: boolean;
  removable?: boolean;
  onRemove?: () => void;
};

type TagSpanProps = TagBaseProps &
  React.HTMLAttributes<HTMLSpanElement> & {
    href?: never;
  };

type TagAnchorProps = TagBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type TagProps = TagSpanProps | TagAnchorProps;

function isAnchorTag(props: TagProps): props is TagAnchorProps {
  return typeof props.href === "string";
}

export const Tag = React.forwardRef<HTMLSpanElement | HTMLAnchorElement, TagProps>(
  (props, ref) => {
    const {
      color = "magenta",
      count,
      hover,
      removable,
      onRemove,
      className,
      children,
      ...rest
    } = props;
    const cls = cx(
      styles.tag,
      color === "phosphor" ? styles.phosphor : color === "dim" ? styles.dim : styles.magenta,
      hover && styles.hover,
      isAnchorTag(props) && styles.link,
      className,
    );
  const content = (
    <>
      {children}
      {typeof count === "number" && <i className={styles.count}>·{count}</i>}
      {removable ? (
        <button
          type="button"
          className={styles.remove}
          aria-label={`Remove ${typeof children === "string" ? children : "tag"}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove?.();
          }}
        >
          x
        </button>
      ) : null}
    </>
  );

    if (isAnchorTag(props)) {
      const anchorProps = rest as Omit<TagAnchorProps, keyof TagBaseProps | "children" | "className">;
      return (
        <a ref={ref as React.ForwardedRef<HTMLAnchorElement>} className={cls} {...anchorProps}>
          {content}
        </a>
      );
    }

    const spanProps = rest as Omit<TagSpanProps, keyof TagBaseProps | "children" | "className">;
    return (
      <span ref={ref as React.ForwardedRef<HTMLSpanElement>} className={cls} {...spanProps}>
        {content}
      </span>
    );
  },
);

Tag.displayName = "Tag";
