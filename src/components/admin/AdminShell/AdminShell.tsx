import React from "react";
import styles from "./AdminShell.module.scss";
import { cx } from "../../../utils/classNames";
import { NerdTree, type NerdTreeNode } from "../../organisms/NerdTree";
import { Cluster, Stack } from "../../templates/Layout";
import Text from "../../atoms/Text";

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

export interface AdminStat {
  label: string;
  value: React.ReactNode;
  tone?: "default" | "good" | "warn";
}

export interface AdminShellProps {
  nav?: AdminNavItem[];
  tree?: NerdTreeNode[];
  user?: AdminUser;
  onLogout?: () => void | Promise<void>;
  title?: string;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  stats?: AdminStat[];
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
  heading,
  description,
  actions,
  stats,
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
  const mainHeading = heading ?? title.replace(/^\/\/\s*/, "");
  const hasHeader = !!(mainHeading || description || actions || stats?.length);
  const activeNavItem = nav.find((item) => item.active);
  const reviewStat = stats?.find((stat) => stat.tone === "warn") ?? stats?.[0];

  return (
    <div className={cx(styles.shell, className)}>
      <Stack className={styles.sidePanel} gap="none">
        <div className={styles.panelHeader}>
          <Text variant="stamp" className={styles.panelKicker}>right rail</Text>
          <Text variant="terminal" className={styles.panelTitle}>{treeTitle ?? title}</Text>
        </div>

        <div className={styles.panelStatus} aria-label="Admin rail status">
          <div className={styles.statusRow}>
            <Text variant="caption" className={styles.statusLabel}>route</Text>
            <Text variant="code" className={styles.statusValue}>
              {activeNavItem?.label ?? "dashboard"}
            </Text>
          </div>
          <div className={styles.statusRow}>
            <Text variant="caption" className={styles.statusLabel}>queue</Text>
            <Text variant="code" className={cx(styles.statusValue, reviewStat?.tone === "warn" && styles.statusWarn)}>
              {reviewStat ? reviewStat.value : "00"}
            </Text>
          </div>
        </div>

        <div className={styles.treeFrame}>
          <NerdTree
            className={styles.tree}
            tree={resolvedTree}
            title={treeTitle ?? title}
            bufferLabel={treeBufferLabel}
            hint={treeHint}
            command={treeCommand}
            footerMeta={footerMeta}
          />
        </div>

        {(user || onLogout) && (
          <Stack className={styles.userSection} gap="sm">
            {user && (
              <Stack className={styles.userBlock} gap="xs">
                <Text variant="caption" className={styles.userLabel}>operator</Text>
                <div className={styles.userIdentity}>
                  <span className={styles.userPulse} aria-hidden="true" />
                  <Text variant="code" className={styles.userName} truncate>{user.name}</Text>
                </div>
                {user.role && <Text variant="caption" className={styles.userRole}>{user.role}</Text>}
              </Stack>
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
          </Stack>
        )}
      </Stack>

      <main className={styles.main}>
        {hasHeader && (
          <Stack className={styles.mainHeader} gap="md">
            <Cluster className={styles.mainHeaderTop} justify="space-between" gap="md">
              <Stack className={styles.mainTitleBlock} gap="xs">
                <Text variant="stamp" className={styles.eyebrow}>cms control</Text>
                {mainHeading && (
                  <Text variant="h2" as="h1" className={styles.mainTitle}>
                    {mainHeading}
                  </Text>
                )}
                {description && (
                  <Text variant="muted" className={styles.mainDescription}>
                    {description}
                  </Text>
                )}
              </Stack>
              {actions && <Cluster className={styles.mainActions} gap="sm">{actions}</Cluster>}
            </Cluster>

            {!!stats?.length && (
              <div className={styles.statsGrid} aria-label="Admin summary">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={cx(styles.statCard, stat.tone === "good" && styles.statGood, stat.tone === "warn" && styles.statWarn)}
                  >
                    <Text variant="caption" className={styles.statLabel}>{stat.label}</Text>
                    <Text variant="code" className={styles.statValue}>{stat.value}</Text>
                  </div>
                ))}
              </div>
            )}
          </Stack>
        )}

        {children}
      </main>
    </div>
  );
};

AdminShell.displayName = "AdminShell";
