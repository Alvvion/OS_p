import type { ComponentType, ReactNode } from "react";

export type Process = {
  Component: ComponentType;
  hasWindow?: boolean;
};

export type Processes = {
  [id: string]: Process;
};

export type ProcessContextType = {
  processes: Processes | Record<string, never>;
};

export type ProcessProviderProps = {
  children: ReactNode;
  startupProcesses: Processes;
};
