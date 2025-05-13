import { lazy } from "react";

export const RegistrationPageLazy = lazy(() =>
  import("./RegistrationPage").then(({ RegistrationPage }) => ({
    default: RegistrationPage,
  })),
);
