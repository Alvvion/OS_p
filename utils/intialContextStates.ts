import type { ProcessContextType } from "@/types/contexts/process";
import type { SessionContextType } from "@/types/contexts/sessions";
import type { FileSystemStateType } from "@/types/hooks/FileSystemState";

export const initalProcessState: ProcessContextType = {
  closeProcess: () => undefined,
  closePinnedProcess: () => undefined,
  openProcess: () => undefined,
  openPinnedProcess: () => undefined,
  processes: {},
  pinnedProcesses: {},
  maximize: () => undefined,
  minimize: () => undefined,
};

export const initialSessionState: SessionContextType = {
  themeName: "",
  setThemeName: () => undefined,
};

export const initalFileSystemState: FileSystemStateType = {
  fs: null,
};

export const defaultWindowSize = {
  height: "400px",
  width: "450px",
};

export const defaultWindowPosition = {
  x: 0,
  y: 0,
};
