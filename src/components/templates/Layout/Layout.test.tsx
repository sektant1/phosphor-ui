import React from "react";
import { render } from "@testing-library/react";
import { Grid } from "./Layout";

describe("Layout primitives", () => {
  test("keeps custom grid item minimums responsive", () => {
    const { container } = render(
      <Grid minItemWidth="18rem" mobileMinItemWidth={240}>
        <div>alpha</div>
        <div>beta</div>
      </Grid>,
    );

    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.getPropertyValue("--pho-grid-min")).toBe(
      "min(100%, 18rem)",
    );
    expect(grid.style.getPropertyValue("--pho-mobile-grid-min")).toBe(
      "min(100%, 240px)",
    );
  });
});
