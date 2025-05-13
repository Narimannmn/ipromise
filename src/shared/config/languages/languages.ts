import {
  Language,
  LanguageLocalizations,
} from "@/entities/Language/schemas/schemas";

export const languages = ["kz", "ru"] as const;
export const languageLocalizations = ["Қазақ", "Русский"] as const;

export type LanguagesMap = Record<Language, Language>;
export const languagesMap: LanguagesMap = {
  kz: "kz",
  ru: "ru",
};

export type LanguagesLocalizedMap = Record<Language, LanguageLocalizations>;
export const languagesLocalizedMap: LanguagesLocalizedMap = {
  kz: "Қазақ",
  ru: "Русский",
};
