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

export interface SelectControlProps
  extends Omit<SelectProps, "label" | "helpText" | "error" | "rootProps"> {}

export const SelectControl = React.forwardRef<HTMLSelectElement, SelectControlProps>(
  (
    {
      prompt = "select",
      options,
      className,
      controlClassName,
      selectClassName,
      id,
      disabled,
      onChange,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <span className={cx(styles.control, controlClassName, className)}>
        {hasVisibleContent(prompt) ? <span className={styles.prompt}>[{prompt}]</span> : null}
        <select
          ref={ref}
          id={id}
          className={cx(styles.select, selectClassName)}
          disabled={disabled}
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
        <span className={styles.chev} aria-hidden="true" />
      </span>
    );
  },
);
SelectControl.displayName = "SelectControl";

export const SelectField = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helpText,
      error,
      className,
      rootProps,
      id,
      disabled,
      "aria-describedby": ariaDescribedBy,
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
          disabled && styles.disabledField,
          rootProps?.className,
          className,
        )}
        htmlFor={resolvedId}
      >
        {hasVisibleContent(label) ? <span className={styles.label}>{label}</span> : null}
        <SelectControl
          {...rest}
          ref={ref}
          id={resolvedId}
          disabled={disabled}
          aria-invalid={hasVisibleContent(error) || undefined}
          aria-describedby={describedBy}
        />
        {hasVisibleContent(helpText) ? <span id={helpId} className={styles.help}>{helpText}</span> : null}
        {hasVisibleContent(error) ? <span id={errorId} className={styles.error}>{error}</span> : null}
      </label>
    );
  },
);

SelectField.displayName = "SelectField";

export const Select = SelectField;
Select.displayName = "Select";
