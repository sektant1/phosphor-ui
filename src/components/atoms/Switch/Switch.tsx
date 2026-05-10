import React from "react";
import styles from "./Switch.module.scss";
import { cx } from "../../../utils/classNames";
import { hasVisibleContent } from "../primitive";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SwitchControlProps
  extends Omit<SwitchProps, "label" | "description" | "children"> {}

export const SwitchControl = React.forwardRef<HTMLInputElement, SwitchControlProps>(
  (
    {
      checked,
      defaultChecked,
      disabled,
      className,
      id,
      onChange,
      onCheckedChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <span className={cx(styles.control, disabled && styles.disabled, className)}>
        <input
          {...rest}
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className={styles.native}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(event) => {
            onChange?.(event.currentTarget.checked, event);
            onCheckedChange?.(event.currentTarget.checked, event);
          }}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={cx(styles.state, styles.stateOff)}>off</span>
          <span className={cx(styles.state, styles.stateOn)}>on</span>
          <span className={styles.thumb} />
        </span>
      </span>
    );
  },
);

SwitchControl.displayName = "SwitchControl";

export const SwitchField = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      checked,
      defaultChecked,
      disabled,
      className,
      id,
      onChange,
      onCheckedChange,
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

    return (
      <label
        className={cx(
          styles.root,
          value && styles.checkedField,
          disabled && styles.disabled,
          className,
        )}
        htmlFor={resolvedId}
      >
        <SwitchControl
          {...rest}
          ref={ref}
          id={resolvedId}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-describedby={describedBy}
          onChange={(next, event) => {
            if (!isControlled) setInternalChecked(next);
            onChange?.(next, event);
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

SwitchField.displayName = "SwitchField";

export const Switch = SwitchField;
Switch.displayName = "Switch";
