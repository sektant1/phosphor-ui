import React from "react";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  id?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  disabled,
  error,
  label,
  onChange,
  id,
  className,
}) => {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const value = isControlled ? !!checked : internal;
  const toggle = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };
  const cls = [
    styles.row,
    value ? styles.checkedRow : "",
    disabled ? styles.disabledRow : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const boxCls = [
    styles.cb,
    value ? styles.checked : "",
    disabled ? styles.disabled : "",
    error ? styles.error : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <label className={cls} htmlFor={id}>
      <span
        className={boxCls}
        role="checkbox"
        aria-checked={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
          }
        }}
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
