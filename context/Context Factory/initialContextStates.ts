import type { FileSystemStateType } from "../FileSystem/types";
import type { ProcessContextType } from "../Process/types";
import type { SessionContextType } from "../Session/types";
import themes from "../Theme/themes";

export const initalProcessState: ProcessContextType = {
  closeProcess: () => undefined,
  closePinnedProcess: () => undefined,
  openProcess: () => undefined,
  openPinnedProcess: () => undefined,
  processes: {},
  pinnedProcesses: {},
  maximize: () => undefined,
  minimize: () => undefined,
  linkElement: () => undefined,
};

export const initialSessionState: SessionContextType = {
  themeName: "",
  windowStates: {},
  setWindowStates: () => undefined,
  setThemeName: () => undefined,
  foregroundId: "",
  setForegroundId: () => undefined,
  setStackOrder: () => undefined,
  stackOrder: [],
};

export const initialThemeState = {
  currentTheme: themes.default,
  setCurrentTheme: () => undefined,
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
