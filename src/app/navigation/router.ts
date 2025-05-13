import { createBrowserRouter, RouteObject } from "react-router-dom";
import { invalidRoutes } from "./invalidRoutes";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";

const routes: RouteObject[] = [
  ...publicRoutes,
  ...privateRoutes,
  ...invalidRoutes,
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
});
