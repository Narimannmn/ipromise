import { AppI18NextNamespace } from "../types";
import { kzLogin, kzRequests } from "./kz";
import { ruLogin, ruRequests } from "./ru";

export const kzResourses: Record<AppI18NextNamespace, unknown> = {
  login: kzLogin,
  requests: kzRequests,

};

export const ruResourses: Record<AppI18NextNamespace, unknown> = {
  login: ruLogin,
  requests: ruRequests,
};
