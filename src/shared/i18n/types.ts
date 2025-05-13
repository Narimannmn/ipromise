export const namespaces = [
  "login",
  "requests",
  "apiResponseStatuses",
  "errorPage",
] as const;
export type AppI18NextNamespace = (typeof namespaces)[number];
