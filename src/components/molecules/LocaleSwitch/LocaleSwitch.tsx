import React from "react";
import styles from "./LocaleSwitch.module.scss";
import { cx } from "../../../utils/classNames";

export interface LocaleSwitchItem {
  code: string;
  label: React.ReactNode;
  href: string;
  active?: boolean;
}

export type LocaleSwitchVariant = "inline" | "segmented" | "terminal";
export type LocaleSwitchSize = "sm" | "md";

export interface LocaleSwitchProps extends React.HTMLAttributes<HTMLElement> {
  locales: LocaleSwitchItem[];
  ariaLabel?: string;
  variant?: LocaleSwitchVariant;
  size?: LocaleSwitchSize;
  showPrompt?: boolean;
}

const variantClass: Record<LocaleSwitchVariant, string> = {
  inline: styles.inline,
  segmented: styles.segmented,
  terminal: styles.terminal,
};

export const LocaleSwitch = React.forwardRef<HTMLElement, LocaleSwitchProps>(
  (
    {
      locales,
      ariaLabel = "language",
      variant = "segmented",
      size = "md",
      showPrompt,
      className,
      ...rest
    },
    ref,
  ) => {
    if (locales.length < 2) {
      return null;
    }

    const withPrompt = showPrompt ?? variant === "terminal";

    return (
      <nav
        ref={ref}
        className={cx(
          styles.switcher,
          variantClass[variant],
          size === "sm" && styles.sm,
          className,
        )}
        aria-label={ariaLabel}
        {...rest}
      >
        {withPrompt ? (
          <span className={styles.prompt} aria-hidden="true">
            $ band
          </span>
        ) : null}
        <ul className={styles.list}>
          {locales.map((locale) => (
            <li key={locale.code} className={styles.item}>
              <a
                className={cx(styles.link, locale.active && styles.active)}
                href={locale.href}
                hrefLang={locale.code}
                aria-current={locale.active ? "true" : undefined}
              >
                <span className={styles.code}>{locale.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  },
);

LocaleSwitch.displayName = "LocaleSwitch";
