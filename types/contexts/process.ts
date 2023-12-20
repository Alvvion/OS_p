import type { ComponentType } from "react";

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
