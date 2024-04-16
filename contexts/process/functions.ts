import type {
  Process,
  ProcessElement,
  Processes,
  ProcessToggle,
} from "@/types/contexts/process";

import { processDir } from "./directory";

export const closingProcess =
  (processId: string) =>
  ({ [processId]: _closedProcess, ...remaingProcesses }): Processes =>
    remaingProcesses;

export const createPid = (processId: string, url?: string): string =>
  url ? `${processId}_${url}` : processId;

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

export const toggleProcessSetting =
  (processId: string, setting: keyof ProcessToggle) =>
  (currentProcesses: Processes): Processes => {
    const updatedProcesses: Processes = {};

    Object.keys(currentProcesses).forEach((key) => {
      if (key === processId) {
        updatedProcesses[key] = {
          ...currentProcesses[key],
          [setting]: !currentProcesses[processId][setting],
        };
      } else {
        updatedProcesses[key] = currentProcesses[key];
      }
    });

    return updatedProcesses;
  };

export const maximizeProcess =
  (processId: string) =>
  (processes: Processes): Processes =>
    toggleProcessSetting(processId, "maximized")(processes);

export const minimizeProcess =
  (processId: string) =>
  (processes: Processes): Processes =>
    toggleProcessSetting(processId, "minimized")(processes);

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

export const setProcessElement =
  (processId: string, name: keyof ProcessElement, element: HTMLElement) =>
  (currentProcesses: Processes) =>
    setProcessSetting(processId, { [name]: element })(currentProcesses);
