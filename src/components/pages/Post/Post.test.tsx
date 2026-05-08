import React from "react";
import { render, screen } from "@testing-library/react";
import { Post } from "./Post";

jest.mock("@mdx-js/react", () => ({
  MDXProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Post", () => {
  test("composes a post header and body inside the page template", () => {
    render(
      <Post
        title="Signal report"
        headerProps={{
          subtitle: "Field notes",
          date: "2026-05-08",
          readTime: "4 min",
          tags: ["ops"],
        }}
        sidebar={<nav>Post nav</nav>}
      >
        <p>Transmission body</p>
      </Post>,
    );

    expect(screen.getByRole("heading", { name: "Signal report" })).toBeTruthy();
    expect(screen.getByText("Field notes")).toBeTruthy();
    expect(screen.getByLabelText("post sidebar")).toBeTruthy();
    expect(screen.getByText("Transmission body")).toBeTruthy();
  });
});
