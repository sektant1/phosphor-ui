import React from "react";
import styles from "./Avatar.module.scss";
import { cx } from "../../../utils/classNames";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  alt?: string;
  size?: AvatarSize;
}

function getInitials(name: string | undefined): string | null {
  if (!name) return null;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return null;
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, name, alt, size = "md", className, ...rest }, ref) => {
    const cls = cx(styles.avatar, styles[size], className);

    if (src) {
      return (
        <div ref={ref} className={cls} {...rest}>
          <img src={src} alt={alt ?? name ?? ""} className={styles.img} />
        </div>
      );
    }

    const initials = getInitials(name);

    return (
      <div ref={ref} className={cls} aria-label={alt ?? name} {...rest}>
        {initials ? (
          <span className={styles.initials}>{initials}</span>
        ) : (
          <span className={styles.fallback}>▮</span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
