import { lazy } from "react";

export const LoginPageLazy = lazy(() =>
  import("./LoginPage").then(({ LoginPage }) => ({ default: LoginPage })),
);
