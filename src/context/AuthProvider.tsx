"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "@/lib/api/auth";
import { AUTH_LOGOUT_FLAG, AUTH_SESSION_EXPIRED_EVENT } from "@/constants/config";
import { ApiError } from "@/lib/api/apiError";
import type { UserProfile } from "@/types/auth";

async function verifySessionAfterAuth(): Promise<UserProfile> {
  try {
    return await fetchCurrentUser();
  } catch {
    throw new ApiError(
      401,
      "SESSION_NOT_PERSISTED",
      "Unable to start a session. Please allow cookies for this site and try signing in again."
    );
  }
}

type AuthContextValue = {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<UserProfile>;
  register: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<UserProfile>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authGenerationRef = useRef(0);

  const refresh = useCallback(async () => {
    const generation = authGenerationRef.current;

    try {
      const profile = await fetchCurrentUser();

      if (generation === authGenerationRef.current) {
        setUser(profile);
      }
    } catch {
      if (generation === authGenerationRef.current) {
        setUser(null);
      }
    } finally {
      if (generation === authGenerationRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem(AUTH_LOGOUT_FLAG) === "1"
    ) {
      sessionStorage.removeItem(AUTH_LOGOUT_FLAG);
      setUser(null);
      setIsLoading(false);
      return;
    }

    refresh();
  }, [refresh]);

  useEffect(() => {
    const handleSessionExpired = () => {
      authGenerationRef.current += 1;
      setUser(null);
      setIsLoading(false);
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);

    return () => {
      window.removeEventListener(
        AUTH_SESSION_EXPIRED_EVENT,
        handleSessionExpired
      );
    };
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const intervalMs = 45 * 60 * 1000;
    const intervalId = window.setInterval(() => {
      refresh();
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [user, refresh]);

  const login = useCallback(async (email: string, password: string) => {
    authGenerationRef.current += 1;
    await loginUser({ email, password });
    const profile = await verifySessionAfterAuth();
    setUser(profile);
    setIsLoading(false);
    return profile;
  }, []);

  const register = useCallback(
    async (email: string, password: string, displayName: string) => {
      authGenerationRef.current += 1;
      await registerUser({ email, password, displayName });
      const profile = await verifySessionAfterAuth();
      setUser(profile);
      setIsLoading(false);
      return profile;
    },
    []
  );

  const logout = useCallback(async () => {
    authGenerationRef.current += 1;

    if (typeof window !== "undefined") {
      sessionStorage.setItem(AUTH_LOGOUT_FLAG, "1");
    }

    await logoutUser();
    setUser(null);
    setIsLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
      refresh,
    }),
    [user, isLoading, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
