import type { ComponentProps } from "@/components/common/types";

export type ProcessElement = {
  taskbarEntry?: HTMLElement;
  componentWindow?: HTMLElement;
};

export type Process = ProcessElement & {
  autoSizing?: boolean;
  backgroundColor?: string;
  closing?: boolean;
  Component: React.ComponentType<ComponentProps>;
  hasWindow?: boolean;
  icon: string;
  lockAspectRatio?: boolean;
  maximized?: boolean;
  minimized?: boolean;
  singleton?: boolean;
  title: string;
  titlebarStyle?: "File Explorer" | "Default";
  url?: string;
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
  openProcess: (processId: string, url?: string) => void;
  closeProcess: (processId: string, closing?: boolean) => void;
  maximize: (id: string) => void;
  minimize: (id: string) => void;
  linkElement: (
    id: string,
    name: keyof ProcessElement,
    element: HTMLElement
  ) => void;
  title: (id: string, newTitle: string) => void;
};

export type ProcessProviderProps = {
  children: React.ReactNode;
  startupProcesses: Processes;
};
