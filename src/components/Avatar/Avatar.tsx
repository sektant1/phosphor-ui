import React from "react";
import styles from "./Avatar.module.scss";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  name?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  alt,
  size = "md",
  className,
}) => {
  const cls = [styles.avatar, styles[size], className ?? ""].filter(Boolean).join(" ");

  if (src) {
    return (
      <div className={cls}>
        <img src={src} alt={alt ?? name ?? ""} className={styles.img} />
      </div>
    );
  }

  const initials = name ? name.slice(0, 2).toUpperCase() : null;

  return (
    <div className={cls}>
      {initials ? (
        <span className={styles.initials}>{initials}</span>
      ) : (
        <span className={styles.fallback}>▮</span>
      )}
    </div>
  );
};
