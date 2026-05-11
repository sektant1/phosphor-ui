import React from "react";
import styles from "./Select.module.scss";
import { cx } from "../../../utils/classNames";
import { DropdownMenu } from "../../atoms/DropdownMenu";
import type { DataAttributes } from "../../atoms/primitive";
import { hasVisibleContent } from "../../atoms/primitive";

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
      prompt = false,
      options,
      className,
      controlClassName,
      selectClassName,
      id,
      disabled,
      onChange,
      onValueChange,
      value,
      defaultValue,
      tabIndex,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...rest
    },
    ref,
  ) => {
    const nativeRef = React.useRef<HTMLSelectElement | null>(null);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      () => String(value ?? defaultValue ?? options.find((option) => !option.disabled)?.value ?? ""),
    );
    const generatedId = React.useId();
    const triggerId = id ?? generatedId;
    const selectedValue = String(value ?? uncontrolledValue);
    const selectedOption = options.find((option) => option.value === selectedValue);
    const promptLabel = prompt === true ? "select" : prompt;

    const setRefs = (node: HTMLSelectElement | null) => {
      nativeRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    React.useEffect(() => {
      if (value !== undefined) setUncontrolledValue(String(value));
    }, [value]);

    const commitValue = (nextValue: string) => {
      if (disabled) return;
      if (value === undefined) setUncontrolledValue(nextValue);

      const select = nativeRef.current;
      if (select) {
        const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value");
        descriptor?.set?.call(select, nextValue);
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    };

    return (
      <span className={cx(styles.control, controlClassName, className)}>
        <select
          ref={setRefs}
          className={cx(styles.nativeSelect, selectClassName)}
          disabled={disabled}
          tabIndex={-1}
          value={selectedValue}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          onChange={(event) => {
            setUncontrolledValue(event.currentTarget.value);
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
        <DropdownMenu
          className={styles.dropdown}
          triggerId={triggerId}
          triggerClassName={styles.trigger}
          menuClassName={styles.menu}
          label={(
            <>
              {hasVisibleContent(promptLabel) ? <span className={styles.prompt}>[{promptLabel}]</span> : null}
              <span className={styles.value}>{selectedOption?.label ?? selectedValue}</span>
            </>
          )}
          items={options}
          selectedValue={selectedValue}
          menuRole="listbox"
          menuLabel={typeof promptLabel === "string" ? promptLabel : undefined}
          disabled={disabled}
          onSelect={commitValue}
          triggerProps={{
            "aria-describedby": ariaDescribedBy,
            "aria-invalid": ariaInvalid,
            tabIndex,
          }}
        />
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
