import React from "react";
import { render, screen } from "@testing-library/react";
import Link from "./Link";

describe("Link", () => {
  test("renders anchor with href", () => {
    render(<Link href="/x">go</Link>);
    const a = screen.getByText("go") as HTMLAnchorElement;
    expect(a.tagName).toBe("A");
    expect(a.getAttribute("href")).toBe("/x");
  });
});
