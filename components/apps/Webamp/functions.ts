import type { IAudioMetadata } from "music-metadata-browser";
import { parseBuffer } from "music-metadata-browser";
import type { Position } from "react-rnd";

import { centerPosition } from "@/components/system/Window/RndWindow/functions";
import { bufferToBlob, cleanUpBufferUrl } from "@/utils/functions";

import type { Track, WebampCI } from "./types";

const BASE_WINDOW_SIZE = {
  height: 116,
  width: 275,
};

export const BASE_WEBAMP_SKINS = {
  availableSkins: [
    { url: "/skins/Aqua_X.wsz", name: "Aqua X" },
    { url: "/skins/Nucleo_NLog_v102.wsz", name: "Nucleo NLog v2G" },
    {
      url: "/skins/SpyAMP_Professional_Edition_v5.wsz",
      name: "SpyAMP Professional Edition v5",
    },
  ],
};

export const closeEqualizer = (webamp: WebampCI): void =>
  webamp.store.dispatch({
    type: "CLOSE_WINDOW",
    windowId: "equalizer",
  });

export const getWebampElement = (): HTMLDivElement =>
  document.getElementById("webamp") as HTMLDivElement;

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
    parseBuffer(file).then(
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

export const MAIN_WINDOW = "#main-window";
