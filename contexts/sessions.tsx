"use client";

// eslint-disable-next-line object-curly-newline
import { createContext } from "react";

import useSessionContextState from "@/hooks/useSessionContextState";
import type { SessionContextType } from "@/types/contexts/sessions";
import { initialSessionState } from "@/utils/intialContextStates";

export const SessionContext =
  createContext<SessionContextType>(initialSessionState);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <SessionContext.Provider value={useSessionContextState()}>
    {children}
  </SessionContext.Provider>
);
