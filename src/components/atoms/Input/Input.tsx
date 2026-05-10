import React from "react";
import styles from "./Input.module.scss";
import { cx } from "../../../utils/classNames";
import type { DataAttributes } from "../primitive";
import { hasVisibleContent } from "../primitive";

type FieldState = "default" | "error" | "success";
const cursorRevealKeys = new Set(["Backspace", "Delete", "Enter"]);

function shouldRevealCursor(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.metaKey || event.ctrlKey || event.altKey) return false;
  return event.key.length === 1 || cursorRevealKeys.has(event.key);
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  prompt?: string;
  cursor?: boolean;
  state?: FieldState;
  inputClassName?: string;
  rootProps?: React.HTMLAttributes<HTMLLabelElement> & DataAttributes;
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helpText,
      error,
      prompt = "~/ $",
      cursor = false,
      className,
      inputClassName,
      rootProps,
      id,
      type = "text",
      state = error ? "error" : "default",
      "aria-describedby": ariaDescribedBy,
      disabled,
      readOnly,
      value,
      defaultValue,
      onKeyDown,
      onBlur,
      onChange,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    const cursorTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [cursorVisible, setCursorVisible] = React.useState(false);
    const [localValue, setLocalValue] = React.useState(() =>
      defaultValue === undefined ? "" : String(defaultValue),
    );
    const rawVisibleValue = value === undefined ? localValue : String(value);
    const visibleValue =
      type === "password" ? "•".repeat(rawVisibleValue.length) : rawVisibleValue;
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;
    const helpId = `${resolvedId}-help`;
    const errorId = `${resolvedId}-error`;
    const describedBy =
      [
        ariaDescribedBy,
        hasVisibleContent(helpText) ? helpId : undefined,
        hasVisibleContent(error) ? errorId : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined;
    const revealCursor = React.useCallback(() => {
      if (!cursor || disabled || readOnly) return;
      setCursorVisible(true);
      if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
      cursorTimeoutRef.current = setTimeout(() => {
        setCursorVisible(false);
        cursorTimeoutRef.current = null;
      }, 900);
    }, [cursor, disabled, readOnly]);

    React.useEffect(
      () => () => {
        if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
      },
      [],
    );

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
        {hasVisibleContent(label) ? (
          <span className={styles.label}>{label}</span>
        ) : null}
        <span className={styles.wrap}>
          {prompt ? <span className={styles.prompt}>{prompt}</span> : null}
          <span className={styles.inputCell}>
            <input
              {...rest}
              ref={ref}
              id={resolvedId}
              type={type}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              readOnly={readOnly}
              className={cx(styles.input, cursor && styles.inputWithCursor, inputClassName)}
              aria-invalid={state === "error" || undefined}
              aria-describedby={describedBy}
              onKeyDown={(event) => {
                if (shouldRevealCursor(event)) revealCursor();
                onKeyDown?.(event);
              }}
              onBlur={(event) => {
                if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
                cursorTimeoutRef.current = null;
                setCursorVisible(false);
                onBlur?.(event);
              }}
              onChange={(event) => {
                setLocalValue(event.currentTarget.value);
                revealCursor();
                onChange?.(event);
                onValueChange?.(event.currentTarget.value, event);
              }}
            />
            {cursor ? (
              <span
                className={cx(styles.cursorLayer, cursorVisible && styles.cursorLayerActive)}
                aria-hidden="true"
              >
                <span className={styles.cursorMirror}>{visibleValue || "\u00a0"}</span>
                <span className={styles.cursor}>▮</span>
              </span>
            ) : null}
          </span>
        </span>
        {hasVisibleContent(helpText) ? (
          <span id={helpId} className={styles.help}>
            {helpText}
          </span>
        ) : null}
        {hasVisibleContent(error) ? (
          <span id={errorId} className={styles.error}>
            {error}
          </span>
        ) : null}
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
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
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
    const describedBy =
      [
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
        {hasVisibleContent(label) ? (
          <span className={styles.label}>{label}</span>
        ) : null}
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
        {hasVisibleContent(helpText) ? (
          <span id={helpId} className={styles.help}>
            {helpText}
          </span>
        ) : null}
        {hasVisibleContent(error) ? (
          <span id={errorId} className={styles.error}>
            {error}
          </span>
        ) : null}
      </label>
    );
  },
);
Textarea.displayName = "Textarea";
