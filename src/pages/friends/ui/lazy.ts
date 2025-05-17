import { lazy } from "react";

export const FriendsPageLazy = lazy(() =>
  import("./FriendsPage").then(({ FriendsPage }) => ({ default: FriendsPage })),
);
