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

export interface DropdownMenuProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onSelect"> {
  label: React.ReactNode;
  items: DropdownMenuItem[];
  onSelect?: (value: string, item: DropdownMenuItem) => void;
  align?: "start" | "end";
  disabled?: boolean;
  menuLabel?: string;
  menuRole?: "menu" | "listbox";
  selectedValue?: string;
  triggerId?: string;
  triggerClassName?: string;
  menuClassName?: string;
  triggerProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "disabled" | "type">;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  items,
  onSelect,
  align = "start",
  disabled,
  menuLabel,
  menuRole = "menu",
  selectedValue,
  triggerId,
  triggerClassName,
  menuClassName,
  triggerProps,
  className,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLSpanElement>(null);
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
    const selectedIndex = items.findIndex((item) => item.value === selectedValue && !item.disabled);
    const nextIndex = selectedIndex >= 0 ? selectedIndex : enabledItems[0]?.index;
    if (nextIndex !== undefined) itemRefs.current[nextIndex]?.focus();
  }, [enabledItems, items, open, selectedValue]);

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
    <span ref={rootRef} className={cx(styles.root, className)} {...rest}>
      <button
        {...triggerProps}
        id={triggerId}
        type="button"
        className={cx(styles.trigger, open && styles.open, triggerClassName)}
        aria-haspopup={menuRole}
        aria-expanded={open}
        aria-controls={menuId}
        disabled={disabled}
        onClick={() => setOpen((next) => !next)}
        onKeyDown={(event) => {
          triggerProps?.onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span>{label}</span>
        <span className={styles.chev} aria-hidden="true">v</span>
      </button>
      {open ? (
        <div
          id={menuId}
          role={menuRole}
          aria-label={menuLabel}
          className={cx(styles.menu, align === "end" && styles.end, menuClassName)}
        >
          {items.map((item, index) => {
            const selected = item.value === selectedValue;
            const itemRole = menuRole === "listbox" ? "option" : "menuitem";
            const itemClassName = cx(
              styles.item,
              item.destructive && styles.destructive,
              selected && styles.selected,
            );
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
                  role={itemRole}
                  aria-selected={menuRole === "listbox" ? selected : undefined}
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
                role={itemRole}
                aria-selected={menuRole === "listbox" ? selected : undefined}
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
    </span>
  );
};
