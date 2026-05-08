import React from "react";
import { render, screen } from "@testing-library/react";
import { PostLayout } from "./PostLayout";

describe("PostLayout", () => {
  test("continues to render through the page template", () => {
    render(
      <PostLayout
        header={<h1>Legacy header</h1>}
        sidebar={<nav>Legacy sidebar</nav>}
        footer={<span>Legacy footer</span>}
      >
        Legacy body
      </PostLayout>,
    );

    expect(screen.getByText("Legacy header")).toBeTruthy();
    expect(screen.getByLabelText("post sidebar")).toBeTruthy();
    expect(screen.getByText("Legacy body")).toBeTruthy();
    expect(screen.getByText("Legacy footer")).toBeTruthy();
  });
});
