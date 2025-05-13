import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { publicRoutesMap } from "@/shared/navigation";
import { appSessionStorage } from "@/shared/utils/appSessionStorage/appSessionStorage";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isValid = appSessionStorage.isTokenValid();

  if (!isValid) {
    return (
      <Navigate
        to={publicRoutesMap.login}
        replace
      />
    );
  }
  return children;
};
