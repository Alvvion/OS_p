import { useCallback, useState } from "react";

import { getProcess, STARTUP_PROCESSES } from "./directory";
import {
  closingProcess,
  maximizeProcess,
  minimizeProcess,
  openingProcess,
  setProcessElement,
  setTitle,
  setUrl,
} from "./functions";
import type { ProcessContextType, ProcessElement, Processes } from "./types";

const useProcessContextState = (): ProcessContextType => {
  const [processes, setProcesses] = useState<Processes>(
    getProcess(STARTUP_PROCESSES),
  );

  const closeProcess = useCallback(
    (processId: string, closing?: boolean) =>
      setProcesses(closingProcess(processId, closing)),
    [],
  );

  const openProcess = useCallback(
    (processId: string, url: string, icon?: string) =>
      setProcesses(openingProcess(processId, url, icon)),
    [],
  );

  // const [pinnedProcesses] = useState<Processes>(getProcess(PINNED_PROCESSES));
  // const closePinnedProcess = () => {};

  // const openPinnedProcess = () => {};

  const minimize = useCallback(
    (id: string) => setProcesses(minimizeProcess(id)),
    [],
  );
  const maximize = useCallback(
    (id: string) => setProcesses(maximizeProcess(id)),
    [],
  );

  const linkElement = useCallback(
    (id: string, name: keyof ProcessElement, element: HTMLElement) =>
      setProcesses(setProcessElement(id, name, element)),
    [],
  );

  const title = useCallback(
    (id: string, newTitle: string) => setProcesses(setTitle(id, newTitle)),
    [],
  );

  const url = useCallback(
    (id: string, newUrl: string) => setProcesses(setUrl(id, newUrl)),
    [],
  );

  return {
    closeProcess,
    openProcess,
    processes,
    maximize,
    minimize,
    linkElement,
    title,
    url,
  };
};

export default useProcessContextState;
