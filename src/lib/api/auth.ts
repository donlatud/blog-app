import type { UserProfile } from "@/types/auth";

import { apiClient, toApiError } from "./client";

type AuthResponse = {
  data: UserProfile;
};

type RegisterPayload = {
  email: string;
  password: string;
  displayName: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export async function registerUser(
  payload: RegisterPayload
): Promise<UserProfile> {
  try {
    const { data } = await apiClient.post<AuthResponse>("/api/auth/register", {
      email: payload.email,
      password: payload.password,
      displayName: payload.displayName,
    });
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function loginUser(payload: LoginPayload): Promise<UserProfile> {
  try {
    const { data } = await apiClient.post<AuthResponse>("/api/auth/login", payload);
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await apiClient.post("/api/auth/logout");
  } catch (error) {
    throw toApiError(error);
  }
}

export async function fetchCurrentUser(): Promise<UserProfile> {
  try {
    const { data } = await apiClient.get<AuthResponse>("/api/auth/me");
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function refreshAuthSession(): Promise<UserProfile> {
  try {
    const { data } = await apiClient.post<AuthResponse>("/api/auth/refresh");
    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}
