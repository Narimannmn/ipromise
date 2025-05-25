import { Outlet, RouteObject } from "react-router-dom";
import { FeedPageLazy } from "@/pages/feed";
import { FriendsPageLazy } from "@/pages/friends";
import { ProfilePageLazy } from "@/pages/profile";
import { PromisesPageLazy } from "@/pages/promises";
import { JoyrideApp } from "@/widgets/JoyrideApp/JoyrideApp";
import { AppSuspense } from "@/shared/components/AppSuspense";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute/ProtectedRoute";
import { AppLayout } from "@/shared/layouts/AppLayout/AppLayout";
import { privateRoutesMap } from "@/shared/navigation";

export const privateRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <JoyrideApp />
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
        element: <ProfilePageLazy />,
      },
      {
        path: privateRoutesMap.friends,
        element: <FriendsPageLazy />,
      },
      {
        path: privateRoutesMap.profileMy,
        element: <ProfilePageLazy />,
      },
      {
        path: privateRoutesMap.promisesMy,
        element: <PromisesPageLazy />,
      },
      {
        path: privateRoutesMap.friendsMy,
        element: <FriendsPageLazy />,
      },
    ],
  },
];
