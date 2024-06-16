import contextFactory from "../Context Factory";
import type { ProcessContextType } from "./types";
import useProcessContextState from "./useProcessContextState";

const { Provider, useContext } = contextFactory<ProcessContextType>(
  useProcessContextState
);

export { Provider as ProcessProvider, useContext as useProcesses };
