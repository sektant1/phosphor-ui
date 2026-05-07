import React from "react";
import styles from "./Switch.module.scss";
import { cx } from "../../utils/classNames";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      checked,
      defaultChecked,
      disabled,
      className,
      id,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;

    return (
      <label className={cx(styles.root, disabled && styles.disabled, className)} htmlFor={resolvedId}>
        <input
          {...rest}
          ref={ref}
          id={resolvedId}
          type="checkbox"
          role="switch"
          className={styles.native}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.currentTarget.checked, event)}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        {label ? <span className={styles.label}>{label}</span> : null}
      </label>
    );
  },
);
Switch.displayName = "Switch";
