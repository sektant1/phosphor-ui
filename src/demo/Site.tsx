import React from "react";
import { Home } from "./Home";
import { Post } from "./Post";
import { CourseOverview } from "./CourseOverview";
import { useHashRoute } from "./shared";

export const Site: React.FC = () => {
  const [route] = useHashRoute();
  if (route === "post") return <Post />;
  if (route === "course") return <CourseOverview />;
  return <Home />;
};
