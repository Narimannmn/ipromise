import { PropsWithChildren, Suspense } from "react";

export const AppSuspense = ({ children }: PropsWithChildren) => {
  return <Suspense fallback={<span>Loading...</span>}>{children}</Suspense>;
};
