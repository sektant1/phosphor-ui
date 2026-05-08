import React, { useState } from "react";
import styles from "./NerdTree.module.scss";
import { cx } from "../../../utils/classNames";
import { Drawer } from "../../molecules/Modal";

export interface NerdTreeLeaf {
  kind: "leaf";
  label: string;
  href?: string;
  active?: boolean;
}
export interface NerdTreeDir {
  kind: "dir";
  label: string;
  children?: NerdTreeNode[];
  defaultOpen?: boolean;
}
export type NerdTreeNode = NerdTreeLeaf | NerdTreeDir;

export interface NerdTreeProps {
  tree: NerdTreeNode[];
  bufferLabel?: string;
  title?: string;
  hint?: React.ReactNode;
  command?: string;
  footerMeta?: string;
  className?: string;
}

export const NerdTree: React.FC<NerdTreeProps> = ({
  tree,
  bufferLabel = "[content/]",
  title = "~/sektant's hideout",
  hint,
  command = ":NERDTree",
  footerMeta,
  className,
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
          <Node key={i} node={n} onNavigate={onNavigate} />
        ))}
      </ul>

      <footer className={styles.footer}>
        <p className={styles.cmd}>{command}</p>
        {footerMeta && <p className={styles.metaFoot}>{footerMeta}</p>}
      </footer>
    </>
  );

  return (
    <aside className={cx(styles.tree, className)} aria-label="content tree">
      <button
        type="button"
        className={styles.toggleBtn}
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? "Close content tree" : "Open content tree"}
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

const Node: React.FC<{
  node: NerdTreeNode;
  onNavigate?: () => void;
}> = ({ node, onNavigate }) => {
  if (node.kind === "leaf") {
    return (
      <li className={[styles.leaf, node.active ? styles.active : ""].join(" ")}>
        <a className={styles.link} href={node.href ?? "#"} onClick={onNavigate}>
          {node.label}
        </a>
      </li>
    );
  }
  return <Dir node={node} onNavigate={onNavigate} />;
};

const Dir: React.FC<{
  node: NerdTreeDir;
  onNavigate?: () => void;
}> = ({ node, onNavigate }) => {
  const [open, setOpen] = useState(node.defaultOpen ?? true);
  const count = node.children?.length ?? 0;
  return (
    <li className={styles.row}>
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
        <ul className={styles.children}>
          {node.children.map((c, i) => (
            <Node key={i} node={c} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  );
};
