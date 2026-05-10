export function source(code: string): { code: string; language: "tsx" } {
  return {
    code: code.trim(),
    language: "tsx",
  };
}

export function tsx(code: TemplateStringsArray, ...values: unknown[]): string {
  return String.raw({ raw: code }, ...values).trim();
}
