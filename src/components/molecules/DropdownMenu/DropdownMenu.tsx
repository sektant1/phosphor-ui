import React from "react";
import styles from "./DropdownMenu.module.scss";
import { cx } from "../../../utils/classNames";

export interface DropdownMenuItem {
  label: React.ReactNode;
  value: string;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  label: React.ReactNode;
  items: DropdownMenuItem[];
  onSelect?: (value: string, item: DropdownMenuItem) => void;
  align?: "start" | "end";
  menuLabel?: string;
  triggerClassName?: string;
  menuClassName?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  items,
  onSelect,
  align = "start",
  menuLabel,
  triggerClassName,
  menuClassName,
  className,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Array<HTMLAnchorElement | HTMLButtonElement | null>>([]);
  const menuId = React.useId();
  const enabledItems = React.useMemo(
    () => items.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled),
    [items],
  );

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

  React.useEffect(() => {
    if (!open) return;
    const first = enabledItems[0]?.index;
    if (first !== undefined) itemRefs.current[first]?.focus();
  }, [enabledItems, open]);

  const focusByDelta = (currentIndex: number, delta: number) => {
    if (enabledItems.length === 0) return;
    const currentEnabledIndex = enabledItems.findIndex(({ index }) => index === currentIndex);
    const nextEnabledIndex =
      currentEnabledIndex < 0
        ? 0
        : (currentEnabledIndex + delta + enabledItems.length) % enabledItems.length;
    itemRefs.current[enabledItems[nextEnabledIndex].index]?.focus();
  };

  const handleItemSelect = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    onSelect?.(item.value, item);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cx(styles.root, className)} {...rest}>
      <button
        type="button"
        className={cx(styles.trigger, open && styles.open, triggerClassName)}
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
          aria-label={menuLabel}
          className={cx(styles.menu, align === "end" && styles.end, menuClassName)}
        >
          {items.map((item, index) => {
            const itemClassName = cx(styles.item, item.destructive && styles.destructive);
            const onKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusByDelta(index, 1);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                focusByDelta(index, -1);
              } else if (event.key === "Home") {
                event.preventDefault();
                itemRefs.current[enabledItems[0]?.index ?? index]?.focus();
              } else if (event.key === "End") {
                event.preventDefault();
                itemRefs.current[enabledItems[enabledItems.length - 1]?.index ?? index]?.focus();
              }
            };

            if (item.href) {
              const rel =
                item.target === "_blank"
                  ? item.rel?.includes("noopener")
                    ? item.rel
                    : item.rel
                      ? `${item.rel} noopener noreferrer`
                      : "noopener noreferrer"
                  : item.rel;

              return (
                <a
                  key={item.value}
                  ref={(node) => { itemRefs.current[index] = node; }}
                  role="menuitem"
                  aria-disabled={item.disabled || undefined}
                  tabIndex={item.disabled ? -1 : 0}
                  className={itemClassName}
                  href={item.disabled ? undefined : item.href}
                  target={item.target}
                  rel={rel}
                  onClick={(event) => {
                    if (item.disabled) {
                      event.preventDefault();
                      return;
                    }
                    handleItemSelect(item);
                  }}
                  onKeyDown={onKeyDown}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={item.value}
                ref={(node) => { itemRefs.current[index] = node; }}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={itemClassName}
                onClick={() => handleItemSelect(item)}
                onKeyDown={onKeyDown}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
