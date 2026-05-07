import React from "react";
import styles from "./Select.module.scss";
import { cx } from "../../utils/classNames";

export interface SelectOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: React.ReactNode;
  prompt?: React.ReactNode;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, prompt = "select", options, className, id, ...rest }, ref) => {
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;

    return (
      <label className={cx(styles.root, className)} htmlFor={resolvedId}>
        {label ? <span className={styles.label}>{label}</span> : null}
        <span className={styles.control}>
          {prompt ? <span className={styles.prompt}>{prompt}</span> : null}
          <select ref={ref} id={resolvedId} className={styles.select} {...rest}>
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.chev} aria-hidden="true">v</span>
        </span>
      </label>
    );
  },
);
Select.displayName = "Select";
