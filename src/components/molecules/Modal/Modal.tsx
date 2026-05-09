import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { cx } from "../../../utils/classNames";
import { isBrowser, type CssVars } from "../../../utils/browser";

type OverlayCommonProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  closeLabel?: string;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export interface ModalProps extends OverlayCommonProps {
  overlayClassName?: string;
}

function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function useOverlayDismiss(
  open: boolean,
  onClose: () => void,
  closeOnEscape: boolean,
): void {
  useEffect(() => {
    if (!open || !isBrowser()) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !isBrowser() || !closeOnEscape) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeOnEscape, onClose, open]);
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  closeLabel = "Close",
  closeOnEscape = true,
  closeOnOverlayClick = true,
  footer,
  children,
  className,
  overlayClassName,
}) => {
  const titleId = React.useId();
  const descriptionId = React.useId();
  useOverlayDismiss(open, onClose, closeOnEscape);

  if (!open) return null;
  if (!isBrowser()) return null;

  return ReactDOM.createPortal(
    <div
      className={cx(styles.overlay, overlayClassName)}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={cx(styles.dialog, className)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
      >
        <div className={styles.header}>
          {title ? <span id={titleId} className={styles.title}>{title}</span> : null}
          <button
            className={styles.close}
            onClick={onClose}
            aria-label={closeLabel}
            type="button"
          >
            [×]
          </button>
        </div>
        {description ? <p id={descriptionId} className={styles.description}>{description}</p> : null}
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
};

export type DrawerSide = "left" | "right";

export interface DrawerProps extends OverlayCommonProps {
  side?: DrawerSide;
  width?: string;
  overlayClassName?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  description,
  closeLabel = "Close",
  closeOnEscape = true,
  closeOnOverlayClick = true,
  footer,
  side = "right",
  width = "320px",
  children,
  className,
  overlayClassName,
}) => {
  const mounted = useMounted();
  const titleId = React.useId();
  const descriptionId = React.useId();
  useOverlayDismiss(open, onClose, closeOnEscape);

  if (!mounted || !open || !isBrowser()) return null;

  return ReactDOM.createPortal(
    <div
      className={cx(styles.drawerOverlay, open && styles.drawerOverlayVisible, overlayClassName)}
      onClick={closeOnOverlayClick ? onClose : undefined}
      aria-hidden={!open}
    >
      <div
        className={cx(
          styles.panel,
          side === "left" ? styles.panelLeft : styles.panelRight,
          open && styles.panelOpen,
          className,
        )}
        style={{ "--drawer-width": width } as CssVars}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
      >
        <div className={styles.header}>
          {title ? <span id={titleId} className={styles.title}>{title}</span> : null}
          <button
            className={styles.close}
            onClick={onClose}
            aria-label={closeLabel}
            type="button"
          >
            [×]
          </button>
        </div>
        {description ? <p id={descriptionId} className={styles.description}>{description}</p> : null}
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
};
