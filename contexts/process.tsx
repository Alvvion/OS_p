"use client";

// eslint-disable-next-line object-curly-newline
import type { FC } from "react";
import { createContext } from "react";

import useProcessContextState from "@/hooks/useProcessContextState";
import type {
  ProcessContextType,
  ProcessProviderProps,
} from "@/types/contexts/process";
import { initalProcessState } from "@/utils/intialContextStates";

export const ProcessContext =
  createContext<ProcessContextType>(initalProcessState);

export const ProcessProvider: FC<ProcessProviderProps> = ({
  children,
  startupProcesses,
}) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <ProcessContext.Provider value={useProcessContextState(startupProcesses)}>
    {children}
  </ProcessContext.Provider>
);
