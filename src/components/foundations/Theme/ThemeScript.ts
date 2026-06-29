export type PhosphorTheme = "phosphor" | "amber" | "cyan" | "red";

export const PHOSPHOR_THEMES = ["phosphor", "amber", "cyan", "red"] as const;
export const PHOSPHOR_THEME_STORAGE_KEY = "phosphor-theme";

export interface InitialThemeScriptOptions {
  storageKey?: string;
  themes?: readonly PhosphorTheme[];
  defaultTheme?: PhosphorTheme;
  attribute?: string;
}

function normalizeThemeList(themes: readonly PhosphorTheme[] | undefined) {
  return themes?.length ? themes : PHOSPHOR_THEMES;
}

function isAllowedTheme(
  value: string | null | undefined,
  themes: readonly PhosphorTheme[] = PHOSPHOR_THEMES,
): value is PhosphorTheme {
  return (themes as readonly string[]).includes(value ?? "");
}

export function getInitialThemeScript(options?: string | InitialThemeScriptOptions) {
  const opts = typeof options === "string" ? { storageKey: options } : options;
  const allowedThemes = normalizeThemeList(opts?.themes);
  const defaultTheme = isAllowedTheme(opts?.defaultTheme, allowedThemes)
    ? opts.defaultTheme
    : allowedThemes[0];
  const key = JSON.stringify(opts?.storageKey ?? PHOSPHOR_THEME_STORAGE_KEY);
  const themes = JSON.stringify(allowedThemes);
  const attribute = JSON.stringify(opts?.attribute ?? "data-theme");
  const fallback = JSON.stringify(defaultTheme);

  return `(function(){try{var k=${key};var T=${themes};var a=${attribute};var t=localStorage.getItem(k);if(T.indexOf(t)===-1)t=${fallback};document.documentElement.setAttribute(a,t);}catch(e){document.documentElement.setAttribute(${attribute},${fallback});}})();`;
}
