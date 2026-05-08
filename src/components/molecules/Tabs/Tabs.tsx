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
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "tabs",
  className,
}) => {
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

    const dir = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (dir === 0) return;
    event.preventDefault();
    const next = enabled[(current + dir + enabled.length) % enabled.length];
    setSelected(next.id);
  };

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.list} role="tablist" aria-label={ariaLabel} onKeyDown={handleKeyDown}>
        {items.map((item) => {
          const active = item.id === selectedItem?.id;
          return (
            <button
              key={item.id}
              id={`${item.id}-tab`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${item.id}-panel`}
              disabled={item.disabled}
              tabIndex={active ? 0 : -1}
              className={cx(styles.tab, active && styles.active)}
              onClick={() => setSelected(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {selectedItem ? (
        <div
          id={`${selectedItem.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${selectedItem.id}-tab`}
          className={styles.panel}
        >
          {selectedItem.content}
        </div>
      ) : null}
    </div>
  );
};
