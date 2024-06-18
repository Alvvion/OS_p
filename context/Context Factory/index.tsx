import { createContext, useContext } from "react";

import type { ChildrenProp } from "@/components/common/types";

const contextFactory = <T,>(
  useContextState: () => T,
  ContextComponent?: React.ComponentType
) => {
  const Context = createContext<T>({} as T);

  const Provider: React.FC<ChildrenProp> = ({ children }) => (
    <Context.Provider value={useContextState()}>
      {children}
      {ContextComponent ? <ContextComponent /> : undefined}
    </Context.Provider>
  );

  return { Provider, useContext: () => useContext(Context) };
};

export default contextFactory;
