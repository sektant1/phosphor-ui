import React, { useState, useRef } from "react";
import styles from "./Toast.module.scss";

export type ToastVariant = "info" | "success" | "warn" | "error";

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  visible?: boolean;
  inline?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const glyphs: Record<ToastVariant, string> = {
  info: "[i]",
  success: "[✓]",
  warn: "[!]",
  error: "[✗]",
};

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = "info",
  visible = false,
  inline = false,
  onDismiss,
  className,
}) => {
  const cls = [
    styles.toast,
    styles[variant],
    inline ? styles.inline : (!visible ? styles.hidden : ""),
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} role="status" aria-live="polite">
      <span className={styles.glyph}>{glyphs[variant]}</span>
      <span className={styles.message}>{message}</span>
      {onDismiss && (
        <button className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  );
};

export function useToast(duration = 2400): {
  visible: boolean;
  message: string;
  variant: ToastVariant;
  show: (msg: string, variant?: ToastVariant) => void;
  dismiss: () => void;
} {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<ToastVariant>("info");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setVisible(false);
  };

  const show = (msg: string, v: ToastVariant = "info") => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setMessage(msg);
    setVariant(v);
    setVisible(true);
    timer.current = setTimeout(() => {
      setVisible(false);
      timer.current = null;
    }, duration);
  };

  return { visible, message, variant, show, dismiss };
}
