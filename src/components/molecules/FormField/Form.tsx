import React from "react";
import styles from "./Form.module.scss";
import { cx } from "../../../utils/classNames";
import { Input, Textarea } from "../../atoms/Input";
import type { InputProps, TextareaProps } from "../../atoms/Input";
import { Select } from "../../atoms/Select";
import type { SelectOption, SelectProps } from "../../atoms/Select";
import { FormField } from "./FormField";

type FormFieldBase = {
  name: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  fieldClassName?: string;
};

export type FormFieldConfig =
  | (FormFieldBase & {
      type?: "input";
      inputProps?: Omit<InputProps, "id" | "name" | "label" | "helpText" | "error" | "rootProps">;
    })
  | (FormFieldBase & {
      type: "textarea";
      textareaProps?: Omit<TextareaProps, "id" | "name" | "label" | "helpText" | "error" | "rootProps">;
    })
  | (FormFieldBase & {
      type: "select";
      options: SelectOption[];
      selectProps?: Omit<SelectProps, "id" | "name" | "label" | "helpText" | "error" | "rootProps" | "options">;
    })
  | (FormFieldBase & {
      type: "custom";
      render: (field: FormFieldBase & { id: string }) => React.ReactNode;
    });

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  fields?: FormFieldConfig[];
  actions?: React.ReactNode;
  columns?: 1 | 2;
  bodyClassName?: string;
  actionsClassName?: string;
}

function renderFieldControl(field: FormFieldConfig, id: string): React.ReactNode {
  if (field.type === "textarea") {
    return (
      <Textarea
        {...field.textareaProps}
        id={id}
        name={field.name}
        state={field.error ? "error" : field.textareaProps?.state}
      />
    );
  }

  if (field.type === "select") {
    return (
      <Select
        {...field.selectProps}
        id={id}
        name={field.name}
        options={field.options}
      />
    );
  }

  if (field.type === "custom") {
    return field.render({ ...field, id });
  }

  return (
    <Input
      {...field.inputProps}
      id={id}
      name={field.name}
      state={field.error ? "error" : field.inputProps?.state}
    />
  );
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      title,
      description,
      fields,
      actions,
      columns = 1,
      className,
      bodyClassName,
      actionsClassName,
      children,
      ...rest
    },
    ref,
  ) => {
    const baseId = React.useId();
    const hasHeader = title !== undefined || description !== undefined;
    const hasBody = (fields && fields.length > 0) || children;

    return (
      <form ref={ref} className={cx(styles.form, className)} {...rest}>
        {hasHeader ? (
          <div className={styles.header}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {description ? <p className={styles.description}>{description}</p> : null}
          </div>
        ) : null}
        {hasBody ? (
          <div
            className={cx(styles.body, bodyClassName)}
            style={{ "--form-columns": columns } as React.CSSProperties}
          >
            {fields && fields.length > 0 ? (
              <div className={styles.grid}>
                {fields.map((field) => {
                  const id = `${baseId}-${field.name}`;
                  return (
                    <FormField
                      key={field.name}
                      className={field.fieldClassName}
                      htmlFor={id}
                      label={field.label}
                      hint={field.hint}
                      error={field.error}
                      required={field.required}
                    >
                      {renderFieldControl(field, id)}
                    </FormField>
                  );
                })}
              </div>
            ) : null}
            {children}
          </div>
        ) : null}
        {actions ? (
          <div className={cx(styles.actions, actionsClassName)}>{actions}</div>
        ) : null}
      </form>
    );
  },
);

Form.displayName = "Form";
