import { lazy } from "react";

export const ErrorPageLazy = lazy(() =>
  import("./ErrorPage").then(({ ErrorPage }) => ({ default: ErrorPage })),
);
