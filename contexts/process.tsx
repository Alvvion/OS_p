import useProcessContextState from "@/hooks/useProcessContextState";
import type { ProcessContextType } from "@/types/contexts/process";
import contextFactory from "@/utils/contextFactory";
import { initalProcessState } from "@/utils/intialContextStates";

const { context, Provider } = contextFactory<ProcessContextType>(
  initalProcessState,
  useProcessContextState
);

export { context as ProcessContext, Provider as ProcessProvider };
