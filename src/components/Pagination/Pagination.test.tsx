import React from "react";
import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  test("renders marker with page/total", () => {
    render(<Pagination page={2} totalPages={5} />);
    expect(screen.getByText("[ 2 / 5 ]")).toBeTruthy();
  });

  test("disables prev on first page", () => {
    const { container } = render(<Pagination page={1} totalPages={3} nextHref="#" />);
    const prev = container.querySelector(".page-prev");
    expect(prev?.classList.contains("disabled")).toBe(true);
    expect(prev?.tagName).toBe("SPAN");
  });

  test("disables next on last page", () => {
    const { container } = render(<Pagination page={3} totalPages={3} prevHref="#" />);
    const next = container.querySelector(".page-next");
    expect(next?.classList.contains("disabled")).toBe(true);
  });

  test("renders anchor when navigable", () => {
    const { container } = render(
      <Pagination page={2} totalPages={3} prevHref="/p/1" nextHref="/p/3" />
    );
    expect(container.querySelector("a.page-prev")?.getAttribute("href")).toBe("/p/1");
    expect(container.querySelector("a.page-next")?.getAttribute("href")).toBe("/p/3");
  });
});
