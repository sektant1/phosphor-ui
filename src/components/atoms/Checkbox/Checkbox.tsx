import React from "react";
import styles from "./Checkbox.module.scss";
import { cx } from "../../../utils/classNames";
import { hasVisibleContent } from "../primitive";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  onCheckedChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      disabled,
      error,
      label,
      description,
      onChange,
      onCheckedChange,
      id,
      className,
      children,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const value = isControlled ? checked : internalChecked;
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;
    const descriptionId = `${resolvedId}-description`;
    const visibleLabel = hasVisibleContent(label) ? label : children;
    const describedBy = [
      ariaDescribedBy,
      hasVisibleContent(description) ? descriptionId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;
    const cls = cx(
      styles.row,
      value && styles.checkedRow,
      disabled && styles.disabledRow,
      className,
    );
    const boxCls = cx(
      styles.cb,
      value && styles.checked,
      disabled && styles.disabled,
      error && styles.error,
    );

    return (
      <label className={cls} htmlFor={resolvedId}>
        <input
          {...rest}
          ref={ref}
          id={resolvedId}
          className={styles.native}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          onChange={(event) => {
            const next = event.currentTarget.checked;
            if (!isControlled) setInternalChecked(next);
            onChange?.(next);
            onCheckedChange?.(next, event);
          }}
        />
        <span className={boxCls} aria-hidden="true" />
        <span className={styles.text}>
          {hasVisibleContent(visibleLabel) ? <span className={styles.label}>{visibleLabel}</span> : null}
          {hasVisibleContent(description) ? (
            <span id={descriptionId} className={styles.description}>{description}</span>
          ) : null}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
