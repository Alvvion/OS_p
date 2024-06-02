import type { Position, Size } from "@/types/common";

export type WindowState = {
  position?: Position;
  size?: Size;
};

export type WindowStates = {
  [id: string]: WindowState;
};

export type SessionContextType = {
  themeName: string;
  windowStates: WindowStates;
  foregroundId: string;
  setForegroundId: React.Dispatch<React.SetStateAction<string>>;
  stackOrder: string[];
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  setWindowStates: React.Dispatch<React.SetStateAction<WindowStates>>;
  startMenuVisible: boolean;
  toggleStartMenu: (showMenu?: boolean) => void;
  prependToStack: (id: string) => void;
  removeFromStack: (id: string) => void;
};
