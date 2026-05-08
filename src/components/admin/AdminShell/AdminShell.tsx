import React from "react";
import styles from "./AdminShell.module.scss";
import { cx } from "../../../utils/classNames";
import { NerdTree, type NerdTreeNode } from "../../organisms/NerdTree";

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
  nav?: AdminNavItem[];
  tree?: NerdTreeNode[];
  user?: AdminUser;
  onLogout?: () => void | Promise<void>;
  title?: string;
  treeTitle?: string;
  treeBufferLabel?: string;
  treeHint?: React.ReactNode;
  treeCommand?: string;
  treeFooterMeta?: string;
  children: React.ReactNode;
  className?: string;
}

function navToTree(nav: AdminNavItem[] = []): NerdTreeNode[] {
  return [
    {
      kind: "dir",
      label: "admin",
      defaultOpen: true,
      children: nav.map((item) => ({
        kind: "leaf",
        label: item.glyph ? `${item.glyph} ${item.label}` : item.label,
        href: item.href,
        active: item.active,
      })),
    },
  ];
}

export const AdminShell: React.FC<AdminShellProps> = ({
  nav = [],
  tree,
  user,
  onLogout,
  title = "// admin",
  treeTitle,
  treeBufferLabel = "[admin/]",
  treeHint,
  treeCommand = ":AdminTree",
  treeFooterMeta,
  children,
  className,
}) => {
  const resolvedTree = tree ?? navToTree(nav);
  const footerMeta =
    treeFooterMeta ??
    (user ? `${user.name}${user.role ? ` :: ${user.role}` : ""}` : undefined);

  return (
    <div className={cx(styles.shell, className)}>
      <div className={styles.sidePanel}>
        <NerdTree
          className={styles.tree}
          tree={resolvedTree}
          title={treeTitle ?? title}
          bufferLabel={treeBufferLabel}
          hint={treeHint}
          command={treeCommand}
          footerMeta={footerMeta}
        />

        {(user || onLogout) && (
          <div className={styles.userSection}>
            {user && (
              <div className={styles.userBlock}>
                <div className={styles.userName}>{user.name}</div>
                {user.role && (
                  <div className={styles.userRole}>{user.role}</div>
                )}
              </div>
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
      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

AdminShell.displayName = "AdminShell";
