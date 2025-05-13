import { StyleProvider } from "@ant-design/cssinjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { IconContext } from "react-icons";
import { RouterProvider } from "react-router-dom";
import "@/app/assets/css/fonts.css";
import { router } from "@/app/navigation";
import { useAuthStore } from "@/entities/Auth/store/store";
import { Language } from "@/entities/Language/schemas/schemas";
import ErrorBoundary from "@/shared/components/ErrorBoundary/ErrorBoundary";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { languagesLocalizedMap } from "@/shared/config/languages/languages";
import { theme } from "@/shared/config/theme/themeConfig";
import "@/shared/i18n/config";
import i18next from "@/shared/i18n/config";
import { kazakhLocale } from "@/shared/i18n/locales/kz/dayjsKz.ts";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";

// for Ant Design v5+

// for Ant Design v5+

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
dayjs.locale("kz", kazakhLocale);

function App() {
  const { i18n, t } = useTranslation();
  dayjs.locale(i18next.language);

  useEffect(() => {
    document.title = "Ipromise | личные обещания";
  }, [i18next.language, t]);

  useEffect(() => {
    i18n.changeLanguage(
      appLocalStorage.getItem<Language>(appLocalStorageKey.language) ||
        languagesLocalizedMap.ru,
    );
  }, [i18n]);

  const checkForSavedToken = useAuthStore((state) => state.checkForSavedToken);

  useEffect(() => {
    checkForSavedToken();
  }, []);

  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18next}>
        <QueryClientProvider client={queryClient}>
          <StyleProvider layer>
            <ConfigProvider
              theme={theme}
              locale={ruRU}
            >
              <IconContext.Provider value={{ size: "20" }}>
                <RouterProvider router={router} />
              </IconContext.Provider>
            </ConfigProvider>
          </StyleProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

export default App;
