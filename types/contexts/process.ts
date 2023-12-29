export type Process = {
  Component: React.ComponentType;
  hasWindow?: boolean;
  icon: string;
};

export type Processes = {
  [id: string]: Process;
};

export type ProcessContextType = {
  processes: Processes | Record<string, never>;
  pinnedProcesses: Processes | Record<string, never>;
};

export type ProcessProviderProps = {
  children: React.ReactNode;
  startupProcesses: Processes;
};
