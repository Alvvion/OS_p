"use client";

import { createContext, useContext } from "react";

import type { ContextFactory } from "@/types/contexts/contextFactory";
import type { ChildrenProp } from "@/types/genric/ChildrenAsProps";

const contextFactory: ContextFactory = (
  initialContextState,
  useContextState
) => {
  const Context = createContext(initialContextState);

  const Provider: React.FC<ChildrenProp> = ({ children }) => (
    <Context.Provider value={useContextState()}>{children}</Context.Provider>
  );

  return { Provider, useContext: () => useContext(Context) };
};

export default contextFactory;
