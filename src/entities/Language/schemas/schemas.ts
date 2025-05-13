import { z } from "zod";
import {
  languageLocalizations,
  languages,
} from "@/shared/config/languages/languages";

export const LanguageSchema = z.enum(languages);
export type Language = z.infer<typeof LanguageSchema>;

export const LanguageLocalizationsSchema = z.enum(languageLocalizations);
export type LanguageLocalizations = z.infer<typeof LanguageLocalizationsSchema>;
