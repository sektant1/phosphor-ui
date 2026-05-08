import React from "react";
import styles from "./AdminShell.module.scss";
import { cx } from "../../utils/classNames";
import { Flex, Grid } from "../Layout";

export interface AdminNavItem {
  label: string;
  href: string;
  active?: boolean;
  glyph?: string;
}

export interface AdminUser {
  name: string;
  role?: string;
}

export interface AdminShellProps {
  nav: AdminNavItem[];
  user?: AdminUser;
  onLogout?: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const AdminShell: React.FC<AdminShellProps> = ({
  nav,
  user,
  onLogout,
  title = "// admin",
  children,
  className,
}) => (
  <Grid className={cx(styles.shell, className)} gap={0}>
    <Flex as="aside" className={styles.sidebar} direction="column" gap={0}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>{title}</span>
      </div>
      <nav className={styles.nav} aria-label="admin navigation">
        <ul className={styles.navList}>
          {nav.map((item) => (
            <li key={item.href + item.label} className={styles.navItem}>
              <Flex
                as="a"
                href={item.href}
                className={cx(styles.navLink, item.active && styles.navLinkActive)}
                align="center"
                gap="0.5rem"
              >
                {item.glyph && <span className={styles.navGlyph}>{item.glyph}</span>}
                {item.label}
              </Flex>
            </li>
          ))}
        </ul>
      </nav>
      {(user || onLogout) && (
        <div className={styles.userSection}>
          {user && (
            <>
              <div className={styles.userName}>{user.name}</div>
              {user.role && <div className={styles.userRole}>{user.role}</div>}
            </>
          )}
          {onLogout && (
            <button className={styles.logoutBtn} onClick={onLogout} type="button">
              [logout]
            </button>
          )}
        </div>
      )}
    </Flex>
    <Flex as="main" className={styles.main} direction="column" gap="1rem">
      {children}
    </Flex>
  </Grid>
);
