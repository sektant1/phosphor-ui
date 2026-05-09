import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CodeBlock, extractMdxCode } from "./CodeBlock";

const renderedHtml = '<pre><code><span class="line">npm run build</span></code></pre>';

describe("CodeBlock", () => {
  test("renders pre-rendered Shiki HTML without waiting for client highlighting", () => {
    render(
      <CodeBlock
        code="const ok = true;"
        lang="ts"
        html={'<pre><code><span class="line">const ok = true;</span></code></pre>'}
      />,
    );

    expect(screen.getByText("const ok = true;")).toBeTruthy();
  });

  test("can disable copy controls", () => {
    render(
      <CodeBlock
        code="npm run build"
        language="bash"
        html={renderedHtml}
        copyable={false}
      />,
    );

    expect(screen.queryByRole("button", { name: /copy code/i })).toBeNull();
  });

  test("copies raw code when copy button is clicked", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    render(<CodeBlock code="npm run build" language="bash" html={renderedHtml} />);
    fireEvent.click(screen.getByRole("button", { name: /copy code/i }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("npm run build");
    });
  });

  test("extracts language and code from MDX pre children", () => {
    const result = extractMdxCode(
      <code className="language-ts">{"const value = 1;\n"}</code>,
    );

    expect(result).toEqual({ code: "const value = 1;", lang: "ts" });
  });
});
