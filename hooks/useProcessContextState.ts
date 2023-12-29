import { useState } from "react";

import { type ProcessContextType, Processes } from "@/types/contexts/process";
import {
  getProcess,
  PINNED_PROCESSES,
  STARTUP_PROCESSES,
} from "@/utils/processDir";

const useProcessContextState = (): ProcessContextType => {
  const [processes] = useState<Processes>(getProcess(STARTUP_PROCESSES));
  const [pinnedProcesses] = useState<Processes>(getProcess(PINNED_PROCESSES));

  return { processes, pinnedProcesses };
};

export default useProcessContextState;
