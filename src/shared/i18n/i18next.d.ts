import "i18next";
import Resources from "../@types/resources";
import { AppI18NextNamespace } from "./types";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "all";
    ns: AppI18NextNamespace;
    resources: Resources;
  }
}
