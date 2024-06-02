import type { FileSystemStateType } from "../FileSystem/types";
import type { MenuContextType } from "../Menu/types";
import type { ProcessContextType } from "../Process/types";
import type { SessionContextType } from "../Session/types";
import themes from "../Theme/themes";

export const initalProcessState: ProcessContextType = {
  closeProcess: () => undefined,
  openProcess: () => undefined,
  processes: {},
  maximize: () => undefined,
  minimize: () => undefined,
  linkElement: () => undefined,
  title: () => undefined,
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
  startMenuVisible: false,
  toggleStartMenu: () => undefined,
  prependToStack: () => undefined,
  removeFromStack: () => undefined,
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

export const initialMenuState: MenuContextType = {
  menu: {},
  setMenu: () => undefined,
  contextMenu: () => () => undefined,
};
