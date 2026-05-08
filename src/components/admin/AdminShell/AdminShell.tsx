import React from "react";
import styles from "./AdminShell.module.scss";
import { cx } from "../../../utils/classNames";

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
  <div className={cx(styles.shell, className)}>
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>{title}</span>
      </div>

      <nav className={styles.nav} aria-label="admin navigation">
        <ul className={styles.navList}>
          {nav.map((item) => (
            <li key={item.href + item.label} className={styles.navItem}>
              <a
                href={item.href}
                className={cx(
                  styles.navLink,
                  item.active && styles.navLinkActive,
                )}
              >
                {item.glyph && (
                  <span className={styles.navGlyph}>{item.glyph}</span>
                )}
                <span className={styles.navLabel}>{item.label}</span>
              </a>
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
            <button
              className={styles.logoutBtn}
              onClick={onLogout}
              type="button"
            >
              [logout]
            </button>
          )}
        </div>
      )}
    </aside>

    <main className={styles.main}>{children}</main>
  </div>
);

AdminShell.displayName = "AdminShell";
