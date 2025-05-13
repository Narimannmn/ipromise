import { lazy } from "react";

export const FeedPageLazy = lazy(() =>
  import("./feedPage").then(({ feedPage }) => ({
    default: feedPage,
  })),
);
