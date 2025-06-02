"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, refreshToken } from "@/utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken as setReduxAccessToken } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { setUser, UserState } from "@/redux/userSlice";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const setAccessToken = (token: string | null) => {
    dispatch(setReduxAccessToken(token));
  };

  const setCurrentUser = (user: UserState) => {
    dispatch(setUser(user));
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await refreshToken();
        setAccessToken(token);
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to refresh token", error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    fetchToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
