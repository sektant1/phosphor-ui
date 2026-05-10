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

export interface InputControlProps
  extends Omit<InputProps, "label" | "helpText" | "error" | "rootProps" | "state"> {}

export const InputControl = React.forwardRef<HTMLInputElement, InputControlProps>(
  (
    {
      prompt = "~/ $",
      cursor = false,
      className,
      inputClassName,
      id,
      type = "text",
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
      <span className={cx(styles.wrap, className)}>
        {prompt ? <span className={styles.prompt}>{prompt}</span> : null}
        <span className={styles.inputCell}>
          <input
            {...rest}
            ref={ref}
            id={id}
            type={type}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            className={cx(styles.input, cursor && styles.inputWithCursor, inputClassName)}
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
    );
  },
);
InputControl.displayName = "InputControl";

export const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helpText,
      error,
      className,
      rootProps,
      id,
      state = error ? "error" : "default",
      "aria-describedby": ariaDescribedBy,
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
        <InputControl
          {...rest}
          ref={ref}
          id={resolvedId}
          aria-invalid={state === "error" || undefined}
          aria-describedby={describedBy}
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

InputField.displayName = "InputField";

export const Input = InputField;
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

export interface TextareaControlProps
  extends Omit<TextareaProps, "label" | "helpText" | "error" | "rootProps" | "state"> {}

export const TextareaControl = React.forwardRef<HTMLTextAreaElement, TextareaControlProps>(
  (
    {
      className,
      textareaClassName,
      id,
      onChange,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <textarea
        {...rest}
        ref={ref}
        id={id}
        className={cx(styles.wrap, styles.textarea, textareaClassName, className)}
        onChange={(event) => {
          onChange?.(event);
          onValueChange?.(event.currentTarget.value, event);
        }}
      />
    );
  },
);
TextareaControl.displayName = "TextareaControl";

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helpText,
      error,
      className,
      rootProps,
      id,
      state = error ? "error" : "default",
      "aria-describedby": ariaDescribedBy,
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
        <TextareaControl
          {...rest}
          ref={ref}
          id={resolvedId}
          aria-invalid={state === "error" || undefined}
          aria-describedby={describedBy}
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

TextareaField.displayName = "TextareaField";

export const Textarea = TextareaField;
Textarea.displayName = "Textarea";
