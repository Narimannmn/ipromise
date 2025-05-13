import { Navigate, RouteObject } from "react-router-dom";
import { invalidRoutesMap, publicRoutesMap } from "@/shared/navigation";

export const invalidRoutes: RouteObject[] = [
  {
    path: invalidRoutesMap.all,
    element: (
      <Navigate
        to={publicRoutesMap.ongoing}
        replace
      />
    ),
  },
];
