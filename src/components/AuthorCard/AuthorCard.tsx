import React from "react";
import styles from "./AuthorCard.module.scss";

export interface AuthorLink {
  label: string;
  href: string;
}

export interface AuthorCardProps {
  name: string;
  role?: string;
  bio?: string;
  avatarSrc?: string;
  links?: AuthorLink[];
  className?: string;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({
  name,
  role,
  bio,
  avatarSrc,
  links,
  className,
}) => {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.avatar}>
        {avatarSrc ? (
          <img src={avatarSrc} alt={name} className={styles.avatarImg} />
        ) : (
          <span className={styles.initials}>{initials}</span>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{name}</div>
        {role && <div className={styles.role}>{role}</div>}
        {bio && <div className={styles.bio}>{bio}</div>}
        {links && links.length > 0 && (
          <div className={styles.links}>
            {links.map((link, i) => (
              <React.Fragment key={link.href}>
                {i > 0 && <span className={styles.sep}> </span>}
                <a
                  href={link.href}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
