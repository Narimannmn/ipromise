import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { appSessionStorage } from "@/shared/utils/appSessionStorage/appSessionStorage";
import {
  getLocalStorageTokens,
  isTokenValid,
} from "@/shared/utils/token/token";
import { User } from "../../User/schemas/schemas";
import { DecodedToken, LoginResponse } from "../schemas/schemas";
import { revalidateToken } from "../services/services";

export interface Tokens {
  accessToken: LoginResponse["access_token"];
  refreshToken: LoginResponse["refresh_token"];
}

export interface AuthState {
  user: User | null;
  tokens: Tokens | null;
}
export interface AuthActions {
  setUser: (user: User) => void;
  setTokens: (tokens: Tokens) => void;
  checkForSavedToken: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    immer((set) => ({
      user: null,
      tokens: null,
      setUser: (user) => {
        set((state) => {
          state.user = user;
        });
      },
      setTokens: (tokens) => {
        set((state) => {
          state.tokens = tokens;
        });
        appLocalStorage.setItem(
          appLocalStorageKey.accessToken,
          tokens.accessToken,
        );
        appLocalStorage.setItem(
          appLocalStorageKey.refreshToken,
          tokens.refreshToken,
        );
      },
      checkForSavedToken: async () => {
        const { accessToken, refreshToken } = getLocalStorageTokens();
        if (!accessToken || !refreshToken) {
          return;
        }
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        if (!isTokenValid(decodedToken)) {
          try {
            const response = await revalidateToken(refreshToken);
            const tokens = response.data;

            appSessionStorage.setTokenValid();
            set((state) => {
              state.tokens = { ...tokens, refreshToken: refreshToken };
            });
          } catch (error) {
            console.error(error);
          }
          return;
        }

        appSessionStorage.setTokenValid();
        set((state) => {
          state.tokens = {
            accessToken,
            refreshToken,
          };
        });
      },
      logout: () => {
        appSessionStorage.unvalidateToken();
        set((state) => {
          state.user = null;
          state.tokens = null;
        });
        appLocalStorage.removeItem(appLocalStorageKey.accessToken);
        appLocalStorage.removeItem(appLocalStorageKey.refreshToken);
      },
    })),
  ),
);
