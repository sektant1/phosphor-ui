import React from "react";
import styles from "./AuthorCard.module.scss";
import { cx } from "../../../utils/classNames";
import { Avatar } from "../../atoms/Avatar";
import Link from "../../atoms/Link";
import { Cluster, Stack } from "../../templates/Layout";

export interface AuthorLink {
  label: string;
  href: string;
}

export interface AuthorCardProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  role?: string;
  bio?: React.ReactNode;
  avatarSrc?: string;
  links?: AuthorLink[];
}

export const AuthorCard: React.FC<AuthorCardProps> = ({
  name,
  role,
  bio,
  avatarSrc,
  links,
  className,
  ...rest
}) => {
  return (
    <Cluster
      as="article"
      className={cx(styles.card, className)}
      gap="md"
      align="flex-start"
      {...rest}
    >
      <Avatar className={styles.avatar} src={avatarSrc} name={name} alt={name} />
      <Stack className={styles.body} gap="xs">
        <div className={styles.name}>{name}</div>
        {role && <div className={styles.role}>{role}</div>}
        {bio && <div className={styles.bio}>{bio}</div>}
        {links && links.length > 0 && (
          <Cluster className={styles.links} gap="sm">
            {links.map((link, i) => (
              <React.Fragment key={link.href}>
                {i > 0 && <span className={styles.sep} aria-hidden="true">·</span>}
                <Link
                  href={link.href}
                  className={styles.link}
                  external
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </Cluster>
        )}
      </Stack>
    </Cluster>
  );
};
