import React from "react";
import { render, screen } from "@testing-library/react";
import Prose from "./Prose";

describe("Prose", () => {
  test("wraps content with prose class", () => {
    const { container } = render(
      <Prose>
        <p>hi</p>
      </Prose>
    );
    expect(container.querySelector(".pho-prose")).toBeTruthy();
    expect(screen.getByText("hi")).toBeTruthy();
  });

  test("respects `as` prop", () => {
    const { container } = render(
      <Prose as="article">
        <p>x</p>
      </Prose>
    );
    expect(container.querySelector("article.pho-prose")).toBeTruthy();
  });
});
