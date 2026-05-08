import React from "react";
import styles from "./DropdownMenu.module.scss";
import { cx } from "../../../utils/classNames";

export interface DropdownMenuItem {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownMenuProps {
  label: React.ReactNode;
  items: DropdownMenuItem[];
  onSelect?: (value: string, item: DropdownMenuItem) => void;
  align?: "start" | "end";
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  items,
  onSelect,
  align = "start",
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cx(styles.root, className)}>
      <button
        type="button"
        className={cx(styles.trigger, open && styles.open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((next) => !next)}
      >
        <span>{label}</span>
        <span className={styles.chev} aria-hidden="true">v</span>
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className={cx(styles.menu, align === "end" && styles.end)}
        >
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              className={cx(styles.item, item.destructive && styles.destructive)}
              onClick={() => {
                if (item.disabled) return;
                onSelect?.(item.value, item);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
