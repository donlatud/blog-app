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
import type { UserProfile } from "@/types/auth";

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
    refresh();
  }, [refresh]);

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
    const profile = await loginUser({ email, password });
    setUser(profile);
    setIsLoading(false);
    return profile;
  }, []);

  const register = useCallback(
    async (email: string, password: string, displayName: string) => {
      authGenerationRef.current += 1;
      const profile = await registerUser({ email, password, displayName });
      setUser(profile);
      setIsLoading(false);
      return profile;
    },
    []
  );

  const logout = useCallback(async () => {
    authGenerationRef.current += 1;
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
