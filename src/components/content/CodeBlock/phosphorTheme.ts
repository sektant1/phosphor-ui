import type { ThemeRegistration } from "shiki";

/*
  Phosphor palette — 6 distinct visual bands:

  #2cff7a  pure phosphor   keywords, tags          (hot, saturated)
  #8effc4  mint            functions               (bright, soft)
  #62ff9a  medium green    operators               (secondary)
  #00e8c8  teal            strings                 (cool hue shift)
  #38eed8  cyan            types, builtins         (even cooler)
  #c8ff44  lime            numbers, constants      (warm hue shift)
  #b8ffd6  pale green      variables               (near default)
  #2d6640  dim green       comments                (suppressed)
  #243d2c  very dim        punctuation             (structural noise)
*/

export const phosphorTheme: ThemeRegistration = {
  name: "phosphor",
  type: "dark",
  bg: "#03110a",
  fg: "#d8ffe7",
  colors: {
    "editor.background": "#03110a",
    "editor.foreground": "#d8ffe7",
    "editor.selectionBackground": "#1fb85440",
    "editor.lineHighlightBackground": "#071c0f",
  },
  tokenColors: [
    /* ── suppressed ─────────────────────────────────────── */
    {
      scope: [
        "comment",
        "comment.line",
        "comment.block",
        "punctuation.definition.comment",
      ],
      settings: { foreground: "#2d6640", fontStyle: "italic" },
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
      settings: { foreground: "#243d2c" },
    },

    /* ── pure phosphor — keywords ────────────────────────── */
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
      settings: { foreground: "#2cff7a" },
    },

    /* ── teal — strings ──────────────────────────────────── */
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
      settings: { foreground: "#00e8c8" },
    },

    /* ── lime — numbers, booleans, constants ─────────────── */
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
      settings: { foreground: "#c8ff44" },
    },

    /* ── mint — function names ───────────────────────────── */
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call entity.name.function",
        "variable.function",
      ],
      settings: { foreground: "#8effc4" },
    },

    /* ── pale green — variables ──────────────────────────── */
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
      settings: { foreground: "#b8ffd6" },
    },

    /* ── cyan — types, classes, interfaces ───────────────── */
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
      settings: { foreground: "#38eed8" },
    },

    /* ── medium green — operators ────────────────────────── */
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
      settings: { foreground: "#62ff9a" },
    },

    /* ── tags & attributes (HTML/JSX) ────────────────────── */
    {
      scope: [
        "entity.name.tag",
        "meta.tag entity.name.tag",
        "support.class.component",
      ],
      settings: { foreground: "#2cff7a" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#c8ff44" },
    },

    /* ── template expressions — inherit default ───────────── */
    {
      scope: [
        "meta.template.expression",
        "punctuation.definition.template-expression",
      ],
      settings: { foreground: "#d8ffe7" },
    },

    /* ── decorators ──────────────────────────────────────── */
    {
      scope: ["meta.decorator", "punctuation.decorator"],
      settings: { foreground: "#62ff9a", fontStyle: "italic" },
    },

    /* ── invalid ─────────────────────────────────────────── */
    {
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: "#ff5555", fontStyle: "underline" },
    },
  ],
};
