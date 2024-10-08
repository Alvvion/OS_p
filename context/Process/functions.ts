import { PREVENT_SCROLL, PROCESS_DELIMITER } from "@/utils/constants";

import { processDir } from "./directory";
import type { Process, ProcessElement, Processes } from "./types";

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

export const closingProcess =
  (processId: string, closing?: boolean) =>
  (currentProcesses: Processes): Processes => {
    if (closing) {
      return setProcessSetting(processId, { closing })(currentProcesses);
    }
    const { [processId]: _closedProcess, ...remainingProcesses } =
      currentProcesses;

    return remainingProcesses;
  };

export const createPid = (processId: string, url?: string): string =>
  url ? `${processId}${PROCESS_DELIMITER}${url}` : processId;

export const openingProcess =
  (processId: string, url: string, icon?: string) =>
  (currentProcesses: Processes): Processes => {
    const { singleton } = processDir[processId] || {};

    if (singleton && Object.keys(currentProcesses).includes(processId))
      return setProcessSetting(processId, { url })(currentProcesses);

    const id = singleton ? processId : createPid(processId, url);

    if (currentProcesses[id]) {
      const { componentWindow } = currentProcesses[id];

      componentWindow?.focus(PREVENT_SCROLL);

      return currentProcesses;
    }

    return processDir[processId]
      ? {
          ...currentProcesses,
          [id]: {
            ...processDir[processId],
            ...(typeof icon === "string" && { icon }),
            url,
          },
        }
      : currentProcesses;
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

export const setUrl =
  (processId: string, url: string) =>
  (currentProcesses: Processes): Processes =>
    setProcessSetting(processId, { url })(currentProcesses);

export const setIcon =
  (processId: string, icon: string) =>
  (currentProcesses: Processes): Processes =>
    setProcessSetting(processId, { icon })(currentProcesses);
