"use client";

import React from "react";
import { Button } from "../../atoms/Button";
import type { ButtonSize, ButtonVariant } from "../../atoms/Button";
import { cx } from "../../../utils/classNames";
import styles from "./Theme.module.scss";
import type { SlotClassNames } from "../../../types/slots";
import {
  getInitialThemeScript,
  PHOSPHOR_THEMES,
  PHOSPHOR_THEME_STORAGE_KEY,
  type InitialThemeScriptOptions,
  type PhosphorTheme,
} from "./ThemeScript";

export type ThemeToggleSlot = "root" | "indicator" | "label";
export { getInitialThemeScript, PHOSPHOR_THEMES, PHOSPHOR_THEME_STORAGE_KEY };
export type { InitialThemeScriptOptions, PhosphorTheme };

export interface ThemeContextValue {
  theme: PhosphorTheme;
  setTheme: (theme: PhosphorTheme) => void;
  toggleTheme: () => void;
  mounted: boolean;
  themes: readonly PhosphorTheme[];
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  themes?: readonly PhosphorTheme[];
  defaultTheme?: PhosphorTheme;
  storageKey?: string;
  attributeTarget?: HTMLElement | null;
  switchingAttribute?: string;
  switchingDurationMs?: number;
  value?: PhosphorTheme;
  onChange?: (theme: PhosphorTheme) => void;
}

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> {
  labels?: Partial<Record<PhosphorTheme, React.ReactNode>>;
  themes?: readonly PhosphorTheme[];
  slotClassNames?: SlotClassNames<ThemeToggleSlot>;
  shape?: "dot" | "switch" | "chip";
  showLabel?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function normalizeThemes(themes: readonly PhosphorTheme[] | undefined) {
  return themes?.length ? themes : PHOSPHOR_THEMES;
}

function isTheme(value: string | null | undefined, themes: readonly PhosphorTheme[] = PHOSPHOR_THEMES): value is PhosphorTheme {
  return (themes as readonly string[]).includes(value ?? "");
}

function getTarget(explicitTarget?: HTMLElement | null) {
  if (explicitTarget) return explicitTarget;
  if (typeof document === "undefined") return null;
  return document.documentElement;
}

function getStoredTheme(storageKey: string, themes: readonly PhosphorTheme[]) {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(storageKey);
    return isTheme(stored, themes) ? stored : null;
  } catch {
    return null;
  }
}

function persistTheme(storageKey: string, theme: PhosphorTheme) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // Storage can be unavailable in private or embedded contexts.
  }
}

function applyTheme(target: HTMLElement | null, theme: PhosphorTheme) {
  if (!target) return;
  target.dataset.theme = theme;
}

export function ThemeProvider({
  children,
  themes,
  defaultTheme = "phosphor",
  storageKey = PHOSPHOR_THEME_STORAGE_KEY,
  attributeTarget,
  switchingAttribute,
  switchingDurationMs = 360,
  value,
  onChange,
}: ThemeProviderProps) {
  const allowedThemes = React.useMemo(() => normalizeThemes(themes), [themes]);
  const safeDefault = isTheme(defaultTheme, allowedThemes) ? defaultTheme : allowedThemes[0];
  const controlled = value !== undefined;
  const [themeState, setThemeState] = React.useState<PhosphorTheme>(safeDefault);
  const [mounted, setMounted] = React.useState(false);
  const theme = isTheme(value ?? themeState, allowedThemes) ? (value ?? themeState) : safeDefault;

  React.useEffect(() => {
    const target = getTarget(attributeTarget);
    const stored = controlled ? null : getStoredTheme(storageKey, allowedThemes);
    const nextTheme = isTheme(value, allowedThemes) ? value : stored ?? safeDefault;

    if (!controlled) {
      setThemeState(nextTheme);
    }

    applyTheme(target, nextTheme);
    setMounted(true);
  }, [allowedThemes, attributeTarget, controlled, safeDefault, storageKey, value]);

  const setTheme = React.useCallback(
    (nextTheme: PhosphorTheme) => {
      if (!isTheme(nextTheme, allowedThemes)) return;
      const target = getTarget(attributeTarget);
      if (!controlled) {
        setThemeState(nextTheme);
      }

      if (switchingAttribute && target) {
        target.setAttribute(switchingAttribute, "true");
        window.setTimeout(() => target.removeAttribute(switchingAttribute), switchingDurationMs);
      }

      applyTheme(target, nextTheme);
      persistTheme(storageKey, nextTheme);
      onChange?.(nextTheme);
    },
    [allowedThemes, attributeTarget, controlled, onChange, storageKey, switchingAttribute, switchingDurationMs],
  );

  const toggleTheme = React.useCallback(() => {
    const currentIndex = allowedThemes.indexOf(theme);
    const nextTheme = allowedThemes[(currentIndex + 1) % allowedThemes.length];
    setTheme(nextTheme);
  }, [allowedThemes, setTheme, theme]);

  const context = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme, mounted, themes: allowedThemes }),
    [allowedThemes, mounted, setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

export function ThemeToggle({
  labels = { phosphor: "phosphor", amber: "amber", cyan: "cyan", red: "red" },
  themes,
  slotClassNames,
  shape = "dot",
  showLabel = true,
  className,
  variant = "ghost",
  size = "sm",
  style,
  "aria-label": ariaLabel,
  ...props
}: ThemeToggleProps) {
  const context = useTheme();
  const allowedThemes = normalizeThemes(themes ?? context.themes);
  const theme = isTheme(context.theme, allowedThemes) ? context.theme : allowedThemes[0];
  const activeIndex = Math.max(allowedThemes.indexOf(theme), 0);
  const nextTheme = allowedThemes[(activeIndex + 1) % allowedThemes.length];

  // Drive the switch thumb position from the active theme index instead of
  // hard-coded per-theme offsets, so any number of themes spaces evenly.
  const switchStyle =
    shape === "switch"
      ? ({
          "--pho-theme-toggle-index": activeIndex,
          "--pho-theme-toggle-count": allowedThemes.length,
        } as React.CSSProperties)
      : undefined;

  return (
    <Button
      {...props}
      className={cx(
        styles.toggle,
        styles[`shape-${shape}`],
        styles[`size-${size}`],
        slotClassNames?.root,
        className,
      )}
      style={{ ...switchStyle, ...style }}
      variant={variant}
      size={size}
      type="button"
      pressed={theme !== "phosphor"}
      data-pho-component="ThemeToggle"
      data-pho-slot="root"
      data-pho-shape={shape}
      data-pho-size={size}
      data-theme-toggle={theme}
      aria-label={ariaLabel ?? `Switch to ${nextTheme} theme`}
      onClick={() => context.setTheme(nextTheme)}
    >
      <span className={cx(styles.indicator, slotClassNames?.indicator)} aria-hidden="true" data-pho-slot="indicator" />
      {showLabel ? (
        <span className={cx(styles.label, slotClassNames?.label)} suppressHydrationWarning data-pho-slot="label">
          {context.mounted ? (labels[theme] ?? theme) : (labels[allowedThemes[0]] ?? allowedThemes[0])}
        </span>
      ) : null}
    </Button>
  );
}
