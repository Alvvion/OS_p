import type { Position, Size } from "../components/system/Window";

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
  setStackOrder: React.Dispatch<React.SetStateAction<string[]>>;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  setWindowStates: React.Dispatch<React.SetStateAction<WindowStates>>;
};
