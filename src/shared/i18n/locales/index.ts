import { AppI18NextNamespace } from "../types";
import { kzApiResponseStatuses, kzErrorPage, kzLogin, kzRequests } from "./kz";
import { ruErrorPage, ruLogin, ruRequests } from "./ru";

export const kzResourses: Record<AppI18NextNamespace, unknown> = {
  login: kzLogin,
  requests: kzRequests,
  apiResponseStatuses: kzApiResponseStatuses,
  errorPage: ruErrorPage,
};

export const ruResourses: Record<AppI18NextNamespace, unknown> = {
  login: ruLogin,
  requests: ruRequests,
  apiResponseStatuses: kzApiResponseStatuses,
  errorPage: kzErrorPage,
};
