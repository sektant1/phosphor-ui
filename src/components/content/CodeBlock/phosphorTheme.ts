import type { ThemeRegistration } from "shiki";

export type CodeBlockThemeName = "phosphor" | "amber";

type CodePalette = {
  name: CodeBlockThemeName;
  bg: string;
  fg: string;
  selection: string;
  lineHighlight: string;
  keyword: string;
  string: string;
  number: string;
  fn: string;
  variable: string;
  type: string;
  operator: string;
  comment: string;
  punct: string;
  tag: string;
  attr: string;
  builtin: string;
  invalid: string;
};

export const phosphorCodePalette: CodePalette = {
  name: "phosphor",
  bg: "#03110a",
  fg: "#d8ffe7",
  selection: "#1fb85440",
  lineHighlight: "#071c0f",
  keyword: "#62ff9a",
  string: "#00d4b5",
  number: "#aaff66",
  fn: "#b6ffce",
  variable: "#d6ffe2",
  type: "#5cf5d4",
  operator: "#b6ffce",
  comment: "#3a7a52",
  punct: "#4d8a6e",
  tag: "#62ff9a",
  attr: "#aaff66",
  builtin: "#5cf5d4",
  invalid: "#ff5555",
};

export const amberCodePalette: CodePalette = {
  name: "amber",
  bg: "#090602",
  fg: "#ffe4a3",
  selection: "#cc7a0040",
  lineHighlight: "#140d04",
  keyword: "#ffbf33",
  string: "#ffd166",
  number: "#ffe08a",
  fn: "#ffecb3",
  variable: "#ffe4a3",
  type: "#ffcf66",
  operator: "#ffecb3",
  comment: "#8a5c17",
  punct: "#996000",
  tag: "#ffbf33",
  attr: "#ffd166",
  builtin: "#ffcf66",
  invalid: "#ff6a6a",
};

const createCodeTheme = (palette: CodePalette): ThemeRegistration => ({
  name: palette.name,
  type: "dark",
  bg: palette.bg,
  fg: palette.fg,
  colors: {
    "editor.background": palette.bg,
    "editor.foreground": palette.fg,
    "editor.selectionBackground": palette.selection,
    "editor.lineHighlightBackground": palette.lineHighlight,
  },
  tokenColors: [
    {
      scope: [
        "comment",
        "comment.line",
        "comment.block",
        "punctuation.definition.comment",
      ],
      settings: { foreground: palette.comment, fontStyle: "italic" },
    },
    {
      scope: [
        "punctuation",
        "punctuation.definition",
        "punctuation.separator",
        "punctuation.terminator",
        "punctuation.accessor",
        "meta.brace",
        "meta.delimiter",
      ],
      settings: { foreground: palette.punct },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.control.import",
        "keyword.control.export",
        "keyword.control.from",
        "keyword.control.as",
        "keyword.control.return",
        "keyword.control.flow",
        "keyword.operator.new",
        "keyword.operator.typeof",
        "keyword.operator.void",
        "keyword.operator.instanceof",
        "keyword.operator.in",
        "storage.type",
        "storage.modifier",
      ],
      settings: { foreground: palette.keyword },
    },
    {
      scope: [
        "string",
        "string.quoted.single",
        "string.quoted.double",
        "string.quoted.backtick",
        "string.template",
        "string.regexp",
        "punctuation.definition.string",
      ],
      settings: { foreground: palette.string },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language.boolean",
        "constant.language.null",
        "constant.language.undefined",
        "constant.language.nan",
        "constant.other",
        "variable.other.constant",
        "support.constant",
      ],
      settings: { foreground: palette.number },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call entity.name.function",
        "variable.function",
      ],
      settings: { foreground: palette.fn },
    },
    {
      scope: [
        "variable",
        "variable.other",
        "variable.other.readwrite",
        "variable.other.object",
        "variable.parameter",
        "variable.language.this",
        "variable.language.self",
      ],
      settings: { foreground: palette.variable },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.interface",
        "entity.name.enum",
        "support.type",
        "support.class",
        "support.type.builtin",
        "support.function.builtin",
        "storage.type.class",
      ],
      settings: { foreground: palette.type },
    },
    {
      scope: [
        "keyword.operator",
        "keyword.operator.arithmetic",
        "keyword.operator.comparison",
        "keyword.operator.logical",
        "keyword.operator.assignment",
        "keyword.operator.bitwise",
        "keyword.operator.spread",
        "keyword.operator.rest",
        "keyword.operator.ternary",
        "keyword.operator.optional",
      ],
      settings: { foreground: palette.operator },
    },
    {
      scope: [
        "entity.name.tag",
        "meta.tag entity.name.tag",
        "support.class.component",
      ],
      settings: { foreground: palette.tag },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: palette.attr },
    },
    {
      scope: [
        "support.function.builtin",
        "support.type.builtin",
        "support.constant",
      ],
      settings: { foreground: palette.builtin },
    },
    {
      scope: [
        "meta.template.expression",
        "punctuation.definition.template-expression",
      ],
      settings: { foreground: palette.fg },
    },
    {
      scope: ["meta.decorator", "punctuation.decorator"],
      settings: { foreground: palette.operator, fontStyle: "italic" },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: palette.invalid, fontStyle: "underline" },
    },
  ],
});

export const phosphorTheme = createCodeTheme(phosphorCodePalette);
export const amberTheme = createCodeTheme(amberCodePalette);

export const codeBlockThemes: Record<CodeBlockThemeName, ThemeRegistration> = {
  phosphor: phosphorTheme,
  amber: amberTheme,
};
