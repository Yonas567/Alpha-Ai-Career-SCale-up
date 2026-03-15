"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { roleMap } from "../constants";
import { AuthContextType, Role, UserRegistrationData } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [userRegistrationData, setuserRegistrationData] =
    useState<UserRegistrationData | null>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      return;
    }
    setuserRegistrationData(data);

    router.push(roleMap[data.role] || "/auth");
  };

  const sendOtpVerificationCode = async (
    fullName: string,
    email: string,
    password: string,
    role: Role
  ) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password, role }),
    });
    const data = await response.json();

    if (!data.statusCode || data.statusCode !== 200) {
      throw new Error(data.message || "Registration failed");
    }
    setuserRegistrationData({ fullName, email, password, role });
    router.push(roleMap[data.role] || "/auth/verify-otp");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const forgotPassword = async (
    email: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });
  };

  const verifyAndRegisterUser = async ({
    fullName,
    email,
    password,
    role,
    otp,
  }: UserRegistrationData) => {
    await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password, role, otp }),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userRegistrationData,
        login,
        sendOtpVerificationCode,
        logout,
        forgotPassword,
        verifyAndRegisterUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
