import { PROCESS_DELIMITER } from "@/utils/constants";

import { processDir } from "./directory";
import type { Process, ProcessElement, Processes } from "./types";

export const closingProcess =
  (processId: string) =>
  ({ [processId]: _closedProcess, ...remaingProcesses }): Processes =>
    remaingProcesses;

export const createPid = (processId: string, url?: string): string =>
  url ? `${processId}${PROCESS_DELIMITER}${url}` : processId;

export const setProcessSetting =
  (processId: string, setting: Partial<Process>) =>
  (currentProcesses: Processes): Processes => {
    const { ...newProcesses } = currentProcesses;

    newProcesses[processId] = {
      ...newProcesses[processId],
      ...setting,
    };

    return newProcesses;
  };

export const openingProcess =
  (processId: string, url?: string) =>
  (currentProcesses: Processes): Processes => {
    const id = createPid(processId, url);
    return currentProcesses[id] || !processDir[processId]
      ? currentProcesses
      : {
          ...currentProcesses,
          [id]: {
            ...processDir[processId],
            url,
          },
        };
  };

export const maximizeProcess =
  (processId: string) =>
  (currentProcesses: Processes): Processes =>
    setProcessSetting(processId, {
      maximized: !currentProcesses[processId].maximized,
    })(currentProcesses);

export const minimizeProcess =
  (processId: string) =>
  (currentProcesses: Processes): Processes =>
    setProcessSetting(processId, {
      minimized: !currentProcesses[processId].minimized,
    })(currentProcesses);

export const setProcessElement =
  (processId: string, name: keyof ProcessElement, element: HTMLElement) =>
  (currentProcesses: Processes) =>
    setProcessSetting(processId, { [name]: element })(currentProcesses);

export const setTitle =
  (processId: string, title: string) =>
  (currentProcesses: Processes): Processes =>
    setProcessSetting(processId, { title })(currentProcesses);
