import contextFactory from "@/contexts/contextFactory";
import { initalProcessState } from "@/contexts/intialContextStates";
import useProcessContextState from "@/contexts/process/useProcessContextState";
import type { ProcessContextType } from "@/types/contexts/process";

const { Provider, useContext } = contextFactory<ProcessContextType>(
  initalProcessState,
  useProcessContextState
);

export { Provider as ProcessProvider, useContext as useProcesses };
