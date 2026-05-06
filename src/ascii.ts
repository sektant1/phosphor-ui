import figlet from "figlet";
import slantFont from "figlet/importable-fonts/Slant.js";
import standardFont from "figlet/importable-fonts/Standard.js";

let registered = false;
const registerFonts = () => {
  if (registered) return;
  try {
    figlet.parseFont("Slant", slantFont);
    figlet.parseFont("Standard", standardFont);
  } catch {
    /* noop */
  }
  registered = true;
};

const cache = new Map<string, string>();

export function bannerSync(
  text: string,
  font: figlet.FontName = "Slant"
): string {
  const key = `${font}::${text}`;
  if (cache.has(key)) return cache.get(key)!;
  registerFonts();
  try {
    const out = figlet.textSync(text, { font });
    cache.set(key, out);
    return out;
  } catch {
    cache.set(key, text);
    return text;
  }
}
