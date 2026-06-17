import axios, { isAxiosError } from "axios";

import { API_BASE_URL } from "@/constants/config";

import { ApiError } from "./apiError";

type ApiErrorBody = {
  error?: {
    code?: string;
    message?: string;
  };
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (isAxiosError<ApiErrorBody>(error)) {
    const status = error.response?.status ?? 500;
    const code = error.response?.data?.error?.code ?? "REQUEST_FAILED";
    const message =
      error.response?.data?.error?.message ??
      error.message ??
      "เกิดข้อผิดพลาดในการเชื่อมต่อ API";

    return new ApiError(status, code, message);
  }

  if (error instanceof Error) {
    return new ApiError(500, "UNKNOWN_ERROR", error.message);
  }

  return new ApiError(500, "UNKNOWN_ERROR", "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
}
