import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  test("renders title fallback heading", () => {
    render(<Header title="ZONE" />);
    expect(screen.getByText("ZONE")).toBeTruthy();
  });

  test("renders nav items with prompt glyph", () => {
    const { container } = render(
      <Header
        title="Z"
        nav={[
          { label: "home", href: "/" },
          { label: "posts", href: "/p" },
        ]}
      />
    );
    expect(container.querySelectorAll(".nav-item").length).toBe(2);
    expect(container.textContent).toContain("> home");
    expect(container.textContent).toContain("> posts");
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
