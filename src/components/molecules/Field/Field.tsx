import React from "react";
import styles from "./Field.module.scss";
import { cx } from "../../../utils/classNames";
import { hasVisibleContent } from "../../atoms/primitive";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
  controlClassName?: string;
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  children,
  required,
  className,
  ...rest
}) => (
  <div className={styles.labelRow}>
    <label className={cx(styles.label, className)} {...rest}>
      {children}
    </label>
    {required ? (
      <span className={styles.required} aria-hidden="true">
        required
      </span>
    ) : null}
  </div>
);

export interface FieldHintProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const FieldHint: React.FC<FieldHintProps> = ({
  className,
  ...rest
}) => <span className={cx(styles.hint, className)} {...rest} />;

export interface FieldErrorProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const FieldError: React.FC<FieldErrorProps> = ({
  className,
  children,
  ...rest
}) => (
  <span className={cx(styles.error, className)} {...rest}>
    [!] {children}
  </span>
);

export interface ControlFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
}

export const ControlFrame: React.FC<ControlFrameProps> = ({
  invalid,
  className,
  ...rest
}) => (
  <div
    className={cx(styles.control, invalid && styles.controlError, className)}
    {...rest}
  />
);

export const Field: React.FC<FieldProps> = ({
  label,
  hint,
  error,
  required,
  htmlFor,
  className,
  controlClassName,
  children,
  ...rest
}) => (
  <div className={cx(styles.field, className)} {...rest}>
    {hasVisibleContent(label) ? (
      <FieldLabel htmlFor={htmlFor} required={required}>
        {label}
      </FieldLabel>
    ) : null}
    <ControlFrame invalid={hasVisibleContent(error)} className={controlClassName}>
      {children}
    </ControlFrame>
    {hasVisibleContent(error) ? (
      <FieldError>{error}</FieldError>
    ) : hasVisibleContent(hint) ? (
      <FieldHint>{hint}</FieldHint>
    ) : null}
  </div>
);
