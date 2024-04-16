import type { ComponentProps } from "../components/system/Window";

export type ProcessElement = {
  taskbarEntry?: HTMLElement;
};

export type ProcessToggle = {
  maximized?: boolean;
  minimized?: boolean;
};

export type Process = ProcessElement &
  ProcessToggle & {
    Component: React.ComponentType<ComponentProps>;
    hasWindow?: boolean;
    icon: string;
    autoSizing?: boolean;
    title: string;
    url?: string;
    backgroundColor?: string;
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
  openProcess: (processId: string, url?: string) => void;
  closeProcess: (processId: string) => void;
  closePinnedProcess: (processId: string) => void;
  openPinnedProcess: (processId: string) => void;
  maximize: (id: string) => void;
  minimize: (id: string) => void;
  linkElement: (id: string, name: keyof ProcessElement, element: HTMLElement) => void;
};

export type ProcessProviderProps = {
  children: React.ReactNode;
  startupProcesses: Processes;
};
