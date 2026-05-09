import React from "react";
import { render, screen } from "@testing-library/react";
import { PostListing } from "./PostListing";

describe("PostListing", () => {
  it("renders rows from data", () => {
    render(
      <PostListing
        posts={[
          {
            date: "2026-05-09",
            title: "Boot notes",
            meta: "4m",
            href: "/notes/boot",
          },
          {
            date: "2026-05-08",
            title: "Archive map",
            href: "/notes/archive",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", { name: /boot notes/i }).getAttribute("href"),
    ).toBe("/notes/boot");
    expect(
      screen.getByRole("link", { name: /archive map/i }).getAttribute("href"),
    ).toBe("/notes/archive");
  });
});
