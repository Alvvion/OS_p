import type { Position } from "react-rnd";

type WebampDispatchProps = {
  absolute?: boolean;
  positions?: {
    main: Position;
    playlist: Position;
    milkdrop: Position;
  };
  windowId?: string;
  window?: string;
  zIndex?: number;
};

export type Track = {
  blob: Blob;
  duration: number;
  metaData: {
    artist?: string;
    title: string;
  };
};

type WebampDispatch = WebampDispatchProps & {
  type: string;
};

export type WebampCI = {
  appendTracks: (tracks: Track[]) => void;
  close: () => void;
  dispose: () => void;
  onWillClose: (cb: (cancel: () => void) => void) => () => void;
  onMinimize: (cb: () => void) => () => void;
  renderWhenReady: (domNode: HTMLElement) => Promise<void>;
  setSkinFromUrl: (url: string) => void;
  skinIsLoaded: () => Promise<void>;
  store: {
    dispatch: (command: WebampDispatch) => void;
  };
};

export type WebampOptions = {
  initialSkin?: {
    url: string;
  };
  initialTracks?: Track[];
};

interface WebampConstructor {
  new (options?: WebampOptions): WebampCI;
}

declare global {
  interface Window {
    butterchurn: unknown;
    butterchurnPresets: {
      getPresets: () => { [preset: string]: unknown };
    };
    Webamp: WebampConstructor;
  }
}

export type Options = {
  zIndex?: number;
  initialTracks?: Track[];
};
