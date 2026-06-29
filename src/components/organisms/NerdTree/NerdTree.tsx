import React, { useState } from "react";
import styles from "./NerdTree.module.scss";
import { cx } from "../../../utils/classNames";
import { Drawer } from "../../molecules/Modal";
import type { SlotClassNames } from "../../../types/slots";

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

export type NerdTreeSlot =
  | "root"
  | "toggle"
  | "desktopBody"
  | "drawer"
  | "drawerContent"
  | "header"
  | "buffer"
  | "title"
  | "status"
  | "list"
  | "row"
  | "leaf"
  | "link"
  | "active"
  | "foldButton"
  | "fold"
  | "directory"
  | "meta"
  | "children"
  | "footer"
  | "command"
  | "footerMeta";

export interface NerdTreeProps extends React.HTMLAttributes<HTMLElement> {
  tree: NerdTreeNode[];
  density?: "default" | "compact";
  frame?: "rail" | "panel" | "bare";
  chrome?: "default" | "transparent" | "none";
  mobileBehavior?: "drawer" | "inline" | "hidden";
  slotClassNames?: SlotClassNames<NerdTreeSlot>;
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
  density = "default",
  frame = "rail",
  chrome = "default",
  mobileBehavior = "drawer",
  slotClassNames,
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
      <header className={cx(styles.header, slotClassNames?.header)} data-pho-slot="header">
        <p className={cx(styles.buf, slotClassNames?.buffer)} data-pho-slot="buffer">
          <span className={styles.led} aria-hidden="true" />
          {bufferLabel}
        </p>
        <h2 className={cx(styles.title, slotClassNames?.title)} data-pho-slot="title">
          {title}
        </h2>
        {hint && (
          <p className={cx(styles.status, slotClassNames?.status)} data-pho-slot="status">
            {hint}
          </p>
        )}
      </header>

      <ul className={cx(styles.list, slotClassNames?.list)} role="tree" data-pho-slot="list">
        {tree.map((n, i) => (
          <Node
            key={getNodeKey(n, i)}
            node={n}
            index={i}
            onNavigate={onNavigate}
            slotClassNames={slotClassNames}
          />
        ))}
      </ul>

      <footer className={cx(styles.footer, slotClassNames?.footer)} data-pho-slot="footer">
        <p className={cx(styles.cmd, slotClassNames?.command)} data-pho-slot="command">
          {command}
        </p>
        {footerMeta && (
          <p className={cx(styles.metaFoot, slotClassNames?.footerMeta)} data-pho-slot="footerMeta">
            {footerMeta}
          </p>
        )}
      </footer>
    </>
  );

  return (
    <aside
      className={cx(
        styles.tree,
        density === "compact" && styles.compact,
        frame === "panel" && styles.panel,
        frame === "bare" && styles.bare,
        chrome === "transparent" && styles.transparent,
        chrome === "none" && styles.noChrome,
        mobileBehavior === "inline" && styles.mobileInline,
        mobileBehavior === "hidden" && styles.mobileHidden,
        slotClassNames?.root,
        className,
      )}
      aria-label={ariaLabel}
      data-pho-component="NerdTree"
      data-pho-slot="root"
      data-pho-frame={frame}
      data-pho-chrome={chrome}
      data-pho-mobile-behavior={mobileBehavior}
      {...rest}
    >
      {mobileBehavior === "drawer" ? (
        <button
          type="button"
          className={cx(styles.toggleBtn, slotClassNames?.toggle)}
          aria-expanded={mobileOpen}
          aria-label={`${mobileOpen ? "Close" : "Open"} ${mobileToggleLabel}`}
          onClick={() => setMobileOpen((o) => !o)}
          data-pho-slot="toggle"
        >
          <span className={styles.toggleGlyph} aria-hidden="true">
            |||
          </span>
          <span className={styles.toggleLabel}>Open content tree</span>
        </button>
      ) : null}
      <div
        className={cx(styles.body, styles.desktopBody, slotClassNames?.desktopBody)}
        data-pho-slot="desktopBody"
      >
        {renderContent()}
      </div>
      {mobileBehavior === "drawer" ? (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          title={title}
          side="left"
          width="min(88vw, 22rem)"
          className={cx(styles.drawerPanel, slotClassNames?.drawer)}
        >
          <div
            className={cx(styles.drawerContent, slotClassNames?.drawerContent)}
            data-pho-slot="drawerContent"
          >
            {renderContent(() => setMobileOpen(false))}
          </div>
        </Drawer>
      ) : null}
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
  slotClassNames?: SlotClassNames<NerdTreeSlot>;
}> = ({ node, index, onNavigate, slotClassNames }) => {
  if (node.kind === "leaf") {
    return (
      <li
        className={cx(
          styles.leaf,
          slotClassNames?.leaf,
          node.active && styles.active,
          node.active && slotClassNames?.active,
        )}
        role="treeitem"
        aria-selected={node.active || undefined}
        data-pho-slot="leaf"
        data-pho-state={node.active ? "active" : undefined}
      >
        <a
          className={cx(styles.link, slotClassNames?.link)}
          href={node.href ?? "#"}
          onClick={onNavigate}
          data-pho-slot="link"
        >
          {node.label}
        </a>
      </li>
    );
  }
  return <Dir node={node} index={index} onNavigate={onNavigate} slotClassNames={slotClassNames} />;
};

const Dir: React.FC<{
  node: NerdTreeDir;
  index: number;
  onNavigate?: () => void;
  slotClassNames?: SlotClassNames<NerdTreeSlot>;
}> = ({ node, index, onNavigate, slotClassNames }) => {
  const [open, setOpen] = useState(node.defaultOpen ?? true);
  const count = node.children?.length ?? 0;
  const groupId = React.useId();
  return (
    <li
      className={cx(styles.row, slotClassNames?.row)}
      role="treeitem"
      aria-expanded={open}
      aria-controls={groupId}
      data-pho-slot="row"
    >
      <button
        type="button"
        className={cx(styles.foldBtn, slotClassNames?.foldButton)}
        onClick={() => setOpen((o) => !o)}
        data-pho-slot="foldButton"
      >
        <span className={cx(styles.fold, slotClassNames?.fold)} data-pho-slot="fold">
          {open ? "▾" : "▸"}
        </span>{" "}
        <span className={cx(styles.dir, slotClassNames?.directory)} data-pho-slot="directory">
          {node.label}
        </span>
        {count > 0 && (
          <span className={cx(styles.meta, slotClassNames?.meta)} data-pho-slot="meta">
            ({count})
          </span>
        )}
      </button>
      {open && node.children && (
        <ul
          id={groupId}
          className={cx(styles.children, slotClassNames?.children)}
          role="group"
          data-pho-slot="children"
        >
          {node.children.map((c, i) => (
            <Node
              key={getNodeKey(c, i)}
              node={c}
              index={i}
              onNavigate={onNavigate}
              slotClassNames={slotClassNames}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
