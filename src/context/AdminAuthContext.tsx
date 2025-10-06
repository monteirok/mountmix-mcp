/* eslint-disable react-refresh/only-export-components */

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import type { AdminSummary } from "@/types/booking";

interface AdminAuthState {
  token: string;
  admin: AdminSummary;
}

type NullableAuthState = AdminAuthState | null;

interface AdminAuthContextValue {
  auth: NullableAuthState;
  setAuth: (value: NullableAuthState) => void;
  logout: () => void;
}

const STORAGE_KEY = "mountmix-admin-auth";

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined
);

const readFromStorage = (): NullableAuthState => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as AdminAuthState;
  } catch (error) {
    console.warn("[admin-auth] Unable to parse stored credentials", error);
    return null;
  }
};

export const AdminAuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuthState] = useState<NullableAuthState>(() => readFromStorage());

  useEffect(() => {
    if (auth) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [auth]);

  const setAuth = useCallback((value: NullableAuthState) => {
    setAuthState(value);
  }, []);

  const logout = useCallback(() => {
    setAuthState(null);
  }, []);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      logout
    }),
    [auth, logout, setAuth]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = (): AdminAuthContextValue => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
