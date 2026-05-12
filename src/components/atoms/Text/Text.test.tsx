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

  test("h5 and h6 variants render matching semantic tags and classes", () => {
    const h5 = render(<Text variant="h5">five</Text>).container.firstChild as HTMLElement;
    const h6 = render(<Text variant="h6">six</Text>).container.firstChild as HTMLElement;

    expect(h5.tagName).toBe("H5");
    expect(h5.className).toContain("t-h5");
    expect(h6.tagName).toBe("H6");
    expect(h6.className).toContain("t-h6");
  });

  test("as prop overrides tag", () => {
    const { container } = render(
      <Text variant="h2" as="span">y</Text>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("SPAN");
    expect(el.className).toContain("t-h2");
  });

  test("supports utility typography flags", () => {
    const { container } = render(
      <Text variant="caption" truncate balance>
        long caption
      </Text>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("t-caption");
    expect(el.className).toContain("t-truncate");
    expect(el.className).toContain("t-balance");
  });

  test("supports tone, align, transform, and nowrap utility props", () => {
    const { container } = render(
      <Text tone="accent" align="center" transform="uppercase" nowrap>
        signal
      </Text>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("t-tone-accent");
    expect(el.className).toContain("t-align-center");
    expect(el.className).toContain("t-uppercase");
    expect(el.className).toContain("t-nowrap");
  });
});
