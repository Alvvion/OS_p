import type { Processes } from "@/types/contexts/process";

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
  (processId: string, setting: "maximized" | "minimized") =>
  ({ [processId]: process, ...otherProcesses }: Processes): Processes =>
    process
      ? {
          [processId]: { ...process, [setting]: !process[setting] },
          ...otherProcesses,
        }
      : otherProcesses;

export const maximizeProcess =
  (processId: string) =>
  (processes: Processes): Processes =>
    toggleProcessSetting(processId, "maximized")(processes);

export const minimizeProcess =
  (processId: string) =>
  (processes: Processes): Processes =>
    toggleProcessSetting(processId, "minimized")(processes);
