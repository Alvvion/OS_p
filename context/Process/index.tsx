import contextFactory from "../Context Factory";
import { initalProcessState } from "../Context Factory/initialContextStates";
import type { ProcessContextType } from "./types";
import useProcessContextState from "./useProcessContextState";

const { Provider, useContext } = contextFactory<ProcessContextType>(
  initalProcessState,
  useProcessContextState
);

export { Provider as ProcessProvider, useContext as useProcesses };
