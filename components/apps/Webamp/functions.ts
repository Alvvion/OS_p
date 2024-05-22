import type { Position } from "react-rnd";

import { centerPosition } from "@/components/system/Window/RndWindow/functions";
import { MAIN_HEIGHT } from "@/utils/constants";

import type { WebampCI } from "./types";

export const closeEqualizer = (webamp: WebampCI): void =>
  webamp.store.dispatch({
    type: "CLOSE_WINDOW",
    windowId: "equalizer",
  });

export const updateWindowPositions = (webamp: WebampCI, x = 0, y = 0): void => {
  webamp.store.dispatch({
    type: "UPDATE_WINDOW_POSITIONS",
    positions: {
      main: { x, y },
      playlist: { x, y: MAIN_HEIGHT + y },
    },
  });
};

export const getWebampElement = (): HTMLDivElement =>
  document.getElementById("webamp") as HTMLDivElement;

export const updateWebampPostion = (
  webamp: WebampCI,
  taskbarHeight: string,
  position?: Position
): void => {
  if (!position) {
    const webampSize = [
      ...getWebampElement().getElementsByClassName("window"),
    ].reduce(
      (acc, element) => {
        const { height, width } = element.getBoundingClientRect();

        return {
          height: acc.height + height,
          width,
        };
      },
      { height: 0, width: 0 }
    );
    const { x: centerX, y: centerY } = centerPosition(
      webampSize,
      taskbarHeight
    );

    updateWindowPositions(webamp, centerX, centerY);
  } else {
    const { x: previousX, y: previousY } = position || {};
    updateWindowPositions(webamp, previousX, previousY);
  }
};
