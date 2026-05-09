import React, { useState } from "react";
import styles from "./NerdTree.module.scss";
import { cx } from "../../../utils/classNames";
import { Drawer } from "../../molecules/Modal";

export interface NerdTreeLeaf {
  kind: "leaf";
  id?: string;
  label: string;
  href?: string;
  active?: boolean;
}
export interface NerdTreeDir {
  kind: "dir";
  id?: string;
  label: string;
  children?: NerdTreeNode[];
  defaultOpen?: boolean;
}
export type NerdTreeNode = NerdTreeLeaf | NerdTreeDir;

export interface NerdTreeProps extends React.HTMLAttributes<HTMLElement> {
  tree: NerdTreeNode[];
  bufferLabel?: string;
  title?: string;
  hint?: React.ReactNode;
  command?: string;
  footerMeta?: string;
  ariaLabel?: string;
  mobileToggleLabel?: string;
}

export const NerdTree: React.FC<NerdTreeProps> = ({
  tree,
  bufferLabel = "[content/]",
  title = "~/sektant's hideout",
  hint,
  command = ":NERDTree",
  footerMeta,
  ariaLabel = "content tree",
  mobileToggleLabel = "content tree",
  className,
  ...rest
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const renderContent = (onNavigate?: () => void) => (
    <>
      <header className={styles.header}>
        <p className={styles.buf}>
          <span className={styles.led} aria-hidden="true" />
          {bufferLabel}
        </p>
        <h2 className={styles.title}>{title}</h2>
        {hint && <p className={styles.status}>{hint}</p>}
      </header>

      <ul className={styles.list} role="tree">
        {tree.map((n, i) => (
          <Node key={getNodeKey(n, i)} node={n} index={i} onNavigate={onNavigate} />
        ))}
      </ul>

      <footer className={styles.footer}>
        <p className={styles.cmd}>{command}</p>
        {footerMeta && <p className={styles.metaFoot}>{footerMeta}</p>}
      </footer>
    </>
  );

  return (
    <aside className={cx(styles.tree, className)} aria-label={ariaLabel} {...rest}>
      <button
        type="button"
        className={styles.toggleBtn}
        aria-expanded={mobileOpen}
        aria-label={`${mobileOpen ? "Close" : "Open"} ${mobileToggleLabel}`}
        onClick={() => setMobileOpen((o) => !o)}
      >
        <span className={styles.toggleGlyph} aria-hidden="true">
          |||
        </span>
        <span className={styles.toggleLabel}>Open content tree</span>
      </button>
      <div className={cx(styles.body, styles.desktopBody)}>
        {renderContent()}
      </div>
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title={title}
        side="left"
        width="min(88vw, 22rem)"
        className={styles.drawerPanel}
      >
        <div className={styles.drawerContent}>
          {renderContent(() => setMobileOpen(false))}
        </div>
      </Drawer>
    </aside>
  );
};

function getNodeKey(node: NerdTreeNode, index: number): string {
  return node.id ?? ("href" in node && node.href ? node.href : `${node.kind}-${node.label}-${index}`);
}

const Node: React.FC<{
  node: NerdTreeNode;
  index: number;
  onNavigate?: () => void;
}> = ({ node, index, onNavigate }) => {
  if (node.kind === "leaf") {
    return (
      <li
        className={cx(styles.leaf, node.active && styles.active)}
        role="treeitem"
        aria-selected={node.active || undefined}
      >
        <a className={styles.link} href={node.href ?? "#"} onClick={onNavigate}>
          {node.label}
        </a>
      </li>
    );
  }
  return <Dir node={node} index={index} onNavigate={onNavigate} />;
};

const Dir: React.FC<{
  node: NerdTreeDir;
  index: number;
  onNavigate?: () => void;
}> = ({ node, index, onNavigate }) => {
  const [open, setOpen] = useState(node.defaultOpen ?? true);
  const count = node.children?.length ?? 0;
  const groupId = React.useId();
  return (
    <li className={styles.row} role="treeitem" aria-expanded={open} aria-controls={groupId}>
      <button
        type="button"
        className={styles.foldBtn}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.fold}>{open ? "▾" : "▸"}</span>{" "}
        <span className={styles.dir}>{node.label}</span>
        {count > 0 && <span className={styles.meta}>({count})</span>}
      </button>
      {open && node.children && (
        <ul id={groupId} className={styles.children} role="group">
          {node.children.map((c, i) => (
            <Node key={getNodeKey(c, i)} node={c} index={i} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  );
};
