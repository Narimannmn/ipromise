import { lazy } from "react";

export const PromisesPageLazy = lazy(() =>
  import("./PromisesPage").then(({ PromisesPage }) => ({
    default: PromisesPage,
  })),
);
