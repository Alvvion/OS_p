"use client";

// eslint-disable-next-line object-curly-newline
import type { FC } from "react";
import { createContext } from "react";

import useProcessContextState from "@/hooks/useProcessContextState";
import type { ProcessContextType } from "@/types/contexts/process";
import type { ChildrenProp } from "@/types/genric/ChildrenAsProps";
import { initalProcessState } from "@/utils/intialContextStates";
import processDir from "@/utils/processDir";

export const ProcessContext =
  createContext<ProcessContextType>(initalProcessState);

export const ProcessProvider: FC<ChildrenProp> = ({ children }) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <ProcessContext.Provider value={useProcessContextState(processDir)}>
    {children}
  </ProcessContext.Provider>
);
