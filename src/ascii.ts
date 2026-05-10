import type { FontName } from "figlet";

export type BannerFontName = FontName;

type FigletModule = {
  parseFont: (name: string, font: string) => void;
  textSync: (text: string, options: { font: FontName }) => string;
};
type RuntimeRequire = (id: string) => unknown;

let figletModule: FigletModule | null | undefined;
let registered = false;

const loadFiglet = (): FigletModule | null => {
  if (figletModule !== undefined) return figletModule;

  try {
    const requireFromRuntime = Function(
      "return typeof require === 'function' ? require : undefined",
    )() as RuntimeRequire | undefined;

    if (!requireFromRuntime) {
      figletModule = null;
      return figletModule;
    }

    figletModule = requireFromRuntime("figlet") as FigletModule;
    return figletModule;
  } catch {
    figletModule = null;
    return figletModule;
  }
};

const registerFonts = (figlet: FigletModule) => {
  if (registered) return;
  try {
    const requireFromRuntime = Function(
      "return typeof require === 'function' ? require : undefined",
    )() as RuntimeRequire | undefined;
    const slantFont = requireFromRuntime?.("figlet/importable-fonts/Slant.js");
    const standardFont = requireFromRuntime?.("figlet/importable-fonts/Standard.js");

    if (slantFont) figlet.parseFont("Slant", slantFont as string);
    if (standardFont) figlet.parseFont("Standard", standardFont as string);
  } catch {
    /* noop */
  }
  registered = true;
};

const cache = new Map<string, string>();

export function bannerSync(
  text: string,
  font: FontName = "Slant"
): string {
  const key = `${font}::${text}`;
  if (cache.has(key)) return cache.get(key)!;

  const figlet = loadFiglet();
  if (!figlet) {
    cache.set(key, text);
    return text;
  }

  registerFonts(figlet);
  try {
    const out = figlet.textSync(text, { font });
    cache.set(key, out);
    return out;
  } catch {
    cache.set(key, text);
    return text;
  }
}
