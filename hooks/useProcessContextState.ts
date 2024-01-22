import { useCallback, useState } from "react";

import type { ProcessContextType, Processes } from "@/types/contexts/process";
import {
  getProcess,
  PINNED_PROCESSES,
  STARTUP_PROCESSES,
} from "@/utils/processDir";
import {
  closingProcess,
  maximizeProcess,
  minimizeProcess,
  openingProcess,
} from "@/utils/processFunctions";

const useProcessContextState = (): ProcessContextType => {
  const [processes, setProcesses] = useState<Processes>(
    getProcess(STARTUP_PROCESSES)
  );

  const closeProcess = useCallback(
    (processId: string) => setProcesses(closingProcess(processId)),
    []
  );

  const openProcess = useCallback(
    (processId: string) => setProcesses(openingProcess(processId)),
    []
  );

  const [pinnedProcesses] = useState<Processes>(getProcess(PINNED_PROCESSES));
  const closePinnedProcess = () => {};

  const openPinnedProcess = () => {};

  const minimize = useCallback(
    (id: string) => setProcesses(minimizeProcess(id)),
    []
  );
  const maximize = useCallback(
    (id: string) => setProcesses(maximizeProcess(id)),
    []
  );

  return {
    closeProcess,
    closePinnedProcess,
    openProcess,
    openPinnedProcess,
    processes,
    pinnedProcesses,
    maximize,
    minimize,
  };
};

export default useProcessContextState;
