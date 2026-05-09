import React from "react";
import styles from "./Tabs.module.scss";
import { cx } from "../../../utils/classNames";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  orientation?: "horizontal" | "vertical";
  lazy?: boolean;
  className?: string;
  listClassName?: string;
  tabClassName?: string;
  panelClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "tabs",
  orientation = "horizontal",
  lazy = true,
  className,
  listClassName,
  tabClassName,
  panelClassName,
}) => {
  const baseId = React.useId();
  const firstEnabled = items.find((item) => !item.disabled)?.id;
  const [internal, setInternal] = React.useState(defaultValue ?? firstEnabled ?? "");
  const selected = value ?? internal;
  const selectedItem = items.find((item) => item.id === selected && !item.disabled) ?? items.find((item) => !item.disabled);

  const setSelected = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.filter((item) => !item.disabled);
    const current = enabled.findIndex((item) => item.id === selectedItem?.id);
    if (current < 0) return;

    const forwardKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    const backKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const dir = event.key === forwardKey ? 1 : event.key === backKey ? -1 : 0;
    if (dir === 0) return;
    event.preventDefault();
    const next = enabled[(current + dir + enabled.length) % enabled.length];
    setSelected(next.id);
  };

  return (
    <div className={cx(styles.root, className)}>
      <div
        className={cx(styles.list, orientation === "vertical" && styles.vertical, listClassName)}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const active = item.id === selectedItem?.id;
          const tabId = `${baseId}-${item.id}-tab`;
          const panelId = `${baseId}-${item.id}-panel`;
          return (
            <button
              key={item.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={panelId}
              disabled={item.disabled}
              tabIndex={active ? 0 : -1}
              className={cx(styles.tab, active && styles.active, tabClassName)}
              onClick={() => setSelected(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const active = item.id === selectedItem?.id;
        if (lazy && !active) return null;
        return (
          <div
            key={item.id}
            id={`${baseId}-${item.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-${item.id}-tab`}
            className={cx(styles.panel, panelClassName)}
            hidden={!active}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
