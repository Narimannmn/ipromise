import { Outlet, RouteObject } from "react-router-dom";
import { ErrorPageLazy } from "@/pages/error/ui/lazy";
import { LoginPageLazy } from "@/pages/login";
import { RegistrationPageLazy } from "@/pages/registration";
import { AppSuspense } from "@/shared/components/AppSuspense";
import { AuthLayout } from "@/shared/layouts/AuthLayout/AuthLayout";
import { publicRoutesMap } from "@/shared/navigation";

export const publicRoutes: RouteObject[] = [
  {
    element: (
      <AuthLayout>
        <AppSuspense>
          <Outlet />
        </AppSuspense>
      </AuthLayout>
    ),
    children: [
      {
        path: publicRoutesMap.registration,
        element: <RegistrationPageLazy />,
      },
      {
        path: publicRoutesMap.login,
        element: <LoginPageLazy />,
      },
    ],
  },
  {
    path: publicRoutesMap.error,
    element: <ErrorPageLazy />,
  },
];
