import React from "react";
import styles from "./Input.module.scss";
import { cx } from "../../../utils/classNames";
import type { DataAttributes } from "../primitive";
import { hasVisibleContent } from "../primitive";

type FieldState = "default" | "error" | "success";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  prompt?: string;
  cursor?: boolean;
  state?: FieldState;
  inputClassName?: string;
  rootProps?: React.HTMLAttributes<HTMLLabelElement> & DataAttributes;
  onValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helpText,
      error,
      prompt = "~/zone-net $",
      cursor = true,
      className,
      inputClassName,
      rootProps,
      id,
      type = "text",
      state = error ? "error" : "default",
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
          styles.field,
          state === "error" && styles.errorField,
          state === "success" && styles.successField,
          rootProps?.className,
          className,
        )}
        htmlFor={resolvedId}
      >
        {hasVisibleContent(label) ? <span className={styles.label}>{label}</span> : null}
        <span className={styles.wrap}>
          {prompt ? <span className={styles.prompt}>{prompt}</span> : null}
          <input
            {...rest}
            ref={ref}
            id={resolvedId}
            type={type}
            className={cx(styles.input, inputClassName)}
            aria-invalid={state === "error" || undefined}
            aria-describedby={describedBy}
            onChange={(event) => {
              onChange?.(event);
              onValueChange?.(event.currentTarget.value, event);
            }}
          />
          {cursor ? <span className={styles.cursor}>▮</span> : null}
        </span>
        {hasVisibleContent(helpText) ? <span id={helpId} className={styles.help}>{helpText}</span> : null}
        {hasVisibleContent(error) ? <span id={errorId} className={styles.error}>{error}</span> : null}
      </label>
    );
  },
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  state?: FieldState;
  textareaClassName?: string;
  rootProps?: React.HTMLAttributes<HTMLLabelElement> & DataAttributes;
  onValueChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helpText,
      error,
      className,
      textareaClassName,
      rootProps,
      id,
      state = error ? "error" : "default",
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
          styles.field,
          state === "error" && styles.errorField,
          state === "success" && styles.successField,
          rootProps?.className,
          className,
        )}
        htmlFor={resolvedId}
      >
        {hasVisibleContent(label) ? <span className={styles.label}>{label}</span> : null}
        <textarea
          {...rest}
          ref={ref}
          id={resolvedId}
          className={cx(styles.wrap, styles.textarea, textareaClassName)}
          aria-invalid={state === "error" || undefined}
          aria-describedby={describedBy}
          onChange={(event) => {
            onChange?.(event);
            onValueChange?.(event.currentTarget.value, event);
          }}
        />
        {hasVisibleContent(helpText) ? <span id={helpId} className={styles.help}>{helpText}</span> : null}
        {hasVisibleContent(error) ? <span id={errorId} className={styles.error}>{error}</span> : null}
      </label>
    );
  },
);
Textarea.displayName = "Textarea";
