import { lazy } from "react";

export const ProfilePageLazy = lazy(() =>
  import("./ProfilePage").then(({ ProfilePage }) => ({
    default: ProfilePage,
  })),
);
