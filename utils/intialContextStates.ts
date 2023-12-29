import type { ProcessContextType } from "@/types/contexts/process";
import type { SessionContextType } from "@/types/contexts/sessions";
import { FileSystemStateType } from "@/types/hooks/FileSystemState";

export const initalProcessState: ProcessContextType = {
  processes: {},
  pinnedProcesses: {},
};

export const initialSessionState: SessionContextType = {
  themeName: "",
  setThemeName: () => undefined,
};

export const initalFileSystemState: FileSystemStateType = {
  fs: null,
};
