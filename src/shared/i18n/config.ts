import i18next, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { kzResourses, ruResourses } from "./locales";
import { namespaces } from "./types";

i18next.use(initReactI18next).init(
  {
    lng: "ru",
    fallbackLng: ["ru", "kz"],
    ns: namespaces,
    defaultNS: "all",
    resources: {
      ru: ruResourses,
      kz: kzResourses,
    } as Resource,
    react: {
      useSuspense: false,
    },
  },
  (error) => {
    if (!error) {
      return;
    }
    console.error(error);
  },
);

export default i18next;
