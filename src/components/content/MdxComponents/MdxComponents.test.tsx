import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { PostBody } from "./MdxComponents";

jest.mock("shiki", () => ({
  codeToHtml: jest.fn(async (code: string) => `<pre><code>${code}</code></pre>`),
}));

describe("PostBody", () => {
  test("renders post pre/code blocks with CodeBlock", async () => {
    render(
      <PostBody>
        <pre>
          <code className="language-bash">{"npm run build\n"}</code>
        </pre>
      </PostBody>,
    );

    expect(screen.getByLabelText("bash code")).toBeTruthy();
    expect(screen.getByRole("button", { name: /copy code/i })).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByText("npm run build")).toBeTruthy();
    });
  });
});
