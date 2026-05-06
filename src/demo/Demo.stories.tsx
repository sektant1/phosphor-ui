import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "./Home";
import { Post } from "./Post";
import { CourseOverview } from "./CourseOverview";
import { Site } from "./Site";

const meta: Meta = {
  title: "Pages/Demo Site",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const SiteRouter: Story = { render: () => <Site /> };
export const HomePage: Story = { render: () => <Home /> };
export const PostPage: Story = { render: () => <Post /> };
export const CoursePage: Story = { render: () => <CourseOverview /> };
