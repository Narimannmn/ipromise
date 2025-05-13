import { lazy } from "react";

export const VacancyPageLazy = lazy(() =>
  import("./VacancyPage").then(({ VacancyPage }) => ({ default: VacancyPage })),
);
