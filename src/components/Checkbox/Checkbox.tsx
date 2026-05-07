import React from "react";
import styles from "./Checkbox.module.scss";
import { cx } from "../../utils/classNames";

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
  const inputId = React.useId();
  const resolvedId = id ?? inputId;
  const handleChange = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };
  const cls = cx(
    styles.row,
    value && styles.checkedRow,
    disabled && styles.disabledRow,
    className
  );
  const boxCls = cx(
    styles.cb,
    value && styles.checked,
    disabled && styles.disabled,
    error && styles.error
  );
  return (
    <label className={cls} htmlFor={resolvedId}>
      <input
        id={resolvedId}
        className={styles.native}
        type="checkbox"
        checked={value}
        disabled={disabled}
        aria-invalid={error || undefined}
        onChange={handleChange}
      />
      <span className={boxCls} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
