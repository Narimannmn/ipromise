export const namespaces = [
  "login",
  "requests"
] as const;
export type AppI18NextNamespace = (typeof namespaces)[number];
