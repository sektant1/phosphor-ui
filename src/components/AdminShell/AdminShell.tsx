import React from "react";
import styles from "./AdminShell.module.scss";

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
  <div className={[styles.shell, className ?? ""].join(" ")}>
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
                className={[styles.navLink, item.active ? styles.navLinkActive : ""].join(" ")}
              >
                {item.glyph && <span className={styles.navGlyph}>{item.glyph}</span>}
                {item.label}
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
            <button className={styles.logoutBtn} onClick={onLogout} type="button">
              [logout]
            </button>
          )}
        </div>
      )}
    </aside>
    <main className={styles.main}>{children}</main>
  </div>
);
