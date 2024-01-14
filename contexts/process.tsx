import useProcessContextState from "@/hooks/useProcessContextState";
import type { ProcessContextType } from "@/types/contexts/process";
import contextFactory from "@/utils/contextFactory";
import { initalProcessState } from "@/utils/intialContextStates";

const { Provider, useContext } = contextFactory<ProcessContextType>(
  initalProcessState,
  useProcessContextState
);

export { Provider as ProcessProvider, useContext as useProcesses };
