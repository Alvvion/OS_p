import type { Position } from "react-rnd";
import type Webamp from "webamp";

export type CloseWindow = {
  type: "CLOSE_WINDOW";
  windowId: string;
};

export type SetFocusedWindow = {
  type: "SET_FOCUSED_WINDOW";
  window: string;
};

export type UpdateWindowPositions = {
  type: "UPDATE_WINDOW_POSITIONS";
  positions: {
    main: Position;
    playlist: Position;
    milkdrop?: Position;
  };
};

export type WebampCI = Webamp & {
  store: {
    dispatch: (
      command: CloseWindow | SetFocusedWindow | UpdateWindowPositions,
    ) => void;
  };
};

declare global {
  interface Window {
    butterchurn: unknown;
    butterchurnPresets: {
      getPresets: () => { [preset: string]: unknown };
    };
    Webamp: typeof Webamp;
  }
}

export type WebampHook = {
  loadWebamp: (
    containerElement: HTMLDivElement | null,
    url: string,
    file?: Buffer,
  ) => void;
  webampCI?: WebampCI;
};
