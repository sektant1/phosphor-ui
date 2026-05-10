import React from "react";
import styles from "./Checkbox.module.scss";
import { cx } from "../../../utils/classNames";
import { hasVisibleContent } from "../primitive";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  strikethrough?: boolean;
  onCheckedChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (checked: boolean) => void;
}

export interface CheckboxControlProps
  extends Omit<CheckboxProps, "label" | "description" | "strikethrough" | "children"> {}

export const CheckboxControl = React.forwardRef<HTMLInputElement, CheckboxControlProps>(
  (
    {
      checked,
      defaultChecked,
      disabled,
      error,
      onChange,
      onCheckedChange,
      id,
      className,
      ...rest
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const value = isControlled ? checked : internalChecked;
    const boxCls = cx(
      styles.cb,
      value && styles.checked,
      disabled && styles.disabled,
      error && styles.error,
    );

    return (
      <span className={cx(styles.control, className)}>
        <input
          {...rest}
          ref={ref}
          id={id}
          className={styles.native}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-invalid={error || undefined}
          onChange={(event) => {
            const next = event.currentTarget.checked;
            if (!isControlled) setInternalChecked(next);
            onChange?.(next);
            onCheckedChange?.(next, event);
          }}
        />
        <span className={boxCls} aria-hidden="true" />
      </span>
    );
  },
);

CheckboxControl.displayName = "CheckboxControl";

export const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      disabled,
      error,
      label,
      description,
      strikethrough = true,
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
      value && strikethrough && styles.strikethroughRow,
      error && styles.errorRow,
      disabled && styles.disabledRow,
      className,
    );

    return (
      <label className={cls} htmlFor={resolvedId}>
        <CheckboxControl
          {...rest}
          ref={ref}
          id={resolvedId}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          error={error}
          aria-describedby={describedBy}
          onChange={(next) => {
            if (!isControlled) setInternalChecked(next);
            onChange?.(next);
          }}
          onCheckedChange={(next, event) => {
            onCheckedChange?.(next, event);
          }}
        />
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

CheckboxField.displayName = "CheckboxField";

export const Checkbox = CheckboxField;
Checkbox.displayName = "Checkbox";
