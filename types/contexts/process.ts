export type Process = {
  Component: React.ComponentType;
  hasWindow?: boolean;
  icon: string;
  isPinned?: boolean;
};

export type Processes = {
  [id: string]: Process;
};

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
