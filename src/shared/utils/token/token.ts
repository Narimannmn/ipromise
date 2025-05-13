import { DecodedToken, Token } from "@/entities/Auth/schemas/schemas";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { appLocalStorage } from "../appLocalStorage/appLocalStorage";

export const isTokenValid = (token: DecodedToken) => {
  return token.exp * 1000 > new Date().getTime();
};

export const getLocalStorageTokens = () => {
  const accessToken = appLocalStorage.getItem<Token>(
    appLocalStorageKey.accessToken,
  );
  const refreshToken = appLocalStorage.getItem<Token>(
    appLocalStorageKey.refreshToken,
  );

  return {
    accessToken,
    refreshToken,
  };
};
