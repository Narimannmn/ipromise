import { QueryClient } from "@tanstack/react-query";
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
  access_token: LoginResponse["access_token"];
  refresh_token: LoginResponse["refresh_token"];
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

export const queryClient = new QueryClient();

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
          state.user = null;
          state.tokens = tokens;
        });
        appLocalStorage.setItem(
          appLocalStorageKey.accessToken,
          tokens.access_token,
        );
        appLocalStorage.setItem(
          appLocalStorageKey.refreshToken,
          tokens.refresh_token,
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
              state.tokens = { ...tokens, refresh_token: refreshToken };
            });
          } catch (error) {
            console.error(error);
          }
          return;
        }

        appSessionStorage.setTokenValid();
        set((state) => {
          state.tokens = {
            access_token: accessToken,
            refresh_token: refreshToken,
          };
        });
      },
      logout: () => {
        appSessionStorage.unvalidateToken();
        appLocalStorage.removeItem(appLocalStorageKey.accessToken);
        appLocalStorage.removeItem(appLocalStorageKey.refreshToken);

        // Clear all React Query caches
        queryClient.clear();

        set((state) => {
          state.user = null;
          state.tokens = null;
        });
        set(() => ({
          user: null,
          tokens: null,
        }));
      },
    })),
  ),
);
