import axios, { isAxiosError } from "axios";

import { API_BASE_URL, AUTH_SESSION_EXPIRED_EVENT } from "@/constants/config";

import { ApiError } from "./apiError";

type ApiErrorBody = {
  error?: {
    code?: string;
    message?: string;
  };
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type RetryableRequestConfig = {
  _authRetry?: boolean;
  url?: string;
};

let refreshSessionPromise: Promise<void> | null = null;

function notifySessionExpired() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT));
  }
}

async function refreshAuthSession(): Promise<void> {
  await apiClient.post("/api/auth/refresh");
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!isAxiosError(error)) {
      return Promise.reject(toApiError(error));
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._authRetry
    ) {
      return Promise.reject(toApiError(error));
    }

    const requestUrl = originalRequest.url ?? "";

    if (
      requestUrl.includes("/api/auth/refresh") ||
      requestUrl.includes("/api/auth/login") ||
      requestUrl.includes("/api/auth/register") ||
      requestUrl.includes("/api/auth/logout") ||
      requestUrl.includes("/api/auth/me")
    ) {
      if (requestUrl.includes("/api/auth/refresh")) {
        notifySessionExpired();
      }

      return Promise.reject(toApiError(error));
    }

    originalRequest._authRetry = true;

    try {
      if (!refreshSessionPromise) {
        refreshSessionPromise = refreshAuthSession().finally(() => {
          refreshSessionPromise = null;
        });
      }

      await refreshSessionPromise;
      return apiClient.request(originalRequest);
    } catch {
      notifySessionExpired();
      return Promise.reject(toApiError(error));
    }
  }
);

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
      "Failed to connect to API";

    return new ApiError(status, code, message);
  }

  if (error instanceof Error) {
    return new ApiError(500, "UNKNOWN_ERROR", error.message);
  }

  return new ApiError(500, "UNKNOWN_ERROR", "An unknown error occurred");
}
