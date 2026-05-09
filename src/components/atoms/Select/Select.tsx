import React from "react";
import styles from "./Select.module.scss";
import { cx } from "../../../utils/classNames";
import type { DataAttributes } from "../primitive";
import { hasVisibleContent } from "../primitive";

export interface SelectOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  prompt?: React.ReactNode;
  options: SelectOption[];
  controlClassName?: string;
  selectClassName?: string;
  rootProps?: React.HTMLAttributes<HTMLLabelElement> & DataAttributes;
  onValueChange?: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helpText,
      error,
      prompt = "select",
      options,
      className,
      controlClassName,
      selectClassName,
      rootProps,
      id,
      "aria-describedby": ariaDescribedBy,
      onChange,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;
    const helpId = `${resolvedId}-help`;
    const errorId = `${resolvedId}-error`;
    const describedBy = [
      ariaDescribedBy,
      hasVisibleContent(helpText) ? helpId : undefined,
      hasVisibleContent(error) ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <label
        {...rootProps}
        className={cx(
          styles.root,
          hasVisibleContent(error) && styles.errorField,
          rootProps?.className,
          className,
        )}
        htmlFor={resolvedId}
      >
        {hasVisibleContent(label) ? <span className={styles.label}>{label}</span> : null}
        <span className={cx(styles.control, controlClassName)}>
          {hasVisibleContent(prompt) ? <span className={styles.prompt}>{prompt}</span> : null}
          <select
            ref={ref}
            id={resolvedId}
            className={cx(styles.select, selectClassName)}
            aria-invalid={hasVisibleContent(error) || undefined}
            aria-describedby={describedBy}
            onChange={(event) => {
              onChange?.(event);
              onValueChange?.(event.currentTarget.value, event);
            }}
            {...rest}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.chev} aria-hidden="true">v</span>
        </span>
        {hasVisibleContent(helpText) ? <span id={helpId} className={styles.help}>{helpText}</span> : null}
        {hasVisibleContent(error) ? <span id={errorId} className={styles.error}>{error}</span> : null}
      </label>
    );
  },
);
Select.displayName = "Select";
