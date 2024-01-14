export type Process = {
  Component: React.ComponentType;
  hasWindow?: boolean;
  icon: string;
  isPinned?: boolean;
};

export type Processes = {
  [id: string]: Process;
};

export type ProcessMap = (
  callback: ([id, process]: [string, Process]) => React.FC,
  processesObj: Processes
) => React.FC[];

export type ProcessContextType = {
  processes: Processes | Record<string, never>;
  pinnedProcesses: Processes | Record<string, never>;
  openProcess: (processId: string) => void;
  closeProcess: (processId: string) => void;
  closePinnedProcess: (processId: string) => void;
  openPinnedProcess: (processId: string) => void;
};

export type ProcessProviderProps = {
  children: React.ReactNode;
  startupProcesses: Processes;
};
