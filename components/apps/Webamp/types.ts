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

type WebampDispatch = WebampDispatchProps & {
  type: string;
};

export type WebampCI = {
  dispose: () => void;
  onWillClose: (cb: (cancel: () => void) => void) => () => void;
  onMinimize: (cb: () => void) => () => void;
  renderWhenReady: (domNode: HTMLElement) => Promise<void>;
  store: {
    dispatch: (command: WebampDispatch) => void;
  };
};

type Track = {
  metaData: {
    artist?: string;
    title: string;
  };
  url: string;
};

export type WebampOptions = {
  __butterchurnOptions: unknown;
  initialSkin?: {
    url: string;
  };
  initialTracks?: Track[];
  zIndex?: number;
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
