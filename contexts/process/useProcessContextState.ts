import { useCallback, useState } from "react";

import {
  getProcess,
  PINNED_PROCESSES,
  STARTUP_PROCESSES,
} from "@/contexts/process/directory";
import {
  closingProcess,
  maximizeProcess,
  minimizeProcess,
  openingProcess,
  setProcessElement,
} from "@/contexts/process/functions";
import type {
  ProcessContextType,
  ProcessElement,
  Processes,
} from "@/types/contexts/process";

const useProcessContextState = (): ProcessContextType => {
  const [processes, setProcesses] = useState<Processes>(
    getProcess(STARTUP_PROCESSES)
  );

  const closeProcess = useCallback(
    (processId: string) => setProcesses(closingProcess(processId)),
    []
  );

  const openProcess = useCallback(
    (processId: string, url?: string) =>
      setProcesses(openingProcess(processId, url)),
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

  const linkElement = useCallback(
    (id: string, name: keyof ProcessElement, element: HTMLElement) =>
      setProcesses(setProcessElement(id, name, element)),
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
    linkElement,
  };
};

export default useProcessContextState;
