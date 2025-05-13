import { Outlet, RouteObject } from "react-router-dom";
import { FeedPageLazy } from "@/pages/feed";
import { PromisesPageLazy } from "@/pages/promises";
import { VacancyPageLazy } from "@/pages/vacancy";
import { AppSuspense } from "@/shared/components/AppSuspense";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute/ProtectedRoute";
import { AppLayout } from "@/shared/layouts/AppLayout/AppLayout";
import { privateRoutesMap } from "@/shared/navigation";

export const privateRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <AppLayout>
          <AppSuspense>
            <Outlet />
          </AppSuspense>
        </AppLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: privateRoutesMap.feed,
        element: <FeedPageLazy />,
      },
      {
        path: privateRoutesMap.promises,
        element: <PromisesPageLazy />,
      },
      {
        path: privateRoutesMap.profile,
        element: <VacancyPageLazy />,
      },
      {
        path: privateRoutesMap.friends,
        element: <VacancyPageLazy />,
      },
    ],
  },
];
