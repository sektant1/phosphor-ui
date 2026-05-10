import React from "react";
import { render } from "@testing-library/react";
import { Heading } from "./Headings";

describe("Heading", () => {
  test("level 5 renders h5 with t-h5", () => {
    const { container } = render(<Heading level={5}>section</Heading>);
    const el = container.firstChild as HTMLElement;

    expect(el.tagName).toBe("H5");
    expect(el.className).toContain("t-h5");
  });

  test("level 6 renders h6 with t-h6", () => {
    const { container } = render(<Heading level={6}>section</Heading>);
    const el = container.firstChild as HTMLElement;

    expect(el.tagName).toBe("H6");
    expect(el.className).toContain("t-h6");
  });

  test("glyph renders as decorative content", () => {
    const { container } = render(
      <Heading level={5} glyph="◆">
        section
      </Heading>,
    );

    const glyph = container.querySelector(".pho-heading__glyph");
    expect(glyph?.getAttribute("aria-hidden")).toBe("true");
  });
});
