import { createContext, useContext } from "react";

import type { ChildrenProp } from "@/components/common/types";

import type { ContextFactory } from "./types";

const contextFactory: ContextFactory = (
  initialContextState,
  useContextState,
  ContextComponent
) => {
  const Context = createContext(initialContextState);

  const Provider: React.FC<ChildrenProp> = ({ children }) => (
    <Context.Provider value={useContextState()}>
      {children}
      {ContextComponent ? <ContextComponent /> : null}
    </Context.Provider>
  );

  return { Provider, useContext: () => useContext(Context) };
};

export default contextFactory;
