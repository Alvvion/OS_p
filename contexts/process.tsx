"use client";

// eslint-disable-next-line object-curly-newline
import type { FC, ReactNode } from "react";
import { createContext } from "react";

import useProcessContextState from "@/hooks/useProcessContextState";
import type { ProcessContextType } from "@/types/contexts/process";
import processDir from "@/utils/processDir";

export const ProcessContext = createContext<ProcessContextType>({
  processes: {},
});

export const ProcessProvider: FC<{ children: ReactNode }> = ({ children }) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <ProcessContext.Provider value={useProcessContextState(processDir)}>
    {children}
  </ProcessContext.Provider>
);
