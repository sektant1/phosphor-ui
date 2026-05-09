import React from "react";
import { render, screen, within } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  test("renders title fallback heading", () => {
    render(<Header title="ZONE" />);
    expect(screen.getByText("ZONE")).toBeTruthy();
  });

  test("renders nav items with prompt glyph", () => {
    render(
      <Header
        title="Z"
        variant="terminal"
        nav={[
          { label: "home", href: "/" },
          { label: "posts", href: "/p" },
        ]}
      />
    );
    expect(screen.getAllByRole("link")).toHaveLength(3);
    const nav = screen.getByRole("navigation", { name: /primary/i });
    expect(within(nav).getByRole("link", { name: /home/i })).toBeTruthy();
    expect(within(nav).getByRole("link", { name: /posts/i })).toBeTruthy();
  });

  test("hides locale switch when fewer than 2 locales", () => {
    const { container } = render(
      <Header
        title="Z"
        locales={[{ code: "en", label: "EN", href: "/", active: true }]}
      />
    );
    expect(container.querySelector(".locale-switch")).toBeFalsy();
  });

  test("omits rule when rule=false", () => {
    const { container } = render(<Header title="Z" rule={false} />);
    expect(container.querySelector(".rule")).toBeFalsy();
  });
});
