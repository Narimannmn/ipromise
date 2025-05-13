import axios from "axios";
import { t } from "i18next";
import { toast } from "react-toastify";
import { statusCodes } from "../config/error/error";
import { appEnv } from "../env/appEnv";
import { BackendCustomErrorSchema } from "../schemas/error/error";

const ONE_MINUTE = 60_000;
export const instance = axios.create({
  baseURL: appEnv.VITE_API_URL,
  timeout: ONE_MINUTE,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      throw new Error(t("unknownEror", { ns: "requests" }));
    }
    if (error.response) {
      const backendCustomErrorParseResult = BackendCustomErrorSchema.safeParse(
        error.response.data,
      );
      if (backendCustomErrorParseResult.success) {
        const errorMessage = backendCustomErrorParseResult.data.message;
        toast.error(errorMessage);
        throw new Error(statusCodes[error.response.status]);
      }
      throw new Error(statusCodes[error.response.status]);
    }
    if (error.request) {
      toast.error("Backend is not responding");
      throw new Error("Backend is not responding");
    }
    throw new Error("Axios or fetch error");
  },
);
