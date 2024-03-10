import type { Processes } from "@/types/contexts/process";

import { processDir } from "./processDir";

export const closingProcess =
  (processId: string) =>
  ({ [processId]: _closedProcess, ...remaingProcesses }): Processes =>
    remaingProcesses;

export const openingProcess =
  (processId: string, url: string) =>
  (currentProcesses: Processes): Processes => {
    const id = url ? `${processId}_${url}` : processId;
    return currentProcesses[id] || !processDir[id]
      ? currentProcesses
      : {
          ...currentProcesses,
          [id]: {
            ...processDir[id],
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
