import type { ComponentProps, Size } from "@/components/common/types";

export type ProcessElement = {
  taskbarEntry?: HTMLElement;
  componentWindow?: HTMLElement;
  peekElement?: HTMLElement;
};

export type Process = ProcessElement & {
  autoSizing?: boolean;
  backgroundColor?: string;
  closing?: boolean;
  Component: React.ComponentType<ComponentProps>;
  defaultSize?: Size;
  hasWindow?: boolean;
  icon: string;
  lockAspectRatio?: boolean;
  maximized?: boolean;
  minimized?: boolean;
  prependTaskbarTitle?: boolean;
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
  processesObj: Processes,
) => React.FC[];

export type ProcessContextType = {
  processes: Processes | Record<string, never>;
  openProcess: (processId: string, url: string, icon?: string) => void;
  closeProcess: (processId: string, closing?: boolean) => void;
  maximize: (id: string) => void;
  minimize: (id: string) => void;
  linkElement: (
    id: string,
    name: keyof ProcessElement,
    element: HTMLElement,
  ) => void;
  title: (id: string, newTitle: string) => void;
  url: (id: string, newUrl: string) => void;
};

export type ProcessProviderProps = {
  children: React.ReactNode;
  startupProcesses: Processes;
};
