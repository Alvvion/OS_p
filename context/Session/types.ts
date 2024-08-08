import type { Position, Size } from "@/components/common/types";

export type WindowState = {
  position?: Position;
  size?: Size;
};

export type WindowStates = {
  [id: string]: WindowState;
};

export type WallpaperFit = "fill" | "fit" | "stretch" | "tile" | "center";

export type SortOrders = Record<string, string[]>;

export type SessionData = {
  sortOrders: SortOrders;
  themeName: string;
  wallpaperFit: WallpaperFit;
  wallpaperImage: string;
  windowStates: WindowStates;
};

export type SessionContextType = SessionData & {
  blurEntry: (entry?: string) => void;
  focusEntry: (entry: string) => void;
  focusedEntries: string[];
  foregroundId: string;
  prependToStack: (id: string) => void;
  removeFromStack: (id: string) => void;
  sessionLoaded: boolean;
  setForegroundId: React.Dispatch<React.SetStateAction<string>>;
  setSortOrders: React.Dispatch<React.SetStateAction<SortOrders>>;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  setWallpaper: (image: string, fit: WallpaperFit) => void;
  setWindowStates: React.Dispatch<React.SetStateAction<WindowStates>>;
  stackOrder: string[];
};
