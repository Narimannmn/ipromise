import { Language, LanguageSchema } from "@/entities/Language/schemas/schemas";
import i18next from "@/shared/i18n/config";

export const getCurrentLanguage = (): Language => {
  const result = LanguageSchema.safeParse(i18next.language);
  if (!result.success) {
    return "ru";
  }
  return result.data;
};

export const withLocalization = (localizations: Record<Language, string>) => {
  return localizations[getCurrentLanguage()];
};

export const withSubLocalization = (localizations: Record<Language, string>, language: Language)=>{
  return localizations[language];
};
