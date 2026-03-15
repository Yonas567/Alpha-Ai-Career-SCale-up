"use client";

import { createContext, ReactNode, useContext } from "react";
import { Role } from "../types";

export type DashboardContextType = {
  id?: string;
  fullName: string;
  role: Role;
  onBoardingStatus: boolean;
};

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider"
    );
  }
  return context;
}

export default function DashboardContextProvider({
  children,
  id,
  fullName,
  role,
  onBoardingStatus,
}: {
  id?:string;
  children: ReactNode;
  fullName: string;
  role: Role;
  onBoardingStatus: boolean;
}) {
  return (
    <DashboardContext.Provider value={{ id, fullName, role, onBoardingStatus }}>
      {children}
    </DashboardContext.Provider>
  );
}
