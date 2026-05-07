import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { cx } from "../../utils/classNames";
import { isBrowser, type CssVars } from "../../utils/browser";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, className }) => {
  useEffect(() => {
    if (!open || !isBrowser()) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open || !isBrowser()) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  if (!isBrowser()) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={cx(styles.dialog, className)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.header}>
          {title && <span className={styles.title}>{title}</span>}
          <button className={styles.close} onClick={onClose} aria-label="Close" type="button">
            [×]
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export type DrawerSide = "left" | "right";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: DrawerSide;
  width?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  side = "right",
  width = "320px",
  children,
  className,
}) => {
  useEffect(() => {
    if (!open || !isBrowser()) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open || !isBrowser()) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!isBrowser()) return null;

  return ReactDOM.createPortal(
    <div
      className={cx(styles.drawerOverlay, open && styles.drawerOverlayVisible)}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        className={cx(
          styles.panel,
          side === "left" ? styles.panelLeft : styles.panelRight,
          open && styles.panelOpen,
          className
        )}
        style={{ "--drawer-width": width } as CssVars}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.header}>
          {title && <span className={styles.title}>{title}</span>}
          <button className={styles.close} onClick={onClose} aria-label="Close" type="button">
            [×]
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
