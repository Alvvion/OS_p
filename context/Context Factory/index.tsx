import { createContext, useContext } from "react";

import type { ChildrenProp } from "@/types/common";

import type { ContextFactory } from "./types";

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