import React from "react";
import { render } from "@testing-library/react";
import Text from "./Text";

describe("Text", () => {
  test("default variant=body renders <p> with t-body class", () => {
    const { container } = render(<Text>x</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("P");
    expect(el.className).toContain("t-body");
  });

  test("h2 variant renders <h2> with t-h2", () => {
    const { container } = render(<Text variant="h2">y</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("H2");
    expect(el.className).toContain("t-h2");
  });

  test("as prop overrides tag", () => {
    const { container } = render(
      <Text variant="body" as="span">y</Text>
    );
    expect((container.firstChild as HTMLElement).tagName).toBe("SPAN");
  });
});
