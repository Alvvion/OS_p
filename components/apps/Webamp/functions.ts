import type { IAudioMetadata } from "music-metadata-browser";
import { parseBuffer } from "music-metadata-browser";
import type { Position } from "react-rnd";
import type { Track } from "webamp";

import { centerPosition } from "@/components/system/Window/RndWindow/functions";
import { bufferToBlob, cleanUpBufferUrl } from "@/utils/functions";

import { BASE_WINDOW_SIZE, CONTAINER_WINDOW, MP3_MIME_TYPE } from "./constants";
import type { WebampCI } from "./types";

export const closeEqualizer = (webamp: WebampCI): void =>
  webamp.store.dispatch({
    type: "CLOSE_WINDOW",
    windowId: "equalizer",
  });

export const getWebampElement = (): HTMLDivElement | null =>
  document.querySelector<HTMLDivElement>(CONTAINER_WINDOW);

export const updateWebampPostion = (
  webamp: WebampCI,
  taskbarHeight: string,
  position?: Position
): void => {
  const { height, width } = BASE_WINDOW_SIZE;
  const { x, y } =
    position || centerPosition({ height: height * 3, width }, taskbarHeight);

  webamp.store.dispatch({
    type: "UPDATE_WINDOW_POSITIONS",
    positions: {
      main: { x, y },
      playlist: { x, y: height + y },
      milkdrop: { x, y: height * 2 + y },
    },
  });
};

export const focusWindow = (webamp: WebampCI, window: string): void =>
  webamp.store.dispatch({ type: "SET_FOCUSED_WINDOW", window });

export const unFocusWindow = (webamp: WebampCI): void =>
  webamp.store.dispatch({
    type: "SET_FOCUSED_WINDOW",
    window: "",
  });

export const parseTrack = (file: Buffer, fileName: string): Promise<Track> =>
  new Promise<Track>((resolve) => {
    parseBuffer(
      file,
      {
        mimeType: MP3_MIME_TYPE,
        size: file.length,
      },
      { duration: true, skipCovers: true, skipPostHeaders: true }
    ).then(
      ({
        common: { artist = "", title = fileName },
        format: { duration = 0 },
      }: IAudioMetadata) =>
        resolve({
          blob: bufferToBlob(file),
          duration: Math.floor(duration),
          metaData: { artist, title },
        })
    );
  });

export const cleanBufferOnSkinLoad = (
  webamp: WebampCI,
  url = ""
): Promise<void> =>
  webamp.skinIsLoaded().then(() => {
    if (url) cleanUpBufferUrl(url);
  });
