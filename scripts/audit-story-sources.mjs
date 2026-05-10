import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const storyRoots = ["src/components", "src/stories"];
const storyFilePattern = /\.(stories\.(tsx|ts)|mdx)$/;

const relativeImportPattern =
  /from\s+["'](?:\.{1,2}\/|\/)|import\s*\(\s*["'](?:\.{1,2}\/|\/)/;
const storyInternalsPattern =
  /\b(export\s+const|StoryObj|Meta|args\s*:|render\s*:)\b/;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    if (storyFilePattern.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function hasPropertyNamed(node, name) {
  return (
    ts.isPropertyAssignment(node) &&
    ((ts.isIdentifier(node.name) && node.name.text === name) ||
      (ts.isStringLiteral(node.name) && node.name.text === name))
  );
}

function propertyName(node) {
  if (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) {
    return node.name.text;
  }

  return undefined;
}

function findProperty(object, name) {
  if (!ts.isObjectLiteralExpression(object)) return undefined;
  return object.properties.find((prop) => hasPropertyNamed(prop, name));
}

function propertyInitializer(object, name) {
  const prop = findProperty(object, name);
  return prop && ts.isPropertyAssignment(prop) ? prop.initializer : undefined;
}

function unwrapExpression(expression) {
  if (ts.isSatisfiesExpression?.(expression) || ts.isAsExpression(expression)) {
    return unwrapExpression(expression.expression);
  }

  return expression;
}

function exportedStories(sourceFile) {
  const stories = [];

  function visit(node) {
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const declaration of node.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;

        const initializer = unwrapExpression(declaration.initializer);
        if (!ts.isObjectLiteralExpression(initializer)) continue;

        stories.push({
          name: declaration.name.text,
          node: initializer,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return stories;
}

function containsNestedProperty(object, pathParts) {
  let current = object;

  for (const part of pathParts) {
    current = propertyInitializer(current, part);
    if (!current) return false;
  }

  return true;
}

function sourceCodeExpression(storyObject) {
  let current = storyObject;
  for (const part of ["parameters", "docs", "source"]) {
    current = propertyInitializer(current, part);
    if (!current) return undefined;
  }

  if (ts.isCallExpression(current)) {
    return current.arguments[0];
  }

  if (!ts.isObjectLiteralExpression(current)) return undefined;
  return propertyInitializer(current, "code");
}

function expressionText(expression, sourceFile) {
  return expression ? expression.getText(sourceFile) : "";
}

function inlineSnippet(expression) {
  if (!expression) return undefined;
  if (ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
  if (ts.isStringLiteral(expression)) return expression.text;
  return undefined;
}

function isJsonOnly(snippet) {
  if (!snippet) return false;
  const trimmed = snippet.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return false;

  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

function analyzeFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const stories = exportedStories(sourceFile);
  const importsBasicUsage = /\bbasicUsage\b/.test(code);
  const basicUsageReferences = code.match(/\bbasicUsage\.[A-Za-z0-9_$]+/g) ?? [];
  const issues = [];

  for (const story of stories) {
    const codeExpression = sourceCodeExpression(story.node);
    const codeText = expressionText(codeExpression, sourceFile);
    const snippet = inlineSnippet(codeExpression);
    const hasSourceCode =
      Boolean(codeExpression) &&
      !/\bbasicUsage\./.test(codeText) &&
      !/^\s*JSON\.stringify\b/.test(codeText);
    const hasRender = containsNestedProperty(story.node, ["render"]);
    const hasArgs = containsNestedProperty(story.node, ["args"]);

    if (!hasSourceCode) {
      issues.push(`${story.name}: missing explicit parameters.docs.source.code`);
    }

    if (hasRender && !hasSourceCode) {
      issues.push(`${story.name}: has render but no explicit code snippet`);
    }

    if (hasArgs && !hasSourceCode) {
      issues.push(`${story.name}: has args but no explicit code snippet`);
    }

    if (isJsonOnly(snippet) || /^\s*JSON\.stringify\b/.test(codeText)) {
      issues.push(`${story.name}: source appears to be JSON-only`);
    }

    if (snippet && relativeImportPattern.test(snippet)) {
      issues.push(`${story.name}: source imports from a relative/private path`);
    }

    if (snippet && storyInternalsPattern.test(snippet)) {
      issues.push(`${story.name}: source contains Storybook internals`);
    }

    if (/\bbasicUsage\./.test(codeText)) {
      issues.push(`${story.name}: source still references basicUsage`);
    }
  }

  if (importsBasicUsage) {
    issues.push("file imports basicUsage");
  }

  for (const reference of new Set(basicUsageReferences)) {
    issues.push(`file references ${reference}`);
  }

  return {
    filePath,
    stories,
    issues,
  };
}

const files = storyRoots.flatMap((dir) => walk(path.join(root, dir))).sort();
const reports = files.map(analyzeFile);
const failing = reports.filter((report) => report.issues.length > 0);

for (const report of reports) {
  const rel = path.relative(root, report.filePath);
  console.log(`${rel}`);

  if (report.stories.length === 0) {
    console.log("  stories: none");
  } else {
    for (const story of report.stories) {
      const codeExpression = sourceCodeExpression(story.node);
      const hasSourceCode =
        Boolean(codeExpression) &&
        !/\bbasicUsage\./.test(expressionText(codeExpression, ts.createSourceFile(report.filePath, fs.readFileSync(report.filePath, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)));
      console.log(`  ${story.name}: ${hasSourceCode ? "source" : "missing-source"}`);
    }
  }

  for (const issue of report.issues) {
    console.log(`  ! ${issue}`);
  }
}

const storyCount = reports.reduce((sum, report) => sum + report.stories.length, 0);
const issueCount = failing.reduce((sum, report) => sum + report.issues.length, 0);
console.log(`\nChecked ${reports.length} files and ${storyCount} stories.`);

if (issueCount > 0) {
  console.error(`Found ${issueCount} source issue${issueCount === 1 ? "" : "s"}.`);
  process.exit(1);
}

console.log("All story sources pass.");
