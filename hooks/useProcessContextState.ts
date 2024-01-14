import { useCallback, useState } from "react";

import type { ProcessContextType, Processes } from "@/types/contexts/process";
import {
  getProcess,
  PINNED_PROCESSES,
  processDir,
  STARTUP_PROCESSES,
} from "@/utils/processDir";

const useProcessContextState = (): ProcessContextType => {
  const closingProcess =
    (processId: string) =>
    ({ [processId]: _closedProcess, ...remaingProcesses }): Processes =>
      remaingProcesses;

  const openingProcess =
    (processId: string) =>
    (currentProcesses: Processes): Processes =>
      currentProcesses[processId] || !processDir[processId]
        ? currentProcesses
        : {
            ...currentProcesses,
            [processId]: processDir[processId],
          };

  const [processes, setProcesses] = useState<Processes>(
    getProcess(STARTUP_PROCESSES)
  );
  const [pinnedProcesses] = useState<Processes>(getProcess(PINNED_PROCESSES));

  const closeProcess = useCallback(
    (processId: string) => setProcesses(closingProcess(processId)),
    []
  );

  const openProcess = useCallback(
    (processId: string) => setProcesses(openingProcess(processId)),
    []
  );
  const closePinnedProcess = () => {};

  const openPinnedProcess = () => {};

  return {
    closeProcess,
    closePinnedProcess,
    openProcess,
    openPinnedProcess,
    processes,
    pinnedProcesses,
  };
};

export default useProcessContextState;
