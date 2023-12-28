"use client";

import { createContext } from "react";

import type { ContextFactory } from "@/types/contexts/contextFactory";
import type { ChildrenProp } from "@/types/genric/ChildrenAsProps";

const contextFactory: ContextFactory = (
  initialContextState,
  useContextState
) => {
  const context = createContext(initialContextState);

  const Provider: React.FC<ChildrenProp> = ({ children }) => (
    <context.Provider value={useContextState()}>{children}</context.Provider>
  );

  return { context, Provider };
};

export default contextFactory;
